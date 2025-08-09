/**
 * Main AINative Client for TypeScript/JavaScript
 */
import { EventEmitter } from 'eventemitter3';
import { ClientConfig, RequestOptions, ApiResponse } from './types';
import { ZeroDBClient } from './zerodb';
import { AgentSwarmClient } from './agent-swarm';
export declare class AINativeClient extends EventEmitter {
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
//# sourceMappingURL=client.d.ts.map