"use strict";
/**
 * Project operations for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOperations = void 0;
const utils_1 = require("../utils");
class ProjectOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create a new project
     */
    async create(request) {
        return this.client.post('/api/v1/zerodb/projects', {
            project_name: request.name,
            description: request.description,
            tier: request.tier || 'free'
        });
    }
    /**
     * Get project details
     */
    async get(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.get(`/api/v1/zerodb/projects/${request.project_id}`);
    }
    /**
     * List all projects
     */
    async list() {
        return this.client.get('/api/v1/zerodb/projects');
    }
    /**
     * Update project
     */
    async update(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.patch(`/api/v1/zerodb/projects/${request.project_id}`, {
            project_name: request.name,
            description: request.description,
            tier: request.tier
        });
    }
    /**
     * Delete project
     */
    async delete(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        if (!request.confirm) {
            throw new Error('Project deletion requires confirmation (confirm: true)');
        }
        return this.client.delete(`/api/v1/zerodb/projects/${request.project_id}`);
    }
    /**
     * Get project statistics
     */
    async stats(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.get(`/api/v1/zerodb/projects/${request.project_id}/usage`);
    }
    /**
     * Enable database for project
     */
    async enableDatabase(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database`, {});
    }
}
exports.ProjectOperations = ProjectOperations;
