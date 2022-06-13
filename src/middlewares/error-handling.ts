import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@src/utils/error';
import Logger from './logger';

const errorLogger = (error: any, req: any, res: any, next: any) => {
    next(error)
    Logger.error(error)
}

const failSafeHandler = (err: any | CustomError, req: Request, res: Response, next: NextFunction) => {
    let { status, message, additionalInfo } = err;
    let customError = { status, message, additionalInfo, }

    if (!(err instanceof CustomError)) {
        customError = new CustomError('The server is having some issues');
    }

    res.status((customError as CustomError).status).send(customError);
};

export {
    errorLogger,
    failSafeHandler
}