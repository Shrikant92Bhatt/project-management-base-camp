import { NextFunction, Request, Response } from 'express';

const asyncHandler = (asyncFunction: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncFunction(req, res, next)).catch((err) =>
            next(err),
        );
    };
};

export { asyncHandler };
