"use strict";
/**
 * Admin operations for ZeroDB MCP Client
 * These operations require admin privileges
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOperations = void 0;
class AdminOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get system-wide statistics (admin only)
     */
    async getSystemStats() {
        return this.client.get('/api/v1/admin/stats/system');
    }
    /**
     * List all projects in the system (admin only)
     */
    async listAllProjects(request) {
        const params = new URLSearchParams();
        if (request?.limit)
            params.append('limit', request.limit.toString());
        if (request?.offset)
            params.append('offset', request.offset.toString());
        return this.client.get(`/api/v1/admin/projects?${params.toString()}`);
    }
    /**
     * Get user usage statistics (admin only)
     */
    async getUserUsage(request) {
        return this.client.get(`/api/v1/admin/users/${request.user_id}/usage`);
    }
    /**
     * Get system health status (admin only)
     */
    async getSystemHealth() {
        return this.client.get('/api/v1/admin/health');
    }
    /**
     * Trigger database optimization (admin only)
     */
    async optimizeDatabase(request) {
        return this.client.post('/api/v1/admin/database/optimize', {
            operation: request.operation
        });
    }
}
exports.AdminOperations = AdminOperations;
