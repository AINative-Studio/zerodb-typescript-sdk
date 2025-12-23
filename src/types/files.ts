/**
 * Type definitions for file operations
 */

import { UUID, Metadata, TimestampFields } from './index';

// File upload
export interface FileUploadRequest {
  project_id: UUID;
  file_name: string;
  file_data: string; // Base64 encoded
  content_type: string;
  metadata?: Metadata;
}

export interface FileUploadResponse {
  file_id: UUID;
  storage_url: string;
  size_bytes: number;
  upload_time_ms: number;
}

// File download
export interface FileDownloadRequest {
  project_id: UUID;
  file_id: UUID;
}

export interface FileDownloadResponse {
  file_data: string; // Base64 encoded
  file_name: string;
  content_type: string;
  size_bytes: number;
}

// File metadata
export interface FileMetadata extends TimestampFields {
  file_id: UUID;
  project_id: UUID;
  file_name: string;
  file_key: string;
  content_type: string;
  size_bytes: number;
  file_metadata?: Metadata;
}

// File list
export interface FileListRequest {
  project_id: UUID;
  prefix?: string;
  limit?: number;
  offset?: number;
}

export interface FileListResponse {
  files: FileMetadata[];
  total_count: number;
  has_more: boolean;
}

// File deletion
export interface FileDeleteRequest {
  project_id: UUID;
  file_id: UUID;
}

export interface FileDeleteResponse {
  status: 'deleted' | 'not_found';
  freed_bytes: number;
}

// Presigned URL
export interface PresignedURLRequest {
  project_id: UUID;
  file_id: UUID;
  expiration_seconds?: number; // default: 3600
  operation: 'upload' | 'download';
}

export interface PresignedURLResponse {
  presigned_url: string;
  expires_at: string;
}
