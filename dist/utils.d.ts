/**
 * Utility functions for the ZeroDB client
 */
/**
 * Sleep for a specified number of milliseconds
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Validate UUID format
 */
export declare function isValidUUID(uuid: string): boolean;
/**
 * Validate vector embedding dimensions
 */
export declare function validateEmbedding(embedding: number[], expectedDimensions?: number): void;
/**
 * Encode file to base64
 */
export declare function encodeToBase64(data: Buffer | string): string;
/**
 * Decode base64 to buffer
 */
export declare function decodeFromBase64(base64: string): Buffer;
/**
 * Sanitize project ID (ensure it's a valid UUID)
 */
export declare function sanitizeProjectId(projectId: string): string;
/**
 * Build query string from parameters
 */
export declare function buildQueryString(params: Record<string, any>): string;
/**
 * Retry a function with exponential backoff
 */
export declare function retryWithBackoff<T>(fn: () => Promise<T>, maxAttempts?: number, initialDelay?: number): Promise<T>;
/**
 * Parse error response
 */
export declare function parseErrorResponse(error: any): {
    message: string;
    code?: string;
    details?: any;
};
//# sourceMappingURL=utils.d.ts.map