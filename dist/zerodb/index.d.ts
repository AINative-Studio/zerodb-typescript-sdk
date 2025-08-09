/**
 * ZeroDB client for TypeScript/JavaScript
 */
import type { AINativeClient } from '../client';
import type { ApiResponse, PaginationOptions } from '../types';
import type { Project, CreateProjectRequest, UpdateProjectRequest, Vector, UpsertVectorRequest, SearchVectorRequest, SearchVectorResponse, BatchUpsertRequest, Memory, StoreMemoryRequest, SearchMemoryRequest, DatabaseStatus, DatabaseConfig, Event, PublishEventRequest, StreamEventsOptions, FileMetadata, UploadFileRequest, Analytics, UsageMetrics, CostAnalysis } from '../types/zerodb';
export declare class ZeroDBClient {
    private client;
    constructor(client: AINativeClient);
    /**
     * Project Management
     */
    projects: {
        /**
         * List all projects
         */
        list: (options?: PaginationOptions) => Promise<ApiResponse<Project[]>>;
        /**
         * Create a new project
         */
        create: (data: CreateProjectRequest) => Promise<ApiResponse<Project>>;
        /**
         * Get project details
         */
        get: (projectId: string) => Promise<ApiResponse<Project>>;
        /**
         * Update project
         */
        update: (projectId: string, data: UpdateProjectRequest) => Promise<ApiResponse<Project>>;
        /**
         * Delete project
         */
        delete: (projectId: string) => Promise<ApiResponse<void>>;
        /**
         * Suspend project
         */
        suspend: (projectId: string) => Promise<ApiResponse<Project>>;
        /**
         * Activate project
         */
        activate: (projectId: string) => Promise<ApiResponse<Project>>;
    };
    /**
     * Database Management
     */
    database: {
        /**
         * Get database status
         */
        status: (projectId: string) => Promise<ApiResponse<DatabaseStatus>>;
        /**
         * Enable database for project
         */
        enable: (projectId: string) => Promise<ApiResponse<DatabaseStatus>>;
        /**
         * Update database configuration
         */
        updateConfig: (projectId: string, config: DatabaseConfig) => Promise<ApiResponse<DatabaseStatus>>;
    };
    /**
     * Vector Operations
     */
    vectors: {
        /**
         * Upsert a vector
         */
        upsert: (projectId: string, data: UpsertVectorRequest) => Promise<ApiResponse<Vector>>;
        /**
         * Search vectors
         */
        search: (projectId: string, data: SearchVectorRequest) => Promise<ApiResponse<SearchVectorResponse>>;
        /**
         * Batch upsert vectors
         */
        batchUpsert: (projectId: string, data: BatchUpsertRequest) => Promise<ApiResponse<{
            inserted: number;
        }>>;
        /**
         * List vectors
         */
        list: (projectId: string, namespace?: string, limit?: number) => Promise<ApiResponse<Vector[]>>;
    };
    /**
     * Memory Operations
     */
    memory: {
        /**
         * Store memory
         */
        store: (projectId: string, data: StoreMemoryRequest) => Promise<ApiResponse<Memory>>;
        /**
         * Search memories
         */
        search: (projectId: string, data: SearchMemoryRequest) => Promise<ApiResponse<Memory[]>>;
        /**
         * List memories
         */
        list: (projectId: string, options?: PaginationOptions) => Promise<ApiResponse<Memory[]>>;
    };
    /**
     * Event Operations
     */
    events: {
        /**
         * Publish an event
         */
        publish: (projectId: string, data: PublishEventRequest) => Promise<ApiResponse<Event>>;
        /**
         * List events
         */
        list: (projectId: string, topic?: string, limit?: number) => Promise<ApiResponse<Event[]>>;
        /**
         * Stream events (Server-Sent Events)
         */
        stream: (projectId: string, options?: StreamEventsOptions) => EventSource;
    };
    /**
     * File Operations
     */
    files: {
        /**
         * Upload file metadata
         */
        upload: (projectId: string, data: UploadFileRequest) => Promise<ApiResponse<FileMetadata>>;
        /**
         * List files
         */
        list: (projectId: string, options?: PaginationOptions) => Promise<ApiResponse<FileMetadata[]>>;
    };
    /**
     * Analytics Operations
     */
    analytics: {
        /**
         * Get usage analytics
         */
        usage: (projectId: string, days?: number) => Promise<ApiResponse<UsageMetrics[]>>;
        /**
         * Get cost analysis
         */
        costs: (projectId: string, days?: number) => Promise<ApiResponse<CostAnalysis>>;
        /**
         * Get analytics overview
         */
        overview: (projectId: string) => Promise<ApiResponse<Analytics>>;
    };
}
//# sourceMappingURL=index.d.ts.map