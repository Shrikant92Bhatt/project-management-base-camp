import { Router } from 'express';
import {
    registerController,
    login,
    logout,
    getCurrentUser,
    verifyEmail,
    resendEmailVerification,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    changePassword,
} from '../controller';
import { validate, verifyToken } from '../middleware';
import {
    userLoginValidator,
    userRegisterValidator,
    changePasswordValidator,
    userForgotPasswordValidator,
    userResetPasswordValidator,
} from '../validators';

const router = Router();
console.log('Auth router loaded');
// Public routes
router.post('/register', userRegisterValidator(), validate, registerController);
router.post('/login', userLoginValidator(), validate, login);
router.get('/verify-email/:verificationToken', verifyEmail);
router.post('/resend-verification', resendEmailVerification);
router.post(
    '/forgot-password',
    userForgotPasswordValidator(),
    validate,
    forgotPassword,
);
router.post(
    '/reset-password/:resetToken',
    userResetPasswordValidator(),
    validate,
    resetPassword,
);
router.post('/refresh-token', refreshAccessToken);

// Protected routes (require authentication)
router.post('/logout', verifyToken, logout);
router.get('/current-user', verifyToken, getCurrentUser);
router.post(
    '/change-password',
    verifyToken,
    changePasswordValidator(),
    validate,
    changePassword,
);

export default router;
