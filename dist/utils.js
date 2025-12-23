"use strict";
/**
 * Utility functions for the ZeroDB client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.isValidUUID = isValidUUID;
exports.validateEmbedding = validateEmbedding;
exports.encodeToBase64 = encodeToBase64;
exports.decodeFromBase64 = decodeFromBase64;
exports.sanitizeProjectId = sanitizeProjectId;
exports.buildQueryString = buildQueryString;
exports.retryWithBackoff = retryWithBackoff;
exports.parseErrorResponse = parseErrorResponse;
/**
 * Sleep for a specified number of milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Validate UUID format
 */
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
/**
 * Validate vector embedding dimensions
 */
function validateEmbedding(embedding, expectedDimensions = 1536) {
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
function encodeToBase64(data) {
    if (Buffer.isBuffer(data)) {
        return data.toString('base64');
    }
    return Buffer.from(data).toString('base64');
}
/**
 * Decode base64 to buffer
 */
function decodeFromBase64(base64) {
    return Buffer.from(base64, 'base64');
}
/**
 * Sanitize project ID (ensure it's a valid UUID)
 */
function sanitizeProjectId(projectId) {
    if (!isValidUUID(projectId)) {
        throw new Error(`Invalid project ID format: ${projectId}`);
    }
    return projectId;
}
/**
 * Build query string from parameters
 */
function buildQueryString(params) {
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
async function retryWithBackoff(fn, maxAttempts = 3, initialDelay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts) {
                break;
            }
            const delay = initialDelay * Math.pow(2, attempt - 1);
            await sleep(delay);
        }
    }
    throw lastError;
}
/**
 * Parse error response
 */
function parseErrorResponse(error) {
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
