"use strict";
/**
 * Table/NoSQL operations for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOperations = void 0;
const utils_1 = require("../utils");
class TableOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create a new table
     */
    async createTable(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/tables`, {
            table_name: request.table_name,
            schema_definition: request.schema
        });
    }
    /**
     * List all tables in a project
     */
    async listTables(projectId) {
        (0, utils_1.sanitizeProjectId)(projectId);
        return this.client.get(`/api/v1/zerodb/${projectId}/database/tables`);
    }
    /**
     * Get table details
     */
    async getTable(projectId, tableName) {
        (0, utils_1.sanitizeProjectId)(projectId);
        return this.client.get(`/api/v1/zerodb/${projectId}/database/tables/${tableName}`);
    }
    /**
     * Delete a table
     */
    async deleteTable(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        if (!request.confirm) {
            throw new Error('Table deletion requires confirmation (confirm: true)');
        }
        return this.client.delete(`/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}`);
    }
    /**
     * Insert rows into a table
     */
    async insertRows(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`, {
            rows: request.rows
        });
    }
    /**
     * Query rows from a table
     */
    async queryRows(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows/query`, {
            filters: request.filters,
            limit: request.limit || 100,
            offset: request.offset || 0,
            order_by: request.order_by
        });
    }
    /**
     * Update rows in a table
     */
    async updateRows(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.put(`/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`, {
            filters: request.filters,
            updates: request.updates
        });
    }
    /**
     * Delete rows from a table
     */
    async deleteRows(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        if (!request.confirm) {
            throw new Error('Row deletion requires confirmation (confirm: true)');
        }
        return this.client.delete(`/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`, {
            data: { filters: request.filters }
        });
    }
}
exports.TableOperations = TableOperations;
