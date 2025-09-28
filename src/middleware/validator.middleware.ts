import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { APIError } from '../utils/api.error';

const validate = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().forEach((err: any) =>
        extractedErrors.push({
            [err.path]: err.msg,
        }),
    );
    throw new APIError(422, 'Received data is not valid');
};

export { validate };
