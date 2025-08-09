import { EventEmitter } from 'eventemitter3';

/**
 * Core type definitions for AINative SDK
 */
interface ClientConfig {
    /**
     * Base URL for the API
     * @default "https://api.ainative.studio"
     */
    baseUrl?: string;
    /**
     * API Key for authentication
     */
    apiKey?: string;
    /**
     * Organization ID for multi-tenant scenarios
     */
    organizationId?: string;
    /**
     * Request timeout in milliseconds
     * @default 30000
     */
    timeout?: number;
    /**
     * Maximum number of retries for failed requests
     * @default 3
     */
    maxRetries?: number;
    /**
     * Delay between retries in milliseconds
     * @default 1000
     */
    retryDelay?: number;
    /**
     * Enable debug logging
     * @default false
     */
    debug?: boolean;
    /**
     * Custom headers to include in all requests
     */
    headers?: Record<string, string>;
}
interface AuthConfig {
    /**
     * API Key for authentication
     */
    apiKey?: string;
    /**
     * API Secret for enhanced security
     */
    apiSecret?: string;
    /**
     * JWT token for Bearer authentication
     */
    token?: string;
    /**
     * Token refresh callback
     */
    onTokenRefresh?: (newToken: string) => void;
}
interface RequestOptions {
    /**
     * Override timeout for this request
     */
    timeout?: number;
    /**
     * Custom headers for this request
     */
    headers?: Record<string, string>;
    /**
     * Signal for request cancellation
     */
    signal?: AbortSignal;
}
interface PaginationOptions {
    /**
     * Number of items per page
     * @default 10
     */
    limit?: number;
    /**
     * Offset for pagination
     * @default 0
     */
    offset?: number;
    /**
     * Page number (alternative to offset)
     */
    page?: number;
}
interface ApiResponse<T = any> {
    /**
     * Response data
     */
    data: T;
    /**
     * HTTP status code
     */
    status: number;
    /**
     * Response headers
     */
    headers: Record<string, string>;
    /**
     * Request metadata
     */
    meta?: {
        requestId?: string;
        timestamp?: string;
        duration?: number;
    };
}
interface ApiError {
    /**
     * Error message
     */
    message: string;
    /**
     * Error code
     */
    code?: string;
    /**
     * HTTP status code
     */
    status?: number;
    /**
     * Additional error details
     */
    details?: any;
    /**
     * Request ID for debugging
     */
    requestId?: string;
}
interface User {
    id: string;
    email: string;
    name?: string;
    organizationId?: string;
    createdAt: string;
    updatedAt: string;
}
interface Organization {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Type definitions for ZeroDB operations
 */
interface Project {
    id: string;
    name: string;
    description?: string;
    userId: string;
    databaseEnabled: boolean;
    status: 'active' | 'suspended' | 'deleted';
    createdAt: string;
    updatedAt: string;
}
interface CreateProjectRequest {
    name: string;
    description?: string;
    type?: 'development' | 'production';
}
interface UpdateProjectRequest {
    name?: string;
    description?: string;
    status?: 'active' | 'suspended';
}
interface Vector {
    id?: string;
    projectId: string;
    embedding: number[];
    namespace?: string;
    metadata?: Record<string, any>;
    document?: string;
    source?: string;
    createdAt?: string;
}
interface UpsertVectorRequest {
    vectorId?: string;
    vectorEmbedding: number[];
    namespace?: string;
    metadata?: Record<string, any>;
    document?: string;
    source?: string;
}
interface SearchVectorRequest {
    queryVector: number[];
    namespace?: string;
    topK?: number;
    similarityThreshold?: number;
    filter?: Record<string, any>;
}
interface SearchVectorResponse {
    vectors: Vector[];
    totalCount: number;
    searchTimeMs: number;
}
interface BatchUpsertRequest {
    vectors: UpsertVectorRequest[];
}
interface Memory {
    id: string;
    projectId: string;
    content: string;
    agentId: string;
    sessionId: string;
    role: 'user' | 'assistant' | 'system';
    metadata?: Record<string, any>;
    createdAt: string;
}
interface StoreMemoryRequest {
    content: string;
    agentId: string;
    sessionId: string;
    role: 'user' | 'assistant' | 'system';
    memoryMetadata?: Record<string, any>;
}
interface SearchMemoryRequest {
    query: string;
    sessionId?: string;
    agentId?: string;
    role?: 'user' | 'assistant' | 'system';
    limit?: number;
}
interface DatabaseStatus {
    enabled: boolean;
    projectId: string;
    tablesCount: number;
    vectorsCount: number;
    memoryRecordsCount: number;
    eventsCount: number;
    filesCount: number;
    storageUsedMb: number;
    lastActivity?: string;
}
interface DatabaseConfig {
    vectorDimensions?: number;
    quantumEnabled?: boolean;
    collections?: string[];
}
interface Event {
    id: string;
    projectId: string;
    topic: string;
    eventPayload: Record<string, any>;
    publishedAt: string;
}
interface PublishEventRequest {
    topic: string;
    eventPayload: Record<string, any>;
}
interface StreamEventsOptions {
    topic?: string;
    fromTimestamp?: string;
    onMessage?: (event: Event) => void;
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}
interface FileMetadata {
    id: string;
    projectId: string;
    fileKey: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    metadata?: Record<string, any>;
    uploadedAt: string;
}
interface UploadFileRequest {
    fileKey: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    metadata?: Record<string, any>;
}
interface Analytics {
    projectId: string;
    period: string;
    metrics: {
        totalRequests: number;
        totalVectors: number;
        totalMemories: number;
        totalEvents: number;
        storageUsedMb: number;
        activeUsers: number;
    };
    trends: {
        requests: number[];
        vectors: number[];
        memories: number[];
    };
}
interface UsageMetrics {
    projectId: string;
    date: string;
    apiCalls: number;
    vectorOperations: number;
    memoryOperations: number;
    eventOperations: number;
    storageUsedMb: number;
    bandwidthUsedMb: number;
}
interface CostAnalysis {
    projectId: string;
    period: string;
    totalCost: number;
    breakdown: {
        apiCalls: number;
        storage: number;
        bandwidth: number;
        compute: number;
    };
    projectedMonthlyCost: number;
}

/**
 * ZeroDB client for TypeScript/JavaScript
 */

declare class ZeroDBClient {
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

/**
 * Type definitions for Agent Swarm operations
 */
interface Agent {
    id: string;
    type: AgentType;
    name: string;
    status: AgentStatus;
    config?: AgentConfig;
    capabilities?: string[];
    currentTask?: Task;
    metrics?: AgentMetrics;
}
type AgentType = 'data_analyst' | 'report_generator' | 'code_reviewer' | 'test_runner' | 'documentation_writer' | 'api_integrator' | 'performance_optimizer' | 'security_auditor' | 'custom';
type AgentStatus = 'idle' | 'busy' | 'error' | 'offline' | 'starting' | 'stopping';
interface AgentConfig {
    specialization?: string;
    maxConcurrentTasks?: number;
    timeout?: number;
    retryPolicy?: {
        maxRetries: number;
        backoffMs: number;
    };
    customParameters?: Record<string, any>;
}
interface Swarm {
    id: string;
    projectId: string;
    name?: string;
    status: SwarmStatus;
    agents: Agent[];
    orchestration: OrchestrationConfig;
    createdAt: string;
    startedAt?: string;
    stoppedAt?: string;
}
type SwarmStatus = 'idle' | 'running' | 'paused' | 'stopped' | 'error';
interface OrchestrationConfig {
    maxAgents?: number;
    coordinationModel?: 'hierarchical' | 'distributed' | 'consensus';
    taskDistribution?: 'round-robin' | 'load-balanced' | 'priority-based';
    communicationProtocol?: 'direct' | 'message-queue' | 'event-driven';
}
interface Task {
    id: string;
    swarmId: string;
    description: string;
    status: TaskStatus;
    assignedAgent?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    dependencies?: string[];
    result?: any;
    error?: string;
    createdAt: string;
    startedAt?: string;
    completedAt?: string;
}
type TaskStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
interface StartSwarmRequest {
    projectId: string;
    name?: string;
    agents: CreateAgentRequest[];
    orchestration?: OrchestrationConfig;
}
interface CreateAgentRequest {
    type: AgentType;
    name?: string;
    config?: AgentConfig;
}
interface OrchestrateTaskRequest {
    swarmId: string;
    task: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    context?: Record<string, any>;
    dependencies?: string[];
}
interface SwarmMetrics {
    swarmId: string;
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    averageTaskDuration: number;
    agentUtilization: Record<string, number>;
    throughput: number;
    errorRate: number;
}
interface AgentMetrics {
    agentId: string;
    tasksCompleted: number;
    tasksFailed: number;
    averageTaskDuration: number;
    utilization: number;
    lastActive: string;
}
interface SwarmEvent {
    id: string;
    swarmId: string;
    type: SwarmEventType;
    agentId?: string;
    taskId?: string;
    payload?: any;
    timestamp: string;
}
type SwarmEventType = 'swarm_started' | 'swarm_stopped' | 'agent_added' | 'agent_removed' | 'agent_error' | 'task_created' | 'task_assigned' | 'task_completed' | 'task_failed' | 'orchestration_changed';
interface AgentPrompt {
    agentType: AgentType;
    systemPrompt: string;
    taskPromptTemplate?: string;
    examples?: string[];
    constraints?: string[];
    outputFormat?: string;
}
interface ConfigureAgentPromptRequest {
    agentType: AgentType;
    systemPrompt: string;
    taskPromptTemplate?: string;
    examples?: string[];
    constraints?: string[];
    outputFormat?: string;
}

/**
 * Agent Swarm client for TypeScript/JavaScript
 */

declare class AgentSwarmClient {
    private client;
    constructor(client: AINativeClient);
    /**
     * Swarm Management
     */
    swarm: {
        /**
         * Start a new agent swarm
         */
        start: (data: StartSwarmRequest) => Promise<ApiResponse<Swarm>>;
        /**
         * Get swarm status
         */
        status: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * Stop a running swarm
         */
        stop: (swarmId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * Pause a running swarm
         */
        pause: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * Resume a paused swarm
         */
        resume: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * List all swarms
         */
        list: (projectId?: string) => Promise<ApiResponse<Swarm[]>>;
    };
    /**
     * Task Orchestration
     */
    tasks: {
        /**
         * Orchestrate a new task
         */
        orchestrate: (data: OrchestrateTaskRequest) => Promise<ApiResponse<Task>>;
        /**
         * Get task status
         */
        status: (taskId: string) => Promise<ApiResponse<Task>>;
        /**
         * Cancel a task
         */
        cancel: (taskId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * List tasks for a swarm
         */
        list: (swarmId: string) => Promise<ApiResponse<Task[]>>;
    };
    /**
     * Agent Management
     */
    agents: {
        /**
         * List available agent types
         */
        types: () => Promise<ApiResponse<AgentType[]>>;
        /**
         * Get agent details
         */
        get: (agentId: string) => Promise<ApiResponse<Agent>>;
        /**
         * Add agent to swarm
         */
        add: (swarmId: string, agent: {
            type: AgentType;
            config?: any;
        }) => Promise<ApiResponse<Agent>>;
        /**
         * Remove agent from swarm
         */
        remove: (swarmId: string, agentId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * Configure agent prompts
         */
        configurePrompt: (data: ConfigureAgentPromptRequest) => Promise<ApiResponse<AgentPrompt>>;
        /**
         * Get agent prompts
         */
        getPrompt: (agentType: AgentType) => Promise<ApiResponse<AgentPrompt>>;
    };
    /**
     * Metrics and Monitoring
     */
    metrics: {
        /**
         * Get swarm metrics
         */
        swarm: (swarmId: string) => Promise<ApiResponse<SwarmMetrics>>;
        /**
         * Get agent metrics
         */
        agent: (agentId: string) => Promise<ApiResponse<any>>;
        /**
         * Get project-wide metrics
         */
        project: (projectId: string) => Promise<ApiResponse<any>>;
    };
    /**
     * Event Streaming
     */
    events: {
        /**
         * Stream swarm events
         */
        stream: (swarmId: string, onEvent: (event: SwarmEvent) => void) => EventSource;
        /**
         * Get historical events
         */
        history: (swarmId: string, limit?: number) => Promise<ApiResponse<SwarmEvent[]>>;
    };
}

/**
 * Main AINative Client for TypeScript/JavaScript
 */

declare class AINativeClient extends EventEmitter {
    private config;
    private httpClient;
    private authManager;
    private _zerodb?;
    private _agentSwarm?;
    constructor(config?: ClientConfig);
    /**
     * Get ZeroDB client
     */
    get zerodb(): ZeroDBClient;
    /**
     * Get Agent Swarm client
     */
    get agentSwarm(): AgentSwarmClient;
    /**
     * Make an authenticated request
     */
    request<T = any>(method: string, endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * GET request helper
     */
    get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * POST request helper
     */
    post<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * PUT request helper
     */
    put<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * DELETE request helper
     */
    delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * PATCH request helper
     */
    patch<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
    /**
     * Check API health
     */
    healthCheck(): Promise<ApiResponse<{
        status: string;
        timestamp: string;
    }>>;
    /**
     * Set API key
     */
    setApiKey(apiKey: string): void;
    /**
     * Set organization ID
     */
    setOrganizationId(organizationId: string): void;
    /**
     * Setup request/response interceptors
     */
    private setupInterceptors;
    /**
     * Handle errors and convert to SDK errors
     */
    private handleError;
    /**
     * Enable debug logging
     */
    private enableDebugLogging;
    /**
     * Sleep helper for retries
     */
    private sleep;
}

/**
 * Custom error classes for AINative SDK
 */
declare class AINativeError extends Error {
    code?: string;
    status?: number;
    details?: any;
    requestId?: string;
    constructor(message: string, code?: string, status?: number, details?: any, requestId?: string);
    toJSON(): {
        name: string;
        message: string;
        code: string | undefined;
        status: number | undefined;
        details: any;
        requestId: string | undefined;
        stack: string | undefined;
    };
}
declare class NetworkError extends AINativeError {
    constructor(message: string, details?: any);
}
declare class AuthenticationError extends AINativeError {
    constructor(message?: string);
}
declare class AuthorizationError extends AINativeError {
    constructor(message?: string);
}
declare class RateLimitError extends AINativeError {
    retryAfter?: number;
    constructor(message?: string, retryAfter?: number);
}
declare class ValidationError extends AINativeError {
    constructor(message: string, details?: any);
}
declare class NotFoundError extends AINativeError {
    constructor(message?: string);
}
declare class TimeoutError extends AINativeError {
    constructor(message?: string);
}
declare class ServerError extends AINativeError {
    constructor(message?: string, status?: number);
}

/**
 * Utility functions for AINative SDK
 */
/**
 * Sleep for specified milliseconds
 */
declare function sleep(ms: number): Promise<void>;
/**
 * Retry a function with exponential backoff
 */
declare function retry<T>(fn: () => Promise<T>, options?: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    factor?: number;
    onRetry?: (attempt: number, error: Error) => void;
}): Promise<T>;
/**
 * Create a debounced function
 */
declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Create a throttled function
 */
declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Chunk an array into smaller arrays
 */
declare function chunk<T>(array: T[], size: number): T[][];
/**
 * Generate a UUID v4
 */
declare function uuid(): string;
/**
 * Check if running in browser
 */
declare function isBrowser(): boolean;
/**
 * Check if running in Node.js
 */
declare function isNode(): boolean;
/**
 * Deep merge objects
 */
declare function deepMerge(target: any, ...sources: any[]): any;
/**
 * Format bytes to human readable string
 */
declare function formatBytes(bytes: number, decimals?: number): string;
/**
 * Parse query string to object
 */
declare function parseQueryString(queryString: string): Record<string, string>;
/**
 * Build query string from object
 */
declare function buildQueryString(params: Record<string, any>): string;

/**
 * Authentication manager for AINative SDK
 */

declare class AuthManager {
    private config;
    constructor(config?: AuthConfig);
    /**
     * Get authentication headers
     */
    getHeaders(): Record<string, string>;
    /**
     * Set API key
     */
    setApiKey(apiKey: string): void;
    /**
     * Set API secret
     */
    setApiSecret(apiSecret: string): void;
    /**
     * Set JWT token
     */
    setToken(token: string): void;
    /**
     * Clear authentication
     */
    clear(): void;
    /**
     * Check if authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Get authentication type
     */
    getAuthType(): 'api-key' | 'token' | 'none';
}

/**
 * Core AINative SDK exports (without framework integrations)
 */

export { AINativeClient, AINativeError, Agent, AgentConfig, AgentMetrics, AgentPrompt, AgentStatus, AgentSwarmClient, AgentType, Analytics, ApiError, ApiResponse, AuthConfig, AuthManager, AuthenticationError, AuthorizationError, BatchUpsertRequest, ClientConfig, ConfigureAgentPromptRequest, CostAnalysis, CreateAgentRequest, CreateProjectRequest, DatabaseConfig, DatabaseStatus, Event, FileMetadata, Memory, NetworkError, NotFoundError, OrchestrateTaskRequest, OrchestrationConfig, Organization, PaginationOptions, Project, PublishEventRequest, RateLimitError, RequestOptions, SearchMemoryRequest, SearchVectorRequest, SearchVectorResponse, ServerError, StartSwarmRequest, StoreMemoryRequest, StreamEventsOptions, Swarm, SwarmEvent, SwarmEventType, SwarmMetrics, SwarmStatus, Task, TaskStatus, TimeoutError, UpdateProjectRequest, UploadFileRequest, UpsertVectorRequest, UsageMetrics, User, ValidationError, Vector, ZeroDBClient, buildQueryString, chunk, debounce, deepMerge, AINativeClient as default, formatBytes, isBrowser, isNode, parseQueryString, retry, sleep, throttle, uuid };
