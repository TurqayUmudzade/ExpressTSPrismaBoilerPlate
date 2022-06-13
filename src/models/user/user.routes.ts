import { Router } from "express";
import { isAuthenticated } from "src/middlewares/auth";
import { findUserById } from "@src/models/user/user.services";
const router = Router();




router.get('/profile', isAuthenticated, async (req: any, res, next) => {
    try {
        const { userId } = req.body.payload;
        console.log(req.body);

        const user = await findUserById(userId);
        if (user) {
            const { password, ...rest } = user
            res.json(rest);
        }
    } catch (err) {
        next(err);
    }
});

export default router;
