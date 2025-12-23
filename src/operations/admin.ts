/**
 * Admin operations for ZeroDB MCP Client
 * These operations require admin privileges
 */

import { ZeroDBClient } from '../client';
import {
  AdminSystemStatsResponse,
  AdminProjectsListRequest,
  AdminProjectsListResponse,
  AdminUserUsageRequest,
  AdminUserUsageResponse,
  AdminSystemHealthResponse,
  AdminOptimizeDatabaseRequest,
  AdminOptimizeDatabaseResponse
} from '../types';

export class AdminOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Get system-wide statistics (admin only)
   */
  async getSystemStats(): Promise<AdminSystemStatsResponse> {
    return this.client.get<AdminSystemStatsResponse>('/api/v1/admin/stats/system');
  }

  /**
   * List all projects in the system (admin only)
   */
  async listAllProjects(request?: AdminProjectsListRequest): Promise<AdminProjectsListResponse> {
    const params = new URLSearchParams();
    if (request?.limit) params.append('limit', request.limit.toString());
    if (request?.offset) params.append('offset', request.offset.toString());

    return this.client.get<AdminProjectsListResponse>(
      `/api/v1/admin/projects?${params.toString()}`
    );
  }

  /**
   * Get user usage statistics (admin only)
   */
  async getUserUsage(request: AdminUserUsageRequest): Promise<AdminUserUsageResponse> {
    return this.client.get<AdminUserUsageResponse>(
      `/api/v1/admin/users/${request.user_id}/usage`
    );
  }

  /**
   * Get system health status (admin only)
   */
  async getSystemHealth(): Promise<AdminSystemHealthResponse> {
    return this.client.get<AdminSystemHealthResponse>('/api/v1/admin/health');
  }

  /**
   * Trigger database optimization (admin only)
   */
  async optimizeDatabase(request: AdminOptimizeDatabaseRequest): Promise<AdminOptimizeDatabaseResponse> {
    return this.client.post<AdminOptimizeDatabaseResponse>(
      '/api/v1/admin/database/optimize',
      {
        operation: request.operation
      }
    );
  }
}
