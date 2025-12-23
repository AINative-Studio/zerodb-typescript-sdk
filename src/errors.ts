/**
 * Custom error classes for ZeroDB MCP Client
 */

export class ZeroDBError extends Error {
  public readonly statusCode?: number;
  public readonly response?: any;

  constructor(message: string, response?: any, statusCode?: number) {
    super(message);
    this.name = 'ZeroDBError';
    this.response = response;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ZeroDBError.prototype);
  }
}

export class AuthenticationError extends ZeroDBError {
  constructor(message: string = 'Authentication failed', response?: any) {
    super(message, response, 401);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends ZeroDBError {
  constructor(message: string = 'Insufficient permissions', response?: any) {
    super(message, response, 403);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class RateLimitError extends ZeroDBError {
  public readonly retryAfter?: number;

  constructor(message: string = 'Rate limit exceeded', response?: any, retryAfter?: number) {
    super(message, response, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class ValidationError extends ZeroDBError {
  public readonly errors?: Record<string, string[]>;

  constructor(message: string = 'Validation failed', errors?: Record<string, string[]>, response?: any) {
    super(message, response, 422);
    this.name = 'ValidationError';
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends ZeroDBError {
  constructor(message: string = 'Resource not found', response?: any) {
    super(message, response, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class NetworkError extends ZeroDBError {
  constructor(message: string = 'Network request failed', response?: any) {
    super(message, response);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class TimeoutError extends ZeroDBError {
  constructor(message: string = 'Request timeout', response?: any) {
    super(message, response, 408);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
