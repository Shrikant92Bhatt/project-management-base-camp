import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localpath: String,
            },
            default: {
                url: '',
                localpath: 'https://placehold.co/400',
            },
            required: true,
        },
        username: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordTokenExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationTokenExpiry: {
            type: Date,
        },
    },
    { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! as any },
    );
    return token;
};

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! as any },
    );
    return token;
};

userSchema.methods.generateTempToken = function () {
    const unHashedToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash('sha256')
        .update(unHashedToken)
        .digest('hex');
    const tokenExpiry = Date.now() + 20 * 60 * 1000;
    // this.forgotPasswordToken = hashedToken;
    // this.forgotPasswordTokenExpiry = tokenExpiry;
    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model('User', userSchema);
