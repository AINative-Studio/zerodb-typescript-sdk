"use strict";
/**
 * Main ZeroDB MCP Client
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroDBClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
const utils_1 = require("./utils");
// Import operation modules
const vectors_1 = require("./operations/vectors");
const quantum_1 = require("./operations/quantum");
const tables_1 = require("./operations/tables");
const files_1 = require("./operations/files");
const events_1 = require("./operations/events");
const projects_1 = require("./operations/projects");
const rlhf_1 = require("./operations/rlhf");
const admin_1 = require("./operations/admin");
const agent_orchestration_1 = require("./operations/agent_orchestration");
const agent_coordination_1 = require("./operations/agent_coordination");
const agent_learning_1 = require("./operations/agent_learning");
const agent_state_1 = require("./operations/agent_state");
const agent_swarm_1 = require("./operations/agent_swarm");
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
class ZeroDBClient {
    /**
     * Create a new ZeroDB client
     *
     * @param config - Client configuration
     */
    constructor(config) {
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
            throw new errors_1.AuthenticationError('Either apiKey or jwtToken must be provided');
        }
        // Create axios instance
        this.client = axios_1.default.create({
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
        this.vectors = new vectors_1.VectorOperations(this);
        this.quantum = new quantum_1.QuantumOperations(this);
        this.tables = new tables_1.TableOperations(this);
        this.files = new files_1.FileOperations(this);
        this.events = new events_1.EventOperations(this);
        this.projects = new projects_1.ProjectOperations(this);
        this.rlhf = new rlhf_1.RLHFOperations(this);
        this.admin = new admin_1.AdminOperations(this);
        // Initialize agent operation modules
        this.agentOrchestration = new agent_orchestration_1.AgentOrchestrationOperations(this);
        this.agentCoordination = new agent_coordination_1.AgentCoordinationOperations(this);
        this.agentLearning = new agent_learning_1.AgentLearningOperations(this);
        this.agentState = new agent_state_1.AgentStateOperations(this);
        this.agentSwarm = new agent_swarm_1.AgentSwarmOperations(this);
    }
    /**
     * Setup request/response interceptors
     */
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use((config) => {
            // Add timestamp to requests for debugging
            if (config.headers) {
                config.headers['X-Request-Time'] = new Date().toISOString();
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // Response interceptor
        this.client.interceptors.response.use((response) => response, (error) => {
            // Handle different error types
            if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
                throw new errors_1.TimeoutError('Request timeout', error.response?.data);
            }
            if (!error.response) {
                throw new errors_1.NetworkError('Network request failed', error);
            }
            const status = error.response.status;
            const errorData = (0, utils_1.parseErrorResponse)(error);
            // Map HTTP status codes to custom errors
            switch (status) {
                case 401:
                    throw new errors_1.AuthenticationError(errorData.message, error.response.data);
                case 403:
                    throw new errors_1.AuthorizationError(errorData.message, error.response.data);
                case 404:
                    throw new errors_1.NotFoundError(errorData.message, error.response.data);
                case 422:
                    throw new errors_1.ValidationError(errorData.message, errorData.details?.errors, error.response.data);
                case 429:
                    const retryAfter = error.response.headers['retry-after'];
                    throw new errors_1.RateLimitError(errorData.message, error.response.data, retryAfter ? parseInt(retryAfter) : undefined);
                default:
                    throw new errors_1.ZeroDBError(errorData.message || `Request failed with status ${status}`, error.response.data, status);
            }
        });
    }
    /**
     * Execute a raw API request
     * Internal method used by operation modules
     *
     * @param config - Axios request configuration
     * @returns Response data
     */
    async request(config) {
        const response = await this.client.request(config);
        return response.data;
    }
    /**
     * Execute a GET request
     *
     * @param url - Request URL
     * @param config - Additional request configuration
     * @returns Response data
     */
    async get(url, config) {
        return this.request({ ...config, method: 'GET', url });
    }
    /**
     * Execute a POST request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    async post(url, data, config) {
        return this.request({ ...config, method: 'POST', url, data });
    }
    /**
     * Execute a PUT request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    async put(url, data, config) {
        return this.request({ ...config, method: 'PUT', url, data });
    }
    /**
     * Execute a PATCH request
     *
     * @param url - Request URL
     * @param data - Request body
     * @param config - Additional request configuration
     * @returns Response data
     */
    async patch(url, data, config) {
        return this.request({ ...config, method: 'PATCH', url, data });
    }
    /**
     * Execute a DELETE request
     *
     * @param url - Request URL
     * @param config - Additional request configuration
     * @returns Response data
     */
    async delete(url, config) {
        return this.request({ ...config, method: 'DELETE', url });
    }
    /**
     * Execute a request with retry logic
     *
     * @param fn - Function to execute
     * @returns Function result
     */
    async withRetry(fn) {
        return (0, utils_1.retryWithBackoff)(fn, this.config.retryAttempts, this.config.retryDelay);
    }
    /**
     * Update authentication token
     *
     * @param token - New JWT token or API key
     * @param type - Token type ('jwt' or 'apiKey')
     */
    setAuthToken(token, type = 'jwt') {
        if (type === 'jwt') {
            this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            delete this.client.defaults.headers.common['X-API-Key'];
        }
        else {
            this.client.defaults.headers.common['X-API-Key'] = token;
            delete this.client.defaults.headers.common['Authorization'];
        }
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return Object.freeze({ ...this.config });
    }
}
exports.ZeroDBClient = ZeroDBClient;
