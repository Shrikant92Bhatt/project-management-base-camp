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
- 🚧 **Core Features**: Implementation in progress (see PRD.md for detailed specifications)
- ⏳ **Database Integration**: MongoDB integration planned
- ⏳ **Authentication System**: JWT-based auth system planned
- ⏳ **API Endpoints**: RESTful API endpoints planned

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
- **MongoDB** (for database - will be required when database integration is implemented)

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
    PORT=3000
    # Add other environment variables as needed for database, JWT secrets, etc.
    ```

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
│   ├── app.ts             # Express app configuration
│   ├── index.ts           # Application entry point
│   ├── controller/        # Request handlers (to be implemented)
│   ├── db/               # Database connection and models (to be implemented)
│   ├── middleware/       # Custom middleware functions (to be implemented)
│   ├── models/           # Data models and schemas (to be implemented)
│   ├── routes/           # API route definitions (to be implemented)
│   ├── utils/            # Utility functions (to be implemented)
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

The basic Express server is currently running with:
- ✅ Basic Express.js setup with CORS enabled
- ✅ JSON middleware for request parsing
- ✅ TypeScript compilation and development setup
- ✅ Basic health check endpoint at `/`
- ✅ Test endpoint at `/instagram`

**To start the development server:**
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## API Documentation

**Note:** API endpoints are currently being implemented according to the Product Requirements Document (PRD.md). 

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
