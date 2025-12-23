/**
 * Admin operations for ZeroDB MCP Client
 * These operations require admin privileges
 */
import { ZeroDBClient } from '../client';
import { AdminSystemStatsResponse, AdminProjectsListRequest, AdminProjectsListResponse, AdminUserUsageRequest, AdminUserUsageResponse, AdminSystemHealthResponse, AdminOptimizeDatabaseRequest, AdminOptimizeDatabaseResponse } from '../types';
export declare class AdminOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Get system-wide statistics (admin only)
     */
    getSystemStats(): Promise<AdminSystemStatsResponse>;
    /**
     * List all projects in the system (admin only)
     */
    listAllProjects(request?: AdminProjectsListRequest): Promise<AdminProjectsListResponse>;
    /**
     * Get user usage statistics (admin only)
     */
    getUserUsage(request: AdminUserUsageRequest): Promise<AdminUserUsageResponse>;
    /**
     * Get system health status (admin only)
     */
    getSystemHealth(): Promise<AdminSystemHealthResponse>;
    /**
     * Trigger database optimization (admin only)
     */
    optimizeDatabase(request: AdminOptimizeDatabaseRequest): Promise<AdminOptimizeDatabaseResponse>;
}
//# sourceMappingURL=admin.d.ts.map