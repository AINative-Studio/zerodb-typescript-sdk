"use strict";
/**
 * File operations for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOperations = void 0;
const utils_1 = require("../utils");
class FileOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Upload a file
     */
    async upload(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/files`, {
            file_name: request.file_name,
            file_data: request.file_data,
            content_type: request.content_type,
            file_metadata: request.metadata
        });
    }
    /**
     * Upload a file from Buffer
     */
    async uploadBuffer(projectId, fileName, buffer, contentType, metadata) {
        return this.upload({
            project_id: projectId,
            file_name: fileName,
            file_data: (0, utils_1.encodeToBase64)(buffer),
            content_type: contentType,
            metadata
        });
    }
    /**
     * Download a file
     */
    async download(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.get(`/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}`);
    }
    /**
     * List files
     */
    async list(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        const params = new URLSearchParams();
        if (request.prefix)
            params.append('prefix', request.prefix);
        if (request.limit)
            params.append('limit', request.limit.toString());
        if (request.offset)
            params.append('offset', request.offset.toString());
        return this.client.get(`/api/v1/zerodb/${request.project_id}/database/files?${params.toString()}`);
    }
    /**
     * Delete a file
     */
    async delete(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.delete(`/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}`);
    }
    /**
     * Get file metadata
     */
    async getMetadata(projectId, fileId) {
        (0, utils_1.sanitizeProjectId)(projectId);
        return this.client.get(`/api/v1/zerodb/${projectId}/database/files/${fileId}/metadata`);
    }
    /**
     * Generate presigned URL
     */
    async generatePresignedUrl(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}/presigned-url`, {
            expiration_seconds: request.expiration_seconds || 3600,
            operation: request.operation
        });
    }
}
exports.FileOperations = FileOperations;
