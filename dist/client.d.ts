/**
 * Main ZeroDB MCP Client
 */
import { AxiosRequestConfig } from 'axios';
import { ClientConfig } from './types';
import { VectorOperations } from './operations/vectors';
import { QuantumOperations } from './operations/quantum';
import { TableOperations } from './operations/tables';
import { FileOperations } from './operations/files';
import { EventOperations } from './operations/events';
import { ProjectOperations } from './operations/projects';
import { RLHFOperations } from './operations/rlhf';
import { AdminOperations } from './operations/admin';
import { AgentOrchestrationOperations } from './operations/agent_orchestration';
import { AgentCoordinationOperations } from './operations/agent_coordination';
import { AgentLearningOperations } from './operations/agent_learning';
import { AgentStateOperations } from './operations/agent_state';
import { AgentSwarmOperations } from './operations/agent_swarm';
/**
 * ZeroDB MCP Client
 *
 * Production-ready client for interacting with ZeroDB MCP Bridge API
 *
 * @example
 * ```typescript
 * const client = new ZeroDBClient({
 *   apiKey: 'ZERODB_your_api_key',
 *   baseURL: 'https://api.ainative.studio'
 * });
 *
 * // Use vector operations
 * const result = await client.vectors.search({
 *   project_id: 'project-uuid',
 *   query_vector: embedding,
 *   limit: 10
 * });
 * ```
 */
export declare class ZeroDBClient {
    private client;
    private readonly config;
    readonly vectors: VectorOperations;
    readonly quantum: QuantumOperations;
    readonly tables: TableOperations;
    readonly files: FileOperations;
    readonly events: EventOperations;
    readonly projects: ProjectOperations;
    readonly rlhf: RLHFOperations;
    readonly admin: AdminOperations;
    readonly agentOrchestration: AgentOrchestrationOperations;
    readonly agentCoordination: AgentCoordinationOperations;
    readonly agentLearning: AgentLearningOperations;
    readonly agentState: AgentStateOperations;
    readonly agentSwarm: AgentSwarmOperations;
    /**
     * Create a new ZeroDB client
     *
     * @param config - Client configuration
     */
    constructor(config: ClientConfig);
    /**
     * Setup request/response interceptors
     */
    private setupInterceptors;
    /**
     * Execute a raw API request
     * Internal method used by operation modules
     *
     * @param config - Axios request configuration
     * @returns Response data
     */
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a GET request
     *
     * @param url - Request URL
     * @param config - Additional request configuration
     * @returns Response data
     */
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a POST request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a PUT request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a PATCH request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a DELETE request
     *
     * @param url - Request URL
     * @param config - Additional request configuration
     * @returns Response data
     */
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Execute a request with retry logic
     *
     * @param fn - Function to execute
     * @returns Function result
     */
    withRetry<T>(fn: () => Promise<T>): Promise<T>;
    /**
     * Update authentication token
     *
     * @param token - New JWT token or API key
     * @param type - Token type ('jwt' or 'apiKey')
     */
    setAuthToken(token: string, type?: 'jwt' | 'apiKey'): void;
    /**
     * Get current configuration
     */
    getConfig(): Readonly<Required<ClientConfig>>;
}
//# sourceMappingURL=client.d.ts.map