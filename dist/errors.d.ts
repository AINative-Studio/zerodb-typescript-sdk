/**
 * Custom error classes for AINative SDK
 */
export declare class AINativeError extends Error {
    code?: string;
    status?: number;
    details?: any;
    requestId?: string;
    constructor(message: string, code?: string, status?: number, details?: any, requestId?: string);
    toJSON(): {
        name: string;
        message: string;
        code: string | undefined;
        status: number | undefined;
        details: any;
        requestId: string | undefined;
        stack: string | undefined;
    };
}
export declare class NetworkError extends AINativeError {
    constructor(message: string, details?: any);
}
export declare class AuthenticationError extends AINativeError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AINativeError {
    constructor(message?: string);
}
export declare class RateLimitError extends AINativeError {
    retryAfter?: number;
    constructor(message?: string, retryAfter?: number);
}
export declare class ValidationError extends AINativeError {
    constructor(message: string, details?: any);
}
export declare class NotFoundError extends AINativeError {
    constructor(message?: string);
}
export declare class TimeoutError extends AINativeError {
    constructor(message?: string);
}
export declare class ServerError extends AINativeError {
    constructor(message?: string, status?: number);
}
//# sourceMappingURL=errors.d.ts.map