import { User, IUser } from '../models/index';
import { APIResponse } from '../utils/api.response';
import { APIError } from '../utils/api.error';
import { asyncHandler } from '../utils/async-handler';
import { sendEmail, emailVerificationMailgenContent } from '../utils/mail';
import { NextFunction, Request, Response } from 'express';
import { USER_ROLES_ENUM } from '../constants/user.constants';

// Register request interface
interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullname: string;
}
const generateAccessAndRefreshToken = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new APIError(404, 'User not found');
        }
        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        // user.accessToken = accessToken;
        await user.save();
        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError(500, 'Internal Server Error', [
            error instanceof Error ? error.message : 'Unknown error',
        ]);
    }
};
const registerController = asyncHandler(
    async (
        req: Request<{}, {}, RegisterRequest>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            console.log('Register request received');
            const { username, email, password, fullname } = req.body;
            const isUserExists = await User.findOne({
                $or: [{ username }, { email }],
            });
            if (isUserExists) {
                throw new APIError(409, 'User already exists');
            }
            const user = await User.create({
                username,
                email,
                password,
                fullname,
                role: USER_ROLES_ENUM.MEMBER,
            });
            if (!user) {
                throw new APIError(500, 'Internal Server Error');
            }
            const { unHashedToken, hashedToken, tokenExpiry } =
                user.generateTempToken();
            user.emailVerificationToken = hashedToken;
            user.emailVerificationTokenExpiry = new Date(tokenExpiry);
            await user.save({ validateBeforeSave: false });

            // Try to send email, but don't fail registration if email fails
            try {
                await sendEmail({
                    email,
                    subject: 'Verify your email',
                    mailgenContent: emailVerificationMailgenContent(
                        username,
                        `${req.protocol}://${req.get('host')}/api/v1/verify-email/${unHashedToken}`,
                    ),
                });
                console.log('Verification email sent successfully');
            } catch (emailError) {
                console.error('Failed to send verification email:', emailError);
                // Continue with registration even if email fails
                // User can request email verification later
            }
            // const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id as string);

            const createdUser = await User.findById(user._id).select(
                '-password, -refreshToken, -accessToken -emailVerificationToken -emailVerificationTokenExpiry',
            );
            if (!createdUser) {
                throw new APIError(500, 'Internal Server Error');
            }
            res.status(201).json(
                new APIResponse(201, createdUser, 'User created successfully'),
            );
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

export { registerController };
