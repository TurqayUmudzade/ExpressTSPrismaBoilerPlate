import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { CustomError } from "@src/utils/error";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // if (!authorization) {
    //     throw new CustomError('Un-Authorized', 401);
    // }

    // try {
    //     const token = authorization.split(' ')[1];
    //     const jwtAccessSecret = process.env.JWT_ACCESS_SECRET || ''
    //     const payload = jwt.verify(token, jwtAccessSecret);
    //     req.body.payload = payload;
    // } catch (err: any) {
    //     if (err.name === 'TokenExpiredError') {
    //         throw new CustomError('Token Expired', 401);
    //     }

    //     throw new CustomError('Un-Authorized', 401);
    // }

    return next();
}

export {
    isAuthenticated
}