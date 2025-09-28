import { body } from 'express-validator';

const userRegisterValidator = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required')
            .isLowercase()
            .withMessage('Username must be in lowercase')
            .isLength({ min: 3, max: 20 })
            .withMessage('Username must be between 3 and 20 characters'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email address'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8, max: 20 })
            .withMessage('Password must be between 8 and 20 characters'),
        body('fullname')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('Fullname is required'),
    ];
};

const userLoginValidator = () => {
    return [
        body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
        body('username').trim().notEmpty().withMessage('Username is required').isLowercase().withMessage('Username must be in lowercase'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ];
};

export { userRegisterValidator, userLoginValidator };
