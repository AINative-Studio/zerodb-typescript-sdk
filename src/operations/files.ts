/**
 * File operations for ZeroDB MCP Client
 */

import { ZeroDBClient } from '../client';
import {
  FileUploadRequest,
  FileUploadResponse,
  FileDownloadRequest,
  FileDownloadResponse,
  FileMetadata,
  FileListRequest,
  FileListResponse,
  FileDeleteRequest,
  FileDeleteResponse,
  PresignedURLRequest,
  PresignedURLResponse,
  UUID
} from '../types';
import { sanitizeProjectId, encodeToBase64 } from '../utils';

export class FileOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Upload a file
   */
  async upload(request: FileUploadRequest): Promise<FileUploadResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<FileUploadResponse>(
      `/api/v1/zerodb/${request.project_id}/database/files`,
      {
        file_name: request.file_name,
        file_data: request.file_data,
        content_type: request.content_type,
        file_metadata: request.metadata
      }
    );
  }

  /**
   * Upload a file from Buffer
   */
  async uploadBuffer(
    projectId: UUID,
    fileName: string,
    buffer: Buffer,
    contentType: string,
    metadata?: Record<string, any>
  ): Promise<FileUploadResponse> {
    return this.upload({
      project_id: projectId,
      file_name: fileName,
      file_data: encodeToBase64(buffer),
      content_type: contentType,
      metadata
    });
  }

  /**
   * Download a file
   */
  async download(request: FileDownloadRequest): Promise<FileDownloadResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.get<FileDownloadResponse>(
      `/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}`
    );
  }

  /**
   * List files
   */
  async list(request: FileListRequest): Promise<FileListResponse> {
    sanitizeProjectId(request.project_id);

    const params = new URLSearchParams();
    if (request.prefix) params.append('prefix', request.prefix);
    if (request.limit) params.append('limit', request.limit.toString());
    if (request.offset) params.append('offset', request.offset.toString());

    return this.client.get<FileListResponse>(
      `/api/v1/zerodb/${request.project_id}/database/files?${params.toString()}`
    );
  }

  /**
   * Delete a file
   */
  async delete(request: FileDeleteRequest): Promise<FileDeleteResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.delete<FileDeleteResponse>(
      `/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}`
    );
  }

  /**
   * Get file metadata
   */
  async getMetadata(projectId: UUID, fileId: UUID): Promise<FileMetadata> {
    sanitizeProjectId(projectId);

    return this.client.get<FileMetadata>(
      `/api/v1/zerodb/${projectId}/database/files/${fileId}/metadata`
    );
  }

  /**
   * Generate presigned URL
   */
  async generatePresignedUrl(request: PresignedURLRequest): Promise<PresignedURLResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<PresignedURLResponse>(
      `/api/v1/zerodb/${request.project_id}/database/files/${request.file_id}/presigned-url`,
      {
        expiration_seconds: request.expiration_seconds || 3600,
        operation: request.operation
      }
    );
  }
}
