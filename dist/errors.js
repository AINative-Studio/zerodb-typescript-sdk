"use strict";
/**
 * Custom error classes for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.NetworkError = exports.NotFoundError = exports.ValidationError = exports.RateLimitError = exports.AuthorizationError = exports.AuthenticationError = exports.ZeroDBError = void 0;
class ZeroDBError extends Error {
    constructor(message, response, statusCode) {
        super(message);
        this.name = 'ZeroDBError';
        this.response = response;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ZeroDBError.prototype);
    }
}
exports.ZeroDBError = ZeroDBError;
class AuthenticationError extends ZeroDBError {
    constructor(message = 'Authentication failed', response) {
        super(message, response, 401);
        this.name = 'AuthenticationError';
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends ZeroDBError {
    constructor(message = 'Insufficient permissions', response) {
        super(message, response, 403);
        this.name = 'AuthorizationError';
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}
exports.AuthorizationError = AuthorizationError;
class RateLimitError extends ZeroDBError {
    constructor(message = 'Rate limit exceeded', response, retryAfter) {
        super(message, response, 429);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}
exports.RateLimitError = RateLimitError;
class ValidationError extends ZeroDBError {
    constructor(message = 'Validation failed', errors, response) {
        super(message, response, 422);
        this.name = 'ValidationError';
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends ZeroDBError {
    constructor(message = 'Resource not found', response) {
        super(message, response, 404);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class NetworkError extends ZeroDBError {
    constructor(message = 'Network request failed', response) {
        super(message, response);
        this.name = 'NetworkError';
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}
exports.NetworkError = NetworkError;
class TimeoutError extends ZeroDBError {
    constructor(message = 'Request timeout', response) {
        super(message, response, 408);
        this.name = 'TimeoutError';
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
exports.TimeoutError = TimeoutError;
