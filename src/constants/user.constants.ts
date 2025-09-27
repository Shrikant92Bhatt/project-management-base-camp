export enum USER_ROLES_ENUM {
    ADMIN = 'admin',
    PROJECT_ADMIN = 'project_admin',
    MEMBER = 'member',
}

export const AVAILABLE_USER_ROLES = Object.values(USER_ROLES_ENUM);

export enum TASK_STATUS_ENUM {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export const AVAILABLE_TASK_STATUS = Object.values(TASK_STATUS_ENUM);
