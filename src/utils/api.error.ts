class APIError extends Error {
    statusCode: number;
    message: string = 'Something went wrong';
    errors?: string[];
    cause?: unknown;
    success: boolean;
    stack?: string;

    constructor(
        statusCode: number,
        message: string,
        errors?: string[],
        cause?: unknown,
        stack?: string,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message || 'Something went wrong';
        this.errors = errors;
        this.cause = cause;
        this.success = statusCode < 400;
        if (!stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { APIError };
