import { NextFunction, Request, Response } from 'express';
import { APIError } from '../utils/api.error';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { asyncHandler } from '../utils/async-handler';

const verifyToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const authorizationToken =
            req.headers['Authorization']?.toString().replace('Bearer ', '') ||
            req.cookies.accessToken;
        if (!authorizationToken) {
            throw new APIError(401, 'Unauthorized');
        }
        try {
            const decoded = jwt.verify(
                authorizationToken,
                process.env.ACCESS_TOKEN_SECRET!,
            );
            const user = await User.findById(
                (decoded as any)?._id as string,
            ).select(
                '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -emailVerificationToken -forgotPasswordToken -forgotPasswordTokenExpiry -forgotPasswordToken -forgotPasswordToken',
            );
            if (!user) {
                throw new APIError(401, 'Unauthorized');
            }
            (req as any).user = user;
            next();
        } catch (error) {
            throw new APIError(401, 'Invalid token');
        }
    },
);

export { verifyToken };
