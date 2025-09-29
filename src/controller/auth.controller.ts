import { User, IUser } from '../models/index';
import { APIResponse } from '../utils/api.response';
import { APIError } from '../utils/api.error';
import { asyncHandler } from '../utils/async-handler';
import {
    sendEmail,
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
} from '../utils/mail';
import { NextFunction, Request, Response } from 'express';
import { USER_ROLES_ENUM } from '../constants/user.constants';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Register request interface
interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullname: string;
}

// Login request interface
interface LoginRequest {
    email?: string;
    username?: string;
    password: string;
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

const login = asyncHandler(
    async (
        req: Request<{}, {}, LoginRequest>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { email, password, username } = req.body;
            if (!email && !username) {
                throw new APIError(400, 'Either email or username is required');
            }
            const user = await User.findOne({ $or: [{ email }, { username }] });
            if (!user) {
                throw new APIError(404, 'User not found');
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                throw new APIError(401, 'Invalid password');
            }
            const { accessToken, refreshToken } =
                await generateAccessAndRefreshToken(user._id as string);

            // Remove sensitive data from response
            const userResponse = user.toObject();

            delete (userResponse as any).password;
            delete (userResponse as any).refreshToken;
            res.status(200)
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                })
                .cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
                })
                .json(
                    new APIResponse(
                        200,
                        {
                            user: userResponse,
                            accessToken,
                            refreshToken,
                        },
                        'Login successful',
                    ),
                );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user as IUser;
            const userFromDB = await User.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        refreshToken: '',
                        accessToken: '',
                    },
                },
                { new: true },
            );
            if (!userFromDB) {
                throw new APIError(404, 'User not found');
            }
            res.status(200)
                .cookie('refreshToken', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 0,
                })
                .cookie('accessToken', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 0,
                })
                .json(new APIResponse(200, null, 'Logout successful'));
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const getCurrentUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user as IUser;
            if (!user) {
                throw new APIError(404, 'User not found');
            }
            res.status(200).json(
                new APIResponse(200, user, 'User retrieved successfully'),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const verifyEmail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { verificationToken } = req.params;
            let hashedToken = crypto
                .createHash('sha256')
                .update(verificationToken)
                .digest('hex');
            const user = await User.findOne({
                emailVerificationToken: hashedToken,
                emailVerificationTokenExpiry: { $gt: new Date() },
            });
            if (!user) {
                throw new APIError(
                    404,
                    'token not valid or expired please request for a new one',
                );
            }
            user.isEmailVerified = true;
            user.emailVerificationToken = '';
            user.emailVerificationTokenExpiry = undefined;
            await user.save({ validateBeforeSave: false });
            res.status(200).json(
                new APIResponse(
                    200,
                    { isEmailVerified: 'Email verified successfully' },
                    'Email verified successfully',
                ),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);
const resendEmailVerification = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new APIError(404, 'User not found');
            }
            if (user.isEmailVerified) {
                throw new APIError(400, 'Email already verified');
            }
            const { unHashedToken, hashedToken, tokenExpiry } =
                user.generateTempToken();
            user.emailVerificationToken = hashedToken;
            user.emailVerificationTokenExpiry = new Date(tokenExpiry);
            await user.save({ validateBeforeSave: false });
            await sendEmail({
                email,
                subject: 'Verify your email',
                mailgenContent: emailVerificationMailgenContent(
                    user.username,
                    `${req.protocol}://${req.get('host')}/api/v1/verify-email/${unHashedToken}`,
                ),
            });
            res.status(200).json(
                new APIResponse(
                    200,
                    { isEmailVerified: 'Email verification sent successfully' },
                    'Email verification sent successfully',
                ),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const refreshAccessToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const incomingRefreshToken =
                req.cookies.refreshToken ||
                (req.headers['refresh-token'] as string);
            if (!incomingRefreshToken) {
                throw new APIError(401, 'Unauthorized');
            }
            const user = await User.findOne({
                refreshToken: incomingRefreshToken,
            });
            if (!user) {
                throw new APIError(401, 'Unauthorized');
            }
            const verifyRefreshToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET!,
            );
            if (!verifyRefreshToken) {
                throw new APIError(401, 'Unauthorized');
            }
            const { accessToken, refreshToken } =
                await generateAccessAndRefreshToken(user._id as string);
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });
            res.status(200)
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                })
                .cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
                })
                .json(
                    new APIResponse(
                        200,
                        { accessToken, refreshToken },
                        'Refresh token sent successfully',
                    ),
                );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const forgotPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new APIError(404, 'User not found');
            }
            const { unHashedToken, hashedToken, tokenExpiry } =
                user.generateTempToken();
            user.forgotPasswordToken = hashedToken;
            user.forgotPasswordTokenExpiry = new Date(tokenExpiry);
            await user.save({ validateBeforeSave: false });
            await sendEmail({
                email,
                subject: 'Reset your password',
                mailgenContent: forgotPasswordMailgenContent(
                    user.username,
                    `${process.env.FORGOT_PASSWORD_REDIRECT_URL!}/${unHashedToken}`,
                ),
            });
            res.status(200).json(
                new APIResponse(
                    200,
                    {
                        isEmailVerified:
                            'Reset password email sent successfully',
                    },
                    'Email verification sent successfully',
                ),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const resetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password } = req.body;
            const { resetToken } = req.params;

            const hashedToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');

            const user = await User.findOne({
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: { $gt: new Date() },
            });
            if (!user) {
                throw new APIError(404, 'User not found');
            }
            user.password = password;
            user.forgotPasswordToken = '';
            user.forgotPasswordTokenExpiry = undefined;
            await user.save({ validateBeforeSave: false });
            res.status(200).json(
                new APIResponse(
                    200,
                    { isEmailVerified: 'Password reset successfully' },
                    'Password reset successfully',
                ),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

const changePassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = (req as any).user as IUser;
            const isPasswordValid = await user.comparePassword(currentPassword);
            if (!isPasswordValid) {
                throw new APIError(401, 'Invalid current password');
            }
            user.password = newPassword;
            await user.save({ validateBeforeSave: false });
            res.status(200).json(
                new APIResponse(
                    200,
                    { isEmailVerified: 'Password changed successfully' },
                    'Password changed successfully',
                ),
            );
        } catch (error) {
            console.error(error);
            throw new APIError(500, 'Internal Server Error', [
                error instanceof Error ? error.message : 'Unknown error',
            ]);
        }
    },
);

export {
    registerController,
    login,
    logout,
    getCurrentUser,
    verifyEmail,
    resendEmailVerification,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    changePassword, // user who logged in can change their password
};
