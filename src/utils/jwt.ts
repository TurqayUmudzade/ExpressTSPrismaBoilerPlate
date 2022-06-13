import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const generateAccessToken = (user: any) => {
    const jwtAccessToken = process.env.JWT_ACCESS_SECRET || ''

    return jwt.sign({ userId: user.id }, jwtAccessToken, {
        expiresIn: '5m',
    });
}

const generateRefreshToken = (user: any, jti: any) => {
    const jwtReshreshToken = process.env.JWT_REFRESH_SECRET || ''

    return jwt.sign({
        userId: user.id,
        jti
    }, jwtReshreshToken, {
        expiresIn: '8h',
    });
}

const generateTokens = (user: any, jti: any) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

const hashToken = (token: string) => {
    return crypto.createHash('sha512').update(token).digest('hex');
}

export {
    generateAccessToken,
    generateRefreshToken,
    generateTokens,
    hashToken
};