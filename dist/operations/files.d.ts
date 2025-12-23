/**
 * File operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { FileUploadRequest, FileUploadResponse, FileDownloadRequest, FileDownloadResponse, FileMetadata, FileListRequest, FileListResponse, FileDeleteRequest, FileDeleteResponse, PresignedURLRequest, PresignedURLResponse, UUID } from '../types';
export declare class FileOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Upload a file
     */
    upload(request: FileUploadRequest): Promise<FileUploadResponse>;
    /**
     * Upload a file from Buffer
     */
    uploadBuffer(projectId: UUID, fileName: string, buffer: Buffer, contentType: string, metadata?: Record<string, any>): Promise<FileUploadResponse>;
    /**
     * Download a file
     */
    download(request: FileDownloadRequest): Promise<FileDownloadResponse>;
    /**
     * List files
     */
    list(request: FileListRequest): Promise<FileListResponse>;
    /**
     * Delete a file
     */
    delete(request: FileDeleteRequest): Promise<FileDeleteResponse>;
    /**
     * Get file metadata
     */
    getMetadata(projectId: UUID, fileId: UUID): Promise<FileMetadata>;
    /**
     * Generate presigned URL
     */
    generatePresignedUrl(request: PresignedURLRequest): Promise<PresignedURLResponse>;
}
//# sourceMappingURL=files.d.ts.map