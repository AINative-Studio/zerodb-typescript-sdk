/**
 * Type definitions for admin operations
 * These operations require admin privileges
 */

import { UUID, Project } from './index';

// System statistics
export interface AdminSystemStatsResponse {
  total_projects: number;
  total_users: number;
  total_vectors: number;
  storage_usage_gb: number;
  api_calls_24h: number;
}

// All projects list
export interface AdminProjectsListRequest {
  limit?: number;
  offset?: number;
}

export interface AdminProjectsListResponse {
  projects: Project[];
  total_count: number;
}

// User usage
export interface AdminUserUsageRequest {
  user_id: UUID;
}

export interface AdminUserUsageResponse {
  user: {
    user_id: UUID;
    email: string;
    tier: string;
    created_at: string;
  };
  projects: number;
  usage: {
    storage_bytes: number;
    api_calls: number;
    bandwidth_bytes: number;
  };
  tier: string;
}

// System health
export interface AdminSystemHealthResponse {
  status: 'healthy' | 'degraded' | 'down';
  services: {
    database: 'up' | 'down';
    cache: 'up' | 'down';
    storage: 'up' | 'down';
    queue: 'up' | 'down';
  };
  uptime_seconds: number;
  error_rate_percent: number;
}

// Database optimization
export interface AdminOptimizeDatabaseRequest {
  operation: 'vacuum' | 'reindex' | 'analyze';
}

export interface AdminOptimizeDatabaseResponse {
  status: 'started' | 'completed';
  estimated_duration_seconds?: number;
  space_freed_bytes?: number;
}
