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

5. **Setup Automatic Version Updates** (Optional)

    Choose one of the following methods:

    **Method 1: Simple Git Hooks**
    ```bash
    npm run setup:git-hooks
    ```

    **Method 2: Husky (Recommended)**
    ```bash
    npm run setup:husky
    ```

    **Manual Version Updates**
    ```bash
    # Patch version (1.0.0 -> 1.0.1)
    npm run version:patch
    
    # Minor version (1.0.0 -> 1.1.0)
    npm run version:minor
    
    # Major version (1.0.0 -> 2.0.0)
    npm run version:major
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
- **Version Management**: Automatic patch version updates on every commit with version utilities

### Available Utilities
```typescript
// API Response
import { APIResponse, IAPIResponse } from './utils';

const response = new APIResponse<User>(200, userData, "User retrieved");
// response: { statusCode: 200, data: User, message: "User retrieved", success: true }

// API Error
import { APIError } from './utils';

throw new APIError(404, "User not found", ["Invalid user ID"]);

// Constants
import { USER_ROLES_ENUM, TASK_STATUS_ENUM } from './constants';

const userRole = USER_ROLES_ENUM.ADMIN; // 'admin'
const taskStatus = TASK_STATUS_ENUM.IN_PROGRESS; // 'in_progress'

// Version Management
import { VersionManager } from './utils';

const currentVersion = VersionManager.getCurrentVersion(); // '1.0.0'
const versionInfo = VersionManager.getVersionInfo(); // Full version object
const comparison = VersionManager.compareVersions('1.0.1', '1.0.0'); // 1
```

## API Documentation

**Note:** API endpoints are currently being implemented according to the Product Requirements Document (PRD.md).

**Available Endpoints:**

- **Health Check**: `GET /` - Basic server status
- **Version Info**: `GET /version` - Application version information
- **Test Endpoint**: `GET /instagram` - Development test endpoint

**Planned API Structure:**

- **Authentication**: `/api/v1/auth/`
- **Projects**: `/api/v1/projects/`
- **Tasks**: `/api/v1/tasks/`
- **Notes**: `/api/v1/notes/`
- **Health Check**: `/api/v1/healthcheck/`

For detailed API specifications, see [PRD.md](./PRD.md).

## Contributing

This project is currently in active development. Please refer to the PRD.md for the complete feature specifications and implementation roadmap.

---

**Version:** 1.0.0  
**Type:** Backend API for Project Management System  
**Status:** 🚧 In Development
