import bcrypt from 'bcrypt'
import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from "src/utils/jwt";
import { addRefreshTokenToWhitelist, } from "./auth.services";
import { createUserByUsernameAndPassword, findUserByUsername } from '@src/models/user/user.services';
import { CustomError } from '@src/utils/error';


const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new CustomError('You must provide an user and a password', 400);
        }

        const existingUser = await findUserByUsername(username);

        if (existingUser) {
            throw new CustomError('Username already in use', 400);
        }

        const user = await createUserByUsernameAndPassword({ username, password });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new CustomError('You must provide an user and a password', 400);
        }

        const existingUser = await findUserByUsername(username);

        if (!existingUser) {
            throw new CustomError('Invalid login credentials', 403);

        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            throw new CustomError('Invalid login credentials', 403);
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
});

export default router;


