# Project Camp - System Design Documentation

## Table of Contents
1. [High-Level Design (HLD)](#high-level-design-hld)
2. [Low-Level Design (LLD)](#low-level-design-lld)
3. [Database Design](#database-design)
4. [API Architecture](#api-architecture)
5. [Authentication Flow](#authentication-flow)
6. [Security Architecture](#security-architecture)

## High-Level Design (HLD)

### System Architecture Overview

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

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Project Camp Backend                     │
├─────────────────────────────────────────────────────────────┤
│  API Layer                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Auth Routes │ │Project Routes│ │ Task Routes │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │Auth Controller│ │Project Ctrl │ │Task Controller│         │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  Middleware Layer                                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │Auth Middleware│ │Validation   │ │Error Handler│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  Data Access Layer                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │User Model   │ │Project Model│ │Task Model   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  Database Layer                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                MongoDB Database                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Low-Level Design (LLD)

### Authentication System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Flow                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User Registration                                       │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Register │───►│Validate │───►│Create   │              │
│     │Request  │    │Input    │    │User     │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Generate │◄───│Send     │◄───│Save     │              │
│     │Token    │    │Email    │    │User     │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
│  2. User Login                                              │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Login    │───►│Validate │───►│Find     │              │
│     │Request  │    │Input    │    │User     │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Generate │◄───│Compare  │◄───│Get      │              │
│     │Tokens   │    │Password │    │User     │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
│  3. Token Management                                        │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Access   │───►│Verify   │───►│Allow    │              │
│     │Token    │    │Token    │    │Access   │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Refresh  │◄───│Generate │◄───│Token    │              │
│     │Token    │    │New Token│    │Expired  │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Request Processing Flow                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Client Request                                             │
│      │                                                     │
│      ▼                                                     │
│  ┌─────────────┐                                           │
│  │   Express   │                                           │
│  │   Router    │                                           │
│  └─────────────┘                                           │
│      │                                                     │
│      ▼                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │Validation   │───►│Auth         │───►│Controller   │    │
│  │Middleware   │    │Middleware   │    │Logic        │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│      │                     │                     │        │
│      ▼                     ▼                     ▼        │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │Input        │    │Token        │    │Business     │    │
│  │Validation   │    │Verification │    │Logic        │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│                                 │                     │    │
│                                 ▼                     ▼    │
│                           ┌─────────────┐    ┌─────────────┐│
│                           │Database     │◄───│Data Access ││
│                           │Operations   │    │Layer       ││
│                           └─────────────┘    └─────────────┘│
│                                 │                     │    │
│                                 ▼                     ▼    │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │API Response │◄───│Error        │◄───│Response     │    │
│  │Format       │    │Handling     │    │Generation   │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│      │                                                     │
│      ▼                                                     │
│  Client Response                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Database Design

### Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────┐
│                    Database Schema                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐                                        │
│  │      Users      │                                        │
│  ├─────────────────┤                                        │
│  │ _id: ObjectId   │◄─────────────────────────────────────┐ │
│  │ username: String│                                        │ │
│  │ email: String   │                                        │ │
│  │ fullname: String│                                        │ │
│  │ password: String│                                        │ │
│  │ role: String    │                                        │ │
│  │ avatar: Object  │                                        │ │
│  │ isEmailVerified:│                                        │ │
│  │ Boolean         │                                        │ │
│  │ refreshToken:   │                                        │ │
│  │ String          │                                        │ │
│  │ tokens: Object  │                                        │ │
│  │ timestamps      │                                        │ │
│  └─────────────────┘                                        │ │
│                                                             │ │
│  ┌─────────────────┐                                        │ │
│  │    Projects     │                                        │ │
│  ├─────────────────┤                                        │ │
│  │ _id: ObjectId   │                                        │ │
│  │ name: String    │                                        │ │
│  │ description:    │                                        │ │
│  │ String          │                                        │ │
│  │ ownerId:        │────────────────────────────────────────┘ │
│  │ ObjectId        │                                        │
│  │ members: Array  │                                        │
│  │ status: String  │                                        │
│  │ timestamps      │                                        │
│  └─────────────────┘                                        │
│                                                             │
│  ┌─────────────────┐                                        │
│  │      Tasks      │                                        │
│  ├─────────────────┤                                        │
│  │ _id: ObjectId   │                                        │
│  │ title: String   │                                        │
│  │ description:    │                                        │
│  │ String          │                                        │
│  │ projectId:      │                                        │
│  │ ObjectId        │                                        │
│  │ assigneeId:     │                                        │
│  │ ObjectId        │                                        │
│  │ status: String  │                                        │
│  │ priority: String│                                        │
│  │ timestamps      │                                        │
│  └─────────────────┘                                        │
│                                                             │
│  ┌─────────────────┐                                        │
│  │      Notes      │                                        │
│  ├─────────────────┤                                        │
│  │ _id: ObjectId   │                                        │
│  │ content: String │                                        │
│  │ projectId:      │                                        │
│  │ ObjectId        │                                        │
│  │ authorId:       │                                        │
│  │ ObjectId        │                                        │
│  │ timestamps      │                                        │
│  └─────────────────┘                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Database Collections Structure

```
MongoDB Collections:

users:
├── _id: ObjectId
├── username: String (unique, indexed)
├── email: String (unique, indexed)
├── fullname: String
├── password: String (hashed)
├── role: String (admin, project_admin, member)
├── avatar: {
│   ├── url: String
│   └── localpath: String
│   }
├── isEmailVerified: Boolean
├── refreshToken: String
├── emailVerificationToken: String
├── emailVerificationTokenExpiry: Date
├── forgotPasswordToken: String
├── forgotPasswordTokenExpiry: Date
├── createdAt: Date
└── updatedAt: Date

projects:
├── _id: ObjectId
├── name: String
├── description: String
├── ownerId: ObjectId (ref: users)
├── members: [{
│   ├── userId: ObjectId (ref: users)
│   └── role: String
│   }]
├── status: String (active, completed, archived)
├── createdAt: Date
└── updatedAt: Date

tasks:
├── _id: ObjectId
├── title: String
├── description: String
├── projectId: ObjectId (ref: projects)
├── assigneeId: ObjectId (ref: users)
├── status: String (todo, in_progress, done)
├── priority: String (low, medium, high)
├── subtasks: [{
│   ├── title: String
│   ├── completed: Boolean
│   └── createdAt: Date
│   }]
├── attachments: [String]
├── createdAt: Date
└── updatedAt: Date

notes:
├── _id: ObjectId
├── content: String
├── projectId: ObjectId (ref: projects)
├── authorId: ObjectId (ref: users)
├── createdAt: Date
└── updatedAt: Date
```

## API Architecture

### RESTful API Design

```
API Versioning: /api/v1/

Authentication Endpoints:
├── POST   /auth/register              # User registration
├── POST   /auth/login                 # User login
├── POST   /auth/logout                # User logout
├── GET    /auth/current-user          # Get current user
├── GET    /auth/verify-email/:token   # Verify email
├── POST   /auth/forgot-password       # Request password reset
├── POST   /auth/reset-password/:token # Reset password
├── POST   /auth/refresh-token         # Refresh access token
└── POST   /auth/change-password       # Change password

Project Endpoints:
├── GET    /projects                   # Get all projects
├── POST   /projects                   # Create project
├── GET    /projects/:id               # Get project by ID
├── PUT    /projects/:id               # Update project
├── DELETE /projects/:id               # Delete project
├── POST   /projects/:id/members       # Add project member
└── DELETE /projects/:id/members/:userId # Remove project member

Task Endpoints:
├── GET    /tasks                      # Get all tasks
├── POST   /tasks                      # Create task
├── GET    /tasks/:id                  # Get task by ID
├── PUT    /tasks/:id                  # Update task
├── DELETE /tasks/:id                  # Delete task
└── GET    /projects/:id/tasks         # Get tasks by project

Notes Endpoints:
├── GET    /notes                      # Get all notes
├── POST   /notes                      # Create note
├── GET    /notes/:id                  # Get note by ID
├── PUT    /notes/:id                  # Update note
├── DELETE /notes/:id                  # Delete note
└── GET    /projects/:id/notes         # Get notes by project

Utility Endpoints:
├── GET    /healthcheck                # Health check
└── GET    /version                    # Version info
```

## Authentication Flow

### JWT Token Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    JWT Authentication Flow                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Login Process                                           │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Client   │───►│Server   │───►│Validate │              │
│     │Login    │    │Receive  │    │Credentials│             │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Generate │◄───│Create   │◄───│User     │              │
│     │Tokens   │    │JWT      │    │Found    │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│      │                                                     │
│      ▼                                                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Send     │◄───│Set      │◄───│Store    │              │
│     │Response │    │Cookies  │    │Tokens   │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
│  2. Request Authentication                                  │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Client   │───►│Extract  │───►│Verify   │              │
│     │Request  │    │Token    │    │JWT      │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Allow    │◄───│Valid    │◄───│Token    │              │
│     │Access   │    │Token    │    │Valid?   │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
│  3. Token Refresh                                           │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Token    │───►│Check    │───►│Generate │              │
│     │Expired  │    │Refresh  │    │New      │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                      │                     │
│                                      ▼                     │
│     ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│     │Update   │◄───│Send     │◄───│Access   │              │
│     │Cookies  │    │New      │    │Token    │              │
│     └─────────┘    └─────────┘    └─────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Security Architecture

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Application Layer                        │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │Input        │ │Rate         │ │CORS         │      │ │
│  │  │Validation   │ │Limiting     │ │Protection   │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Authentication Layer                     │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │JWT Token    │ │Password     │ │Session      │      │ │
│  │  │Verification │ │Hashing      │ │Management   │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Authorization Layer                      │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │Role-Based   │ │Resource     │ │Permission   │      │ │
│  │  │Access       │ │Protection   │ │Checking     │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Data Protection Layer                    │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │Data         │ │Encryption   │ │Secure       │      │ │
│  │  │Sanitization │ │at Rest      │ │Transmission │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Security Features Implementation

```
Security Features:

1. Authentication Security:
   ├── JWT Tokens with expiration
   ├── Refresh token rotation
   ├── Password hashing (bcrypt)
   ├── Email verification
   └── Secure password reset

2. Authorization Security:
   ├── Role-based access control
   ├── Resource-level permissions
   ├── Middleware protection
   └── Token validation

3. Data Security:
   ├── Input validation & sanitization
   ├── SQL injection prevention
   ├── XSS protection
   ├── CSRF protection
   └── Sensitive data encryption

4. Network Security:
   ├── HTTPS enforcement
   ├── CORS configuration
   ├── Rate limiting
   ├── Request size limits
   └── Security headers

5. Email Security:
   ├── SSL/TLS for SMTP
   ├── Secure token generation
   ├── Token expiration
   └── Email template security
```

---

## Design Decisions

### Technology Choices

1. **Backend Framework**: Express.js
   - Lightweight and flexible
   - Large ecosystem and community
   - Excellent TypeScript support

2. **Database**: MongoDB
   - Document-based storage
   - Flexible schema for evolving requirements
   - Excellent Node.js integration

3. **Authentication**: JWT
   - Stateless authentication
   - Scalable across multiple servers
   - Industry standard

4. **Email Service**: Nodemailer + Mailgen
   - Reliable email delivery
   - Professional email templates
   - Multiple provider support

### Scalability Considerations

1. **Horizontal Scaling**: Stateless JWT authentication
2. **Database Scaling**: MongoDB sharding and replication
3. **Caching**: Redis for session management (future)
4. **Load Balancing**: Multiple server instances
5. **Microservices**: Service separation for large scale

---

*This design document serves as the technical blueprint for the Project Camp backend system.*
