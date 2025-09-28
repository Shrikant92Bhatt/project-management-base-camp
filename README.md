# Project Camp Backend

A RESTful API service designed to support collaborative project management with role-based access control.

## Overview

Project Camp Backend enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with a three-tier permission system.

## Development Status

🚧 **Currently in Development** - This project is actively being developed. The basic Express.js server structure is in place with TypeScript configuration. Core features are being implemented according to the Product Requirements Document (PRD).

### Current Implementation Status

- ✅ **Project Setup**: Express.js server with TypeScript configuration
- ✅ **Dependencies**: Core packages installed (Express, Mongoose, JWT, CORS)
- ✅ **Project Structure**: Organized folder structure with controllers, models, routes, middleware, etc.
- ✅ **Database Integration**: MongoDB connection setup with error handling
- ✅ **API Response System**: Generic API response and error handling classes
- ✅ **Constants**: User roles and task status enums defined
- ✅ **Enhanced CORS**: Configured CORS with credentials and custom headers
- 🚧 **Core Features**: Implementation in progress (see PRD.md for detailed specifications)
- ⏳ **Authentication System**: JWT-based auth system planned
- ⏳ **API Endpoints**: RESTful API endpoints planned

### Latest Changes

- **Database Connection**: Added MongoDB connection with proper error handling and startup integration
- **API Response System**: Created generic `APIResponse<T>` class and `IAPIResponse<T>` interface for type-safe responses
- **Error Handling**: Implemented `APIError` class for structured error responses
- **Constants**: Added user roles (`admin`, `project_admin`, `member`) and task status (`todo`, `in_progress`, `done`) enums
- **Enhanced Middleware**: Improved Express configuration with request size limits, static file serving, and CORS settings
- **Better Startup**: Integrated database connection with server startup for proper initialization order

## Key Features

- **User Authentication & Authorization**
    - JWT-based authentication with refresh tokens
    - Email verification and password reset
    - Role-based access control (Admin, Project Admin, Member)

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

The project follows a modular architecture with clear separation of concerns:

```
src/
├── app.ts              # Express application configuration
├── index.ts            # Application entry point with DB connection
├── constants/          # Application constants and enums
├── controller/         # Request handlers and business logic
├── db/                 # Database connection and configuration
├── middleware/         # Custom middleware functions
├── models/             # MongoDB schemas and data models
├── routes/             # API route definitions
├── utils/              # Utility functions and helpers
└── validators/         # Input validation schemas
```

### Utility Classes and Functions

#### API Response System

**APIResponse Class**: Generic response wrapper for consistent API responses

```typescript
import { APIResponse } from './utils';

// Success response
const successResponse = new APIResponse(
    200,
    userData,
    'User retrieved successfully',
);
// Returns: { statusCode: 200, data: User, message: "User retrieved successfully", success: true }

// Error response
const errorResponse = new APIResponse(404, null, 'User not found');
// Returns: { statusCode: 404, data: null, message: "User not found", success: false }
```

**APIError Class**: Structured error handling with status codes

```typescript
import { APIError } from './utils';

// Throw structured errors
throw new APIError(400, 'Validation failed', [
    'Email is required',
    'Password must be at least 8 characters',
]);

// Error response format
// { statusCode: 400, message: "Validation failed", errors: [...], success: false }
```

#### Async Handler Utility

**asyncHandler**: Wrapper for async route handlers to catch errors

```typescript
import { asyncHandler } from './utils';

// Wrap async controllers
const userController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new APIError(404, 'User not found');
        }
        res.json(new APIResponse(200, user, 'User retrieved successfully'));
    },
);
```

### Database Models

#### User Model

**Schema Structure**:

```typescript
{
    avatar: {
        url: String,
        localpath: String
    },
    username: String (unique, indexed, lowercase),
    email: String (unique, required, lowercase),
    fullname: String (required),
    password: String (required, hashed),
    isEmailVerified: Boolean (default: false),
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
    timestamps: true
}
```

**Instance Methods**:

```typescript
// Compare password
const isValid = await user.comparePassword(plainPassword);

// Generate JWT tokens
const accessToken = user.generateAuthToken();
const refreshToken = user.generateRefreshToken();

// Generate temporary tokens for email verification/password reset
const { unHashedToken, hashedToken, tokenExpiry } = user.generateTempToken();
```

**Pre-save Middleware**: Automatically hashes passwords before saving

### Email System

**Mail Templates**: Professional email templates using Mailgen

```typescript
import {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail,
} from './utils';

// Email verification template
const verificationContent = emailVerificationMailgenContent(
    'John Doe',
    'https://yourapp.com/verify?token=abc123',
);

// Password reset template
const resetContent = forgotPasswordMailgenContent(
    'John Doe',
    'https://yourapp.com/reset?token=xyz789',
);

// Send email
await sendEmail({
    email: 'user@example.com',
    subject: 'Verify your email',
    mailgenContent: verificationContent,
});
```

**Email Configuration**: Uses Nodemailer with Mailtrap for development

### Constants and Enums

**User Roles**:

```typescript
enum USER_ROLES_ENUM {
    ADMIN = 'admin', // Full system access
    PROJECT_ADMIN = 'project_admin', // Project-level admin
    MEMBER = 'member', // Basic member access
}

const AVAILABLE_USER_ROLES = Object.values(USER_ROLES_ENUM);
// ['admin', 'project_admin', 'member']
```

**Task Status**:

```typescript
enum TASK_STATUS_ENUM {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

const AVAILABLE_TASK_STATUS = Object.values(TASK_STATUS_ENUM);
// ['todo', 'in_progress', 'done']
```

### Database Connection

**MongoDB Integration**:

```typescript
import connectDB from './db';

// Connect to MongoDB with error handling
await connectDB();
// Automatically loads MONGODB_URI from environment variables
// Exits process on connection failure
```

### Application Configuration

**Express Setup**:

```typescript
// CORS Configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// Request parsing with size limits
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
```

## API Documentation

**Available Endpoints:**

- **Health Check**: `GET /` - Basic server status
- **Test Endpoint**: `GET /instagram` - Development test endpoint
- **Health Check API**: `GET /api/v1/healthcheck/` - Structured health check

**API Response Format**:

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

**Error Response Format**:

```json
{
    "statusCode": 400,
    "message": "Error message",
    "errors": ["Detailed error 1", "Detailed error 2"],
    "success": false
}
```

**Planned API Structure:**

- **Authentication**: `/api/v1/auth/`
- **Projects**: `/api/v1/projects/`
- **Tasks**: `/api/v1/tasks/`
- **Notes**: `/api/v1/notes/`
- **Health Check**: `/api/v1/healthcheck/`

For detailed API specifications, see [PRD.md](./PRD.md).

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
