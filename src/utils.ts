/**
 * Utility functions for the ZeroDB client
 */

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate vector embedding dimensions
 */
export function validateEmbedding(embedding: number[], expectedDimensions: number = 1536): void {
  if (!Array.isArray(embedding)) {
    throw new Error('Embedding must be an array');
  }
  if (embedding.length !== expectedDimensions) {
    throw new Error(`Embedding must have ${expectedDimensions} dimensions, got ${embedding.length}`);
  }
  if (!embedding.every(n => typeof n === 'number' && !isNaN(n))) {
    throw new Error('Embedding must contain only valid numbers');
  }
}

/**
 * Encode file to base64
 */
export function encodeToBase64(data: Buffer | string): string {
  if (Buffer.isBuffer(data)) {
    return data.toString('base64');
  }
  return Buffer.from(data).toString('base64');
}

/**
 * Decode base64 to buffer
 */
export function decodeFromBase64(base64: string): Buffer {
  return Buffer.from(base64, 'base64');
}

/**
 * Sanitize project ID (ensure it's a valid UUID)
 */
export function sanitizeProjectId(projectId: string): string {
  if (!isValidUUID(projectId)) {
    throw new Error(`Invalid project ID format: ${projectId}`);
  }
  return projectId;
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        break;
      }

      const delay = initialDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Parse error response
 */
export function parseErrorResponse(error: any): { message: string; code?: string; details?: any } {
  if (error.response?.data) {
    const data = error.response.data;
    return {
      message: data.message || data.detail || error.message,
      code: data.code,
      details: data.details || data
    };
  }
  return {
    message: error.message || 'An unknown error occurred'
  };
}
