import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';

// Avatar interface
interface IAvatar {
    url: string;
    localpath: string;
}

// User interface extending Document
export interface IUser extends Document {
    avatar: IAvatar;
    username: string;
    email: string;
    fullname: string;
    password: string;
    isEmailVerified: boolean;
    refreshToken?: string;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    emailVerificationToken?: string;
    emailVerificationTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    comparePassword(password: string): Promise<boolean>;
    generateAuthToken(): string;
    generateRefreshToken(): string;
    generateTempToken(): {
        unHashedToken: string;
        hashedToken: string;
        tokenExpiry: number;
    };
}

// User model interface
export interface IUserModel extends Model<IUser> {
    // Static methods can be added here if needed
}

const avatarSchema = new Schema<IAvatar>(
    {
        url: {
            type: String,
            default: '',
        },
        localpath: {
            type: String,
            default: 'https://placehold.co/400',
        },
    },
    { _id: false },
);

const userSchema = new Schema<IUser>(
    {
        avatar: {
            type: avatarSchema,
            default: () => ({
                url: '',
                localpath: 'https://placehold.co/400',
            }),
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

// Pre-save middleware for password hashing
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Instance methods
userSchema.methods.comparePassword = async function (
    password: string,
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

userSchema.methods.generateAuthToken = function (): string {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    if (!process.env.ACCESS_TOKEN_EXPIRY) {
        throw new Error('ACCESS_TOKEN_EXPIRY is not defined');
    }

    const options: SignOptions = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    } as SignOptions;
    const token = jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        options,
    );
    return token;
};

userSchema.methods.generateRefreshToken = function (): string {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }
    if (!process.env.REFRESH_TOKEN_EXPIRY) {
        throw new Error('REFRESH_TOKEN_EXPIRY is not defined');
    }

    const options: SignOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    } as SignOptions;
    const token = jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        options,
    );
    return token;
};

userSchema.methods.generateTempToken = function (): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
} {
    const unHashedToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash('sha256')
        .update(unHashedToken)
        .digest('hex');
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes from now

    // Note: Uncomment these lines when you want to save tokens to the user
    // this.forgotPasswordToken = hashedToken;
    // this.forgotPasswordTokenExpiry = new Date(tokenExpiry);

    return { unHashedToken, hashedToken, tokenExpiry };
};

// Create and export the model with proper typing
export const User: IUserModel = mongoose.model<IUser, IUserModel>(
    'User',
    userSchema,
);
