# Project Camp Backend

A RESTful API service designed to support collaborative project management with role-based access control.

## Overview

Project Camp Backend enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with a three-tier permission system.

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

| Role | Permissions |
|------|-------------|
| Admin | Full system access, project management, team management |
| Project Admin | Project-level administrative access, task management |
| Member | View projects, update task completion status |

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

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shrikant92Bhatt/project-management-base-camp.git
   cd project-camp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   # Edit .env with your configuration
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
   npx tsc
   ```

### Project Structure

```
project-camp/
├── src/           # TypeScript source files
├── dist/          # Compiled JavaScript files
├── public/        # Static files
├── package.json   # Dependencies and scripts
├── tsconfig.json  # TypeScript configuration
└── .env          # Environment variables
```

## API Documentation

[Add API documentation link here]

---

**Version:** 1.0.0  
**Type:** Backend API for Project Management System
