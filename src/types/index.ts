/**
 * Common types and interfaces used across the SDK
 */

// Base response wrapper
export interface ZeroDBResponse<T = any> {
  success: boolean;
  operation?: string;
  result?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  timestamp?: string;
}

// Client configuration
export interface ClientConfig {
  apiKey?: string;
  jwtToken?: string;
  baseURL?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

// Pagination
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total_count: number;
  has_more: boolean;
  limit: number;
  offset: number;
}

// Common metadata
export interface Metadata {
  [key: string]: any;
}

// Timestamp fields
export interface TimestampFields {
  created_at: string;
  updated_at?: string;
}

// UUID type
export type UUID = string;

// Export all sub-modules
export * from './vectors';
export * from './quantum';
export * from './tables';
export * from './files';
export * from './events';
export * from './projects';
export * from './rlhf';
export * from './admin';
export * from './agents';
