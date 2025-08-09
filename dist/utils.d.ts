/**
 * Utility functions for AINative SDK
 */
/**
 * Sleep for specified milliseconds
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Retry a function with exponential backoff
 */
export declare function retry<T>(fn: () => Promise<T>, options?: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    factor?: number;
    onRetry?: (attempt: number, error: Error) => void;
}): Promise<T>;
/**
 * Create a debounced function
 */
export declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Create a throttled function
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Chunk an array into smaller arrays
 */
export declare function chunk<T>(array: T[], size: number): T[][];
/**
 * Generate a UUID v4
 */
export declare function uuid(): string;
/**
 * Check if running in browser
 */
export declare function isBrowser(): boolean;
/**
 * Check if running in Node.js
 */
export declare function isNode(): boolean;
/**
 * Deep merge objects
 */
export declare function deepMerge(target: any, ...sources: any[]): any;
/**
 * Format bytes to human readable string
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Parse query string to object
 */
export declare function parseQueryString(queryString: string): Record<string, string>;
/**
 * Build query string from object
 */
export declare function buildQueryString(params: Record<string, any>): string;
//# sourceMappingURL=utils.d.ts.map