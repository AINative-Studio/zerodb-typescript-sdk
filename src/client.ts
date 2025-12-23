/**
 * Main ZeroDB MCP Client
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import {
  ZeroDBError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  ValidationError,
  NotFoundError,
  NetworkError,
  TimeoutError
} from './errors';
import { ClientConfig } from './types';
import { parseErrorResponse, retryWithBackoff } from './utils';

// Import operation modules
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
export class ZeroDBClient {
  private client: AxiosInstance;
  private readonly config: Required<ClientConfig>;

  // Operation modules
  public readonly vectors: VectorOperations;
  public readonly quantum: QuantumOperations;
  public readonly tables: TableOperations;
  public readonly files: FileOperations;
  public readonly events: EventOperations;
  public readonly projects: ProjectOperations;
  public readonly rlhf: RLHFOperations;
  public readonly admin: AdminOperations;

  // Agent operation modules
  public readonly agentOrchestration: AgentOrchestrationOperations;
  public readonly agentCoordination: AgentCoordinationOperations;
  public readonly agentLearning: AgentLearningOperations;
  public readonly agentState: AgentStateOperations;
  public readonly agentSwarm: AgentSwarmOperations;

  /**
   * Create a new ZeroDB client
   *
   * @param config - Client configuration
   */
  constructor(config: ClientConfig) {
    // Set defaults
    this.config = {
      apiKey: config.apiKey || '',
      jwtToken: config.jwtToken || '',
      baseURL: config.baseURL || 'https://api.ainative.studio',
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000
    };

    // Validate authentication
    if (!this.config.apiKey && !this.config.jwtToken) {
      throw new AuthenticationError('Either apiKey or jwtToken must be provided');
    }

    // Create axios instance
    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey }),
        ...(this.config.jwtToken && { 'Authorization': `Bearer ${this.config.jwtToken}` })
      }
    });

    // Setup interceptors
    this.setupInterceptors();

    // Initialize operation modules
    this.vectors = new VectorOperations(this);
    this.quantum = new QuantumOperations(this);
    this.tables = new TableOperations(this);
    this.files = new FileOperations(this);
    this.events = new EventOperations(this);
    this.projects = new ProjectOperations(this);
    this.rlhf = new RLHFOperations(this);
    this.admin = new AdminOperations(this);

    // Initialize agent operation modules
    this.agentOrchestration = new AgentOrchestrationOperations(this);
    this.agentCoordination = new AgentCoordinationOperations(this);
    this.agentLearning = new AgentLearningOperations(this);
    this.agentState = new AgentStateOperations(this);
    this.agentSwarm = new AgentSwarmOperations(this);
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to requests for debugging
        if (config.headers) {
          config.headers['X-Request-Time'] = new Date().toISOString();
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle different error types
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          throw new TimeoutError('Request timeout', error.response?.data);
        }

        if (!error.response) {
          throw new NetworkError('Network request failed', error);
        }

        const status = error.response.status;
        const errorData = parseErrorResponse(error);

        // Map HTTP status codes to custom errors
        switch (status) {
          case 401:
            throw new AuthenticationError(errorData.message, error.response.data);

          case 403:
            throw new AuthorizationError(errorData.message, error.response.data);

          case 404:
            throw new NotFoundError(errorData.message, error.response.data);

          case 422:
            throw new ValidationError(
              errorData.message,
              errorData.details?.errors,
              error.response.data
            );

          case 429:
            const retryAfter = error.response.headers['retry-after'];
            throw new RateLimitError(
              errorData.message,
              error.response.data,
              retryAfter ? parseInt(retryAfter) : undefined
            );

          default:
            throw new ZeroDBError(
              errorData.message || `Request failed with status ${status}`,
              error.response.data,
              status
            );
        }
      }
    );
  }

  /**
   * Execute a raw API request
   * Internal method used by operation modules
   *
   * @param config - Axios request configuration
   * @returns Response data
   */
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }

  /**
   * Execute a GET request
   *
   * @param url - Request URL
   * @param config - Additional request configuration
   * @returns Response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * Execute a POST request
   *
   * @param url - Request URL
   * @param data - Request body
   * @param config - Additional request configuration
   * @returns Response data
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * Execute a PUT request
   *
   * @param url - Request URL
   * @param data - Request body
   * @param config - Additional request configuration
   * @returns Response data
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * Execute a PATCH request
   *
   * @param url - Request URL
   * @param data - Request body
   * @param config - Additional request configuration
   * @returns Response data
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  /**
   * Execute a DELETE request
   *
   * @param url - Request URL
   * @param config - Additional request configuration
   * @returns Response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * Execute a request with retry logic
   *
   * @param fn - Function to execute
   * @returns Function result
   */
  async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    return retryWithBackoff(fn, this.config.retryAttempts, this.config.retryDelay);
  }

  /**
   * Update authentication token
   *
   * @param token - New JWT token or API key
   * @param type - Token type ('jwt' or 'apiKey')
   */
  setAuthToken(token: string, type: 'jwt' | 'apiKey' = 'jwt'): void {
    if (type === 'jwt') {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      delete this.client.defaults.headers.common['X-API-Key'];
    } else {
      this.client.defaults.headers.common['X-API-Key'] = token;
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<Required<ClientConfig>> {
    return Object.freeze({ ...this.config });
  }
}
