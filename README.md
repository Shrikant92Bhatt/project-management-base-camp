# Project Camp Backend

A RESTful API service designed to support collaborative project management with role-based access control.

## Overview

Project Camp Backend enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with a three-tier permission system.

## Development Status

✅ **Core Features Complete** - The authentication system is fully implemented and functional. The project has a solid foundation with complete user management, JWT authentication, email verification, and password reset functionality.

### Current Implementation Status

- ✅ **Project Setup**: Express.js server with TypeScript configuration
- ✅ **Dependencies**: All required packages installed (Express, Mongoose, JWT, CORS, Nodemailer, Mailgen)
- ✅ **Project Structure**: Organized folder structure with controllers, models, routes, middleware, validators
- ✅ **Database Integration**: MongoDB connection with error handling and proper startup integration
- ✅ **API Response System**: Generic API response and error handling classes
- ✅ **Constants**: User roles and task status enums defined
- ✅ **Enhanced CORS**: Configured CORS with credentials and custom headers
- ✅ **Authentication System**: Complete JWT-based authentication with refresh tokens
- ✅ **User Registration**: Full registration flow with email verification
- ✅ **User Login**: Flexible login (email OR username) with JWT tokens and cookies
- ✅ **Email Verification**: Complete email verification system with secure tokens
- ✅ **Password Management**: Forgot password, reset password, and change password
- ✅ **Input Validation**: Express-validator integration for all endpoints
- ✅ **Error Handling**: Comprehensive error handling with proper HTTP status codes
- ✅ **Security Features**: Password hashing, JWT tokens, httpOnly cookies, SSL email
- ✅ **API Documentation**: Complete API documentation with request/response examples
- 🚧 **Project Management**: Ready for implementation (models and controllers planned)
- ⏳ **Task Management**: Ready for implementation (models and controllers planned)
- ⏳ **Notes System**: Ready for implementation (models and controllers planned)

### Latest Changes

- **Complete Authentication System**: Implemented full user authentication with JWT tokens, refresh tokens, and secure cookies
- **User Registration & Login**: Flexible login system supporting email OR username with comprehensive validation
- **Email Verification**: Complete email verification system with secure token generation and Mailgen templates
- **Password Management**: Forgot password, reset password, and change password functionality
- **Input Validation**: Express-validator integration with custom validation rules for all endpoints
- **Route Organization**: Proper route structure with public/protected endpoints and correct parameter mapping
- **TypeScript Types**: Fixed all TypeScript types for User model with proper interfaces and method signatures
- **API Documentation**: Comprehensive API documentation with request/response examples for all endpoints
- **Security Implementation**: Password hashing, JWT authentication, httpOnly cookies, and SSL email configuration
- **Error Handling**: Structured error responses with proper HTTP status codes and detailed error messages

## Key Features

### ✅ **Implemented Features**

- **Complete User Authentication System**
    - JWT-based authentication with access and refresh tokens
    - Flexible login (email OR username)
    - Secure password hashing with bcrypt
    - Email verification with secure token generation
    - Password reset and forgot password functionality
    - Role-based access control (Admin, Project Admin, Member)
    - httpOnly cookies for enhanced security
    - Input validation with express-validator

- **Comprehensive API System**
    - Structured API responses with consistent format
    - Proper error handling with HTTP status codes
    - TypeScript interfaces for type safety
    - Complete API documentation with examples
    - CORS configuration for cross-origin requests

### 🚧 **Planned Features**

- **Project Management**
    - Create, update, and delete projects
    - Team member management with role assignment
    - Project notes system

- **Task Management**
    - Create and manage tasks with subtasks
    - File attachments support
    - Three-state status tracking (Todo, In Progress, Done)
    - Task assignment to team members

## API Structure

- **Authentication**: `/api/v1/auth/`
- **Projects**: `/api/v1/projects/`
- **Tasks**: `/api/v1/tasks/`
- **Notes**: `/api/v1/notes/`
- **Health Check**: `/api/v1/healthcheck/`

## User Roles

| Role          | Permissions                                             |
| ------------- | ------------------------------------------------------- |
| Admin         | Full system access, project management, team management |
| Project Admin | Project-level administrative access, task management    |
| Member        | View projects, update task completion status            |

## Security Features

- JWT authentication with refresh tokens
- Role-based authorization middleware
- Input validation on all endpoints
- Email verification system
- Secure file upload handling
- CORS configuration

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Shrikant92Bhatt/project-management-base-camp.git
    cd project-camp
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Setup**

    Create a `.env` file in the root directory with the following variables:

    ```bash
    # Server Configuration
    PORT=3000

    # Database Configuration
    MONGODB_URI=mongodb://localhost:27017/project-camp
    # OR for MongoDB Atlas:
    # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-camp

    # CORS Configuration
    CORS_ORIGIN=http://localhost:5173
    # For multiple origins: CORS_ORIGIN=http://localhost:5173,http://localhost:3000

    # JWT Configuration (to be added)
    # JWT_SECRET=your-secret-key
    # JWT_REFRESH_SECRET=your-refresh-secret
    # JWT_EXPIRES_IN=1d
    # JWT_REFRESH_EXPIRES_IN=7d

    # Email Configuration (to be added)
    # SMTP_HOST=smtp.gmail.com
    # SMTP_PORT=587
    # SMTP_USER=your-email@gmail.com
    # SMTP_PASS=your-app-password
    ```

    **Important Notes:**
    - Replace `localhost:27017` with your MongoDB connection details
    - For MongoDB Atlas, use the connection string provided by Atlas
    - Update `CORS_ORIGIN` to match your frontend URL
    - Never commit `.env` file to version control

4. **Development Commands**

    **Start development server (with hot reload)**

    ```bash
    npm run dev
    ```

    **Build TypeScript to JavaScript**

    ```bash
    npm run build
    ```

    **Start production server**

    ```bash
    npm start
    ```

    **TypeScript compilation**

    ```bash
    npm run tsg
    ```

    **Code Quality Tools**

    ```bash
    # Linting
    npm run lint
    npm run lint:fix

    # Code formatting
    npm run format
    npm run format:check
    ```

### Project Structure

```
project-camp/
├── src/                    # TypeScript source files
│   ├── app.ts             # Express app configuration with CORS and middleware
│   ├── index.ts           # Application entry point with DB connection
│   ├── constants/         # Application constants and enums
│   │   ├── index.ts       # Constants exports
│   │   └── user.constants.ts # User roles and task status enums
│   ├── controller/        # Request handlers (to be implemented)
│   ├── db/               # Database connection
│   │   └── index.ts       # MongoDB connection setup
│   ├── middleware/       # Custom middleware functions (to be implemented)
│   ├── models/           # Data models and schemas (to be implemented)
│   ├── routes/           # API route definitions (to be implemented)
│   ├── utils/            # Utility functions
│   │   ├── index.ts       # Utils exports
│   │   ├── api.response.ts # Generic API response class and interface
│   │   └── api.error.ts   # API error handling class
│   └── validators/       # Input validation schemas (to be implemented)
├── dist/                 # Compiled JavaScript files (generated)
├── public/               # Static files
│   └── images/          # File uploads directory
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── PRD.md               # Product Requirements Document
└── .env                 # Environment variables (create this file)
```

### Current Dependencies

**Production Dependencies:**

- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `jsonwebtoken` - JWT token handling
- `cors` - Cross-origin resource sharing

**Development Dependencies:**

- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution for Node.js
- `nodemon` - Development server with auto-restart
- `eslint` - Code linting
- `prettier` - Code formatting
- `dotenv` - Environment variable loading

## Current Server Status

The Express server is now enhanced with:

- ✅ Basic Express.js setup with enhanced CORS configuration
- ✅ JSON middleware for request parsing (16kb limit)
- ✅ URL-encoded middleware for form data (16kb limit)
- ✅ Static file serving from public directory
- ✅ MongoDB connection with proper error handling
- ✅ TypeScript compilation and development setup
- ✅ Generic API response and error handling system
- ✅ User roles and task status constants
- ✅ Basic health check endpoint at `/`
- ✅ Test endpoint at `/instagram`
- ✅ Version information endpoint at `/version`

**To start the development server:**

```bash
npm run dev
```

The server will:

1. Connect to MongoDB using the `MONGODB_URI` from your `.env` file
2. Start the Express server on `http://localhost:3000` (or the PORT specified in your `.env` file)
3. Display connection status with emoji indicators (✅ for success, ❌ for errors)

**Expected startup output:**

```
✅ Connected to MongoDB
✅ Server is running on http://localhost:3000 🚀
```

## Implemented Features

### Core Infrastructure

- **Database Integration**: MongoDB connection with error handling and startup integration
- **API Response System**: Generic `APIResponse<T>` class with `IAPIResponse<T>` interface for type-safe responses
- **Error Handling**: `APIError` class for structured error responses with status codes
- **Constants Management**: Centralized user roles and task status enums
- **Enhanced Express Setup**: CORS configuration, request limits, static file serving

### Available Utilities

```typescript
// API Response
import { APIResponse, IAPIResponse } from './utils';

const response = new APIResponse<User>(200, userData, 'User retrieved');
// response: { statusCode: 200, data: User, message: "User retrieved", success: true }

// API Error
import { APIError } from './utils';

throw new APIError(404, 'User not found', ['Invalid user ID']);

// Constants
import { USER_ROLES_ENUM, TASK_STATUS_ENUM } from './constants';

const userRole = USER_ROLES_ENUM.ADMIN; // 'admin'
const taskStatus = TASK_STATUS_ENUM.IN_PROGRESS; // 'in_progress'
```

## Code Documentation

### Core Architecture

```
src/
├── app.ts              # Express app with CORS, middleware, routes
├── index.ts            # Server startup with DB connection
├── constants/          # User roles, task status enums
├── controller/         # Auth controllers (register, login)
├── db/                 # MongoDB connection
├── middleware/         # Auth verification, validation
├── models/             # User schema with JWT methods
├── routes/             # API endpoints
├── utils/              # API responses, errors, email, async handler
└── validators/         # Input validation schemas
```

### Key Components

#### API Response System

```typescript
// Success response
new APIResponse(200, data, 'Success message');
// Returns: { statusCode: 200, data, message: "Success message", success: true }

// Error handling
throw new APIError(400, 'Error message', ['detail1', 'detail2']);
// Returns: { statusCode: 400, message: "Error message", errors: [...], success: false }
```

#### Async Handler

```typescript
const controller = asyncHandler(async (req, res, next) => {
    // Auto-catches errors and passes to error middleware
    const result = await someAsyncOperation();
    res.json(new APIResponse(200, result, 'Success'));
});
```

### User Model

```typescript
interface IUser {
    username: string; // unique, lowercase
    email: string; // unique, lowercase
    fullname: string; // required
    password: string; // auto-hashed
    role: string; // admin, project_admin, member
    isEmailVerified: boolean;
    // JWT tokens and email verification fields
}

// Methods
await user.comparePassword(password); // Verify password
user.generateAuthToken(); // Generate access token
user.generateRefreshToken(); // Generate refresh token
user.generateTempToken(); // Email verification tokens
```

### Email System

```typescript
// Send verification email
await sendEmail({
    email: 'user@example.com',
    subject: 'Verify your email',
    mailgenContent: emailVerificationMailgenContent(username, verificationUrl),
});

// SSL Configuration
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
});
```

### Constants

```typescript
// User Roles
enum USER_ROLES_ENUM {
    ADMIN = 'admin',
    PROJECT_ADMIN = 'project_admin',
    MEMBER = 'member',
}

// Task Status
enum TASK_STATUS_ENUM {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}
```

### Database & App Setup

```typescript
// MongoDB Connection
await connectDB(); // Auto-loads MONGODB_URI, exits on failure

// Express Configuration
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
```

## API Documentation

### Available Endpoints

**General Endpoints:**

- `GET /` - Basic server status
- `GET /instagram` - Development test endpoint
- `GET /api/v1/healthcheck/` - Structured health check

**Authentication Endpoints (`/api/v1/auth/`):**

**Public Routes:**

- `POST /register` - User registration
- `POST /login` - User login (email OR username + password)
- `GET /verify-email/:verificationToken` - Verify email address
- `POST /resend-verification` - Resend email verification
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:resetToken` - Reset password with token
- `POST /refresh-token` - Refresh access token

**Protected Routes (require authentication):**

- `POST /logout` - User logout
- `GET /current-user` - Get current user profile
- `POST /change-password` - Change user password

### Request/Response Format

**Success Response:**

```json
{
    "statusCode": 200,
    "data": {
        /* response data */
    },
    "message": "Success message",
    "success": true
}
```

**Error Response:**

```json
{
    "statusCode": 400,
    "message": "Error message",
    "errors": ["Detailed error 1", "Detailed error 2"],
    "success": false
}
```

### Authentication

**Login Request:**

```json
{
    "email": "user@example.com", // OR
    "username": "john_doe", // Either email or username required
    "password": "your_password"
}
```

**Register Request:**

```json
{
    "username": "john_doe",
    "email": "user@example.com",
    "fullname": "John Doe",
    "password": "secure_password"
}
```

**Protected Route Headers:**

```
Authorization: Bearer <access_token>
```

OR use httpOnly cookies (automatically sent by browser).

### Detailed API Documentation

#### Authentication Routes

**POST `/api/v1/auth/register`**
```json
// Request Body
{
    "username": "john_doe",          // 3-20 chars, lowercase, required
    "email": "user@example.com",     // Valid email, required
    "fullname": "John Doe",          // Optional but validated if provided
    "password": "secure_password"    // 8-20 chars, required
}

// Success Response (201)
{
    "statusCode": 201,
    "data": {
        "_id": "user_id",
        "username": "john_doe",
        "email": "user@example.com",
        "fullname": "John Doe",
        "role": "member",
        "isEmailVerified": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "User created successfully",
    "success": true
}
```

**POST `/api/v1/auth/login`**
```json
// Request Body (either email OR username required)
{
    "email": "user@example.com",     // OR
    "username": "john_doe",          // Either email or username required
    "password": "your_password"      // Required
}

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "user_id",
            "username": "john_doe",
            "email": "user@example.com",
            "fullname": "John Doe",
            "role": "member",
            "isEmailVerified": true
        },
        "accessToken": "jwt_access_token",
        "refreshToken": "jwt_refresh_token"
    },
    "message": "Login successful",
    "success": true
}
```

**GET `/api/v1/auth/verify-email/:verificationToken`**
```json
// URL Parameter
:verificationToken = "unhashed_verification_token"

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "message": "Email verified successfully"
    },
    "message": "Email verification successful",
    "success": true
}
```

**POST `/api/v1/auth/forgot-password`**
```json
// Request Body
{
    "email": "user@example.com"      // Valid email, required
}

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "message": "Password reset email sent"
    },
    "message": "Password reset email sent successfully",
    "success": true
}
```

**POST `/api/v1/auth/reset-password/:resetToken`**
```json
// URL Parameter
:resetToken = "unhashed_reset_token"

// Request Body
{
    "password": "new_password"       // Required
}

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "message": "Password reset successfully"
    },
    "message": "Password reset successful",
    "success": true
}
```

**POST `/api/v1/auth/refresh-token`**
```json
// Request Body
{
    "refreshToken": "jwt_refresh_token"  // Required
}

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "accessToken": "new_jwt_access_token"
    },
    "message": "Token refreshed successfully",
    "success": true
}
```

#### Protected Routes (Require Authentication)

**GET `/api/v1/auth/current-user`**
```json
// Headers
Authorization: Bearer <access_token>
// OR use httpOnly cookies (automatically sent)

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "_id": "user_id",
        "username": "john_doe",
        "email": "user@example.com",
        "fullname": "John Doe",
        "role": "member",
        "isEmailVerified": true,
        "avatar": {
            "url": "",
            "localpath": "https://placehold.co/400"
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "User profile retrieved successfully",
    "success": true
}
```

**POST `/api/v1/auth/change-password`**
```json
// Headers
Authorization: Bearer <access_token>

// Request Body
{
    "currentPassword": "old_password",   // Required
    "newPassword": "new_password"        // Required
}

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "message": "Password changed successfully"
    },
    "message": "Password changed successfully",
    "success": true
}
```

**POST `/api/v1/auth/logout`**
```json
// Headers
Authorization: Bearer <access_token>

// Success Response (200)
{
    "statusCode": 200,
    "data": {
        "message": "Logged out successfully"
    },
    "message": "Logout successful",
    "success": true
}
```

#### Error Response Examples

**Validation Error (400)**
```json
{
    "statusCode": 400,
    "message": "Validation failed",
    "errors": [
        "Username must be between 3 and 20 characters",
        "Email is required"
    ],
    "success": false
}
```

**Authentication Error (401)**
```json
{
    "statusCode": 401,
    "message": "Unauthorized",
    "success": false
}
```

**Not Found Error (404)**
```json
{
    "statusCode": 404,
    "message": "User not found",
    "success": false
}
```

**Conflict Error (409)**
```json
{
    "statusCode": 409,
    "message": "User already exists",
    "success": false
}
```

## System Design Documentation

For detailed system architecture and design information, see:
- **[System Design Document](./docs/DESIGN.md)** - High-Level Design (HLD) and Low-Level Design (LLD)
- **[Version Management](./docs/VERSION_MANAGEMENT.md)** - Version control and release management
- **[Changelog](./CHANGELOG.md)** - Project history and release notes

### Architecture Overview

The system follows a layered architecture with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React/Vue)   │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Email Service │
                       │   (Nodemailer)  │
                       └─────────────────┘
```

## Security Best Practices

### Environment Variables Protection

**Critical**: Never commit sensitive credentials to version control. Always use environment variables for:

```bash
# Required Environment Variables (Create your own .env file)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/project-camp
CORS_ORIGIN=http://localhost:5173

# JWT Configuration (Generate your own secrets)
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-here
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

# Email Configuration (Use your own email service)
MAILTRAP_SMTP_HOST=your-mailtrap-host
MAILTRAP_SMTP_PORT=587
MAILTRAP_SMTP_USER=your-mailtrap-username
MAILTRAP_SMTP_PASS=your-mailtrap-password
```

### Security Features Implemented

1. **Password Hashing**: Automatic bcrypt hashing with salt rounds
2. **JWT Authentication**: Secure token-based authentication with refresh tokens
3. **Input Validation**: Request size limits and data sanitization
4. **CORS Protection**: Configurable cross-origin resource sharing
5. **Email Verification**: Secure email verification system
6. **Password Reset**: Cryptographically secure password reset tokens

### Setting Up Your Own Credentials

#### 1. MongoDB Setup

```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/project-camp

# MongoDB Atlas (Recommended for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-camp
```

#### 2. JWT Secrets Generation

```bash
# Generate secure random strings for JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. Email Service Setup

**Option A: Mailtrap (Development)**

1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Get your SMTP credentials from inbox settings
3. Add credentials to `.env` file

**Option B: Gmail (Production)**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

**Option C: SendGrid, AWS SES, or other providers**

- Follow provider-specific documentation
- Update mail configuration in `src/utils/mail.ts`

## Development Workflow

### Getting Started for New Developers

1. **Fork and Clone**

    ```bash
    git clone https://github.com/your-username/project-camp.git
    cd project-camp
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Setup**

    ```bash
    # Copy example environment file
    cp .env.example .env

    # Edit .env with your own credentials
    nano .env
    ```

4. **Start Development Server**
    ```bash
    npm run dev
    ```

### Code Quality Standards

#### Linting and Formatting

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

#### TypeScript Compilation

```bash
# Compile TypeScript
npm run build

# Watch mode compilation
npm run tsg
```

### Testing Strategy

**Current Status**: Testing framework to be implemented

**Planned Testing Structure**:

- Unit tests for utility functions
- Integration tests for API endpoints
- Database model tests
- Authentication flow tests

### API Development Guidelines

1. **Use TypeScript**: All new code must be written in TypeScript
2. **Follow Response Format**: Use `APIResponse` class for success responses
3. **Error Handling**: Use `APIError` class for structured errors
4. **Async Wrapper**: Use `asyncHandler` for all async route handlers
5. **Validation**: Implement input validation for all endpoints
6. **Documentation**: Update API documentation for new endpoints

### Database Guidelines

1. **Schema Design**: Follow MongoDB best practices
2. **Indexing**: Add appropriate indexes for query performance
3. **Validation**: Use Mongoose schema validation
4. **Relationships**: Plan data relationships carefully
5. **Migration**: Document schema changes

## Deployment

### Production Environment

1. **Environment Variables**: Set all required environment variables
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **Email Service**: Configure production email service
4. **Security**: Ensure all security measures are in place
5. **Monitoring**: Set up application monitoring

### Docker Deployment (Future)

```dockerfile
# Dockerfile example (to be implemented)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

### How to Contribute

1. **Fork the Repository**: Create your own fork
2. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
3. **Follow Code Standards**: Use provided linting and formatting tools
4. **Write Tests**: Add tests for new functionality
5. **Update Documentation**: Update README and API documentation
6. **Submit Pull Request**: Create PR with detailed description

### Pull Request Guidelines

- **Clear Description**: Explain what changes were made and why
- **Code Quality**: Ensure code passes all linting checks
- **Testing**: Include tests for new functionality
- **Documentation**: Update relevant documentation
- **Breaking Changes**: Clearly mark any breaking changes

### Issue Reporting

When reporting issues, include:

- **Environment**: Node.js version, OS, database setup
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Error Messages**: Full error messages and stack traces

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: Check this README and PRD.md
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and general discussion

---

**Version:** 1.0.0  
**Type:** Backend API for Project Management System  
**Status:** 🚧 In Development  
**Last Updated:** $(date)
