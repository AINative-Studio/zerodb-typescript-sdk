/**
 * Custom error classes for ZeroDB MCP Client
 */
export declare class ZeroDBError extends Error {
    readonly statusCode?: number;
    readonly response?: any;
    constructor(message: string, response?: any, statusCode?: number);
}
export declare class AuthenticationError extends ZeroDBError {
    constructor(message?: string, response?: any);
}
export declare class AuthorizationError extends ZeroDBError {
    constructor(message?: string, response?: any);
}
export declare class RateLimitError extends ZeroDBError {
    readonly retryAfter?: number;
    constructor(message?: string, response?: any, retryAfter?: number);
}
export declare class ValidationError extends ZeroDBError {
    readonly errors?: Record<string, string[]>;
    constructor(message?: string, errors?: Record<string, string[]>, response?: any);
}
export declare class NotFoundError extends ZeroDBError {
    constructor(message?: string, response?: any);
}
export declare class NetworkError extends ZeroDBError {
    constructor(message?: string, response?: any);
}
export declare class TimeoutError extends ZeroDBError {
    constructor(message?: string, response?: any);
}
//# sourceMappingURL=errors.d.ts.map