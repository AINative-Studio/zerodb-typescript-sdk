'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var eventemitter3 = require('eventemitter3');

/**
 * ZeroDB client for TypeScript/JavaScript
 */
class ZeroDBClient {
    constructor(client) {
        this.client = client;
        /**
         * Project Management
         */
        this.projects = {
            /**
             * List all projects
             */
            list: async (options) => {
                const params = new URLSearchParams();
                if (options?.limit)
                    params.append('limit', options.limit.toString());
                if (options?.offset)
                    params.append('offset', options.offset.toString());
                return this.client.get(`/public/projects?${params}`);
            },
            /**
             * Create a new project
             */
            create: async (data) => {
                return this.client.post('/public/projects', data);
            },
            /**
             * Get project details
             */
            get: async (projectId) => {
                return this.client.get(`/public/projects/${projectId}`);
            },
            /**
             * Update project
             */
            update: async (projectId, data) => {
                return this.client.put(`/public/projects/${projectId}`, data);
            },
            /**
             * Delete project
             */
            delete: async (projectId) => {
                return this.client.delete(`/public/projects/${projectId}`);
            },
            /**
             * Suspend project
             */
            suspend: async (projectId) => {
                return this.client.post(`/public/projects/${projectId}/suspend`);
            },
            /**
             * Activate project
             */
            activate: async (projectId) => {
                return this.client.post(`/public/projects/${projectId}/activate`);
            }
        };
        /**
         * Database Management
         */
        this.database = {
            /**
             * Get database status
             */
            status: async (projectId) => {
                return this.client.get(`/public/projects/${projectId}/database`);
            },
            /**
             * Enable database for project
             */
            enable: async (projectId) => {
                return this.client.post(`/public/projects/${projectId}/database`);
            },
            /**
             * Update database configuration
             */
            updateConfig: async (projectId, config) => {
                return this.client.put(`/public/projects/${projectId}/database`, config);
            }
        };
        /**
         * Vector Operations
         */
        this.vectors = {
            /**
             * Upsert a vector
             */
            upsert: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/vectors/upsert`, data);
            },
            /**
             * Search vectors
             */
            search: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/vectors/search`, data);
            },
            /**
             * Batch upsert vectors
             */
            batchUpsert: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/vectors/upsert-batch`, data.vectors);
            },
            /**
             * List vectors
             */
            list: async (projectId, namespace, limit) => {
                const params = new URLSearchParams();
                if (namespace)
                    params.append('namespace', namespace);
                if (limit)
                    params.append('limit', limit.toString());
                return this.client.get(`/public/projects/${projectId}/database/vectors?${params}`);
            }
        };
        /**
         * Memory Operations
         */
        this.memory = {
            /**
             * Store memory
             */
            store: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/memory/store`, data);
            },
            /**
             * Search memories
             */
            search: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/memory/search`, data);
            },
            /**
             * List memories
             */
            list: async (projectId, options) => {
                const params = new URLSearchParams();
                if (options?.limit)
                    params.append('limit', options.limit.toString());
                if (options?.offset)
                    params.append('offset', options.offset.toString());
                return this.client.get(`/public/projects/${projectId}/database/memory?${params}`);
            }
        };
        /**
         * Event Operations
         */
        this.events = {
            /**
             * Publish an event
             */
            publish: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/events/publish`, data);
            },
            /**
             * List events
             */
            list: async (projectId, topic, limit) => {
                const params = new URLSearchParams();
                if (topic)
                    params.append('topic', topic);
                if (limit)
                    params.append('limit', limit.toString());
                return this.client.get(`/public/projects/${projectId}/database/events?${params}`);
            },
            /**
             * Stream events (Server-Sent Events)
             */
            stream: (projectId, options = {}) => {
                const params = new URLSearchParams();
                if (options.topic)
                    params.append('topic', options.topic);
                if (options.fromTimestamp)
                    params.append('from_timestamp', options.fromTimestamp);
                const url = `${this.client['config'].baseUrl}/public/projects/${projectId}/database/events/stream?${params}`;
                const eventSource = new EventSource(url);
                eventSource.onmessage = (event) => {
                    if (options.onMessage) {
                        try {
                            const data = JSON.parse(event.data);
                            options.onMessage(data);
                        }
                        catch (error) {
                            console.error('Failed to parse event:', error);
                        }
                    }
                };
                eventSource.onerror = (error) => {
                    if (options.onError) {
                        options.onError(new Error('Event stream error'));
                    }
                };
                eventSource.onopen = () => {
                    if (options.onConnect) {
                        options.onConnect();
                    }
                };
                return eventSource;
            }
        };
        /**
         * File Operations
         */
        this.files = {
            /**
             * Upload file metadata
             */
            upload: async (projectId, data) => {
                return this.client.post(`/public/projects/${projectId}/database/files/upload`, data);
            },
            /**
             * List files
             */
            list: async (projectId, options) => {
                const params = new URLSearchParams();
                if (options?.limit)
                    params.append('limit', options.limit.toString());
                if (options?.offset)
                    params.append('offset', options.offset.toString());
                return this.client.get(`/public/projects/${projectId}/database/files?${params}`);
            }
        };
        /**
         * Analytics Operations
         */
        this.analytics = {
            /**
             * Get usage analytics
             */
            usage: async (projectId, days) => {
                const params = new URLSearchParams();
                if (days)
                    params.append('days', days.toString());
                return this.client.get(`/public/projects/${projectId}/analytics/usage?${params}`);
            },
            /**
             * Get cost analysis
             */
            costs: async (projectId, days) => {
                const params = new URLSearchParams();
                if (days)
                    params.append('days', days.toString());
                return this.client.get(`/public/projects/${projectId}/analytics/costs?${params}`);
            },
            /**
             * Get analytics overview
             */
            overview: async (projectId) => {
                return this.client.get(`/public/projects/${projectId}/analytics`);
            }
        };
    }
}

/**
 * Agent Swarm client for TypeScript/JavaScript
 */
class AgentSwarmClient {
    constructor(client) {
        this.client = client;
        /**
         * Swarm Management
         */
        this.swarm = {
            /**
             * Start a new agent swarm
             */
            start: async (data) => {
                return this.client.post('/agent-swarm/start', data);
            },
            /**
             * Get swarm status
             */
            status: async (swarmId) => {
                return this.client.get(`/agent-swarm/${swarmId}/status`);
            },
            /**
             * Stop a running swarm
             */
            stop: async (swarmId) => {
                return this.client.post(`/agent-swarm/${swarmId}/stop`);
            },
            /**
             * Pause a running swarm
             */
            pause: async (swarmId) => {
                return this.client.post(`/agent-swarm/${swarmId}/pause`);
            },
            /**
             * Resume a paused swarm
             */
            resume: async (swarmId) => {
                return this.client.post(`/agent-swarm/${swarmId}/resume`);
            },
            /**
             * List all swarms
             */
            list: async (projectId) => {
                const params = new URLSearchParams();
                if (projectId)
                    params.append('project_id', projectId);
                return this.client.get(`/agent-swarm?${params}`);
            }
        };
        /**
         * Task Orchestration
         */
        this.tasks = {
            /**
             * Orchestrate a new task
             */
            orchestrate: async (data) => {
                return this.client.post('/agent-swarm/orchestrate', data);
            },
            /**
             * Get task status
             */
            status: async (taskId) => {
                return this.client.get(`/agent-swarm/tasks/${taskId}`);
            },
            /**
             * Cancel a task
             */
            cancel: async (taskId) => {
                return this.client.post(`/agent-swarm/tasks/${taskId}/cancel`);
            },
            /**
             * List tasks for a swarm
             */
            list: async (swarmId) => {
                return this.client.get(`/agent-swarm/${swarmId}/tasks`);
            }
        };
        /**
         * Agent Management
         */
        this.agents = {
            /**
             * List available agent types
             */
            types: async () => {
                return this.client.get('/agent-swarm/agent-types');
            },
            /**
             * Get agent details
             */
            get: async (agentId) => {
                return this.client.get(`/agent-swarm/agents/${agentId}`);
            },
            /**
             * Add agent to swarm
             */
            add: async (swarmId, agent) => {
                return this.client.post(`/agent-swarm/${swarmId}/agents`, agent);
            },
            /**
             * Remove agent from swarm
             */
            remove: async (swarmId, agentId) => {
                return this.client.delete(`/agent-swarm/${swarmId}/agents/${agentId}`);
            },
            /**
             * Configure agent prompts
             */
            configurePrompt: async (data) => {
                return this.client.post('/agent-swarm/prompts', data);
            },
            /**
             * Get agent prompts
             */
            getPrompt: async (agentType) => {
                return this.client.get(`/agent-swarm/prompts/${agentType}`);
            }
        };
        /**
         * Metrics and Monitoring
         */
        this.metrics = {
            /**
             * Get swarm metrics
             */
            swarm: async (swarmId) => {
                return this.client.get(`/agent-swarm/${swarmId}/metrics`);
            },
            /**
             * Get agent metrics
             */
            agent: async (agentId) => {
                return this.client.get(`/agent-swarm/agents/${agentId}/metrics`);
            },
            /**
             * Get project-wide metrics
             */
            project: async (projectId) => {
                return this.client.get(`/agent-swarm/projects/${projectId}/metrics`);
            }
        };
        /**
         * Event Streaming
         */
        this.events = {
            /**
             * Stream swarm events
             */
            stream: (swarmId, onEvent) => {
                const url = `${this.client['config'].baseUrl}/agent-swarm/${swarmId}/events`;
                const eventSource = new EventSource(url);
                eventSource.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        onEvent(data);
                    }
                    catch (error) {
                        console.error('Failed to parse swarm event:', error);
                    }
                };
                return eventSource;
            },
            /**
             * Get historical events
             */
            history: async (swarmId, limit) => {
                const params = new URLSearchParams();
                if (limit)
                    params.append('limit', limit.toString());
                return this.client.get(`/agent-swarm/${swarmId}/events/history?${params}`);
            }
        };
    }
}

/**
 * Authentication manager for AINative SDK
 */
class AuthManager {
    constructor(config = {}) {
        this.config = config;
    }
    /**
     * Get authentication headers
     */
    getHeaders() {
        const headers = {};
        // API Key authentication (preferred)
        if (this.config.apiKey) {
            headers['X-API-Key'] = this.config.apiKey;
        }
        // JWT Bearer token authentication
        else if (this.config.token) {
            headers['Authorization'] = `Bearer ${this.config.token}`;
        }
        // Add API secret if provided (for enhanced security)
        if (this.config.apiSecret) {
            headers['X-API-Secret'] = this.config.apiSecret;
        }
        return headers;
    }
    /**
     * Set API key
     */
    setApiKey(apiKey) {
        this.config.apiKey = apiKey;
    }
    /**
     * Set API secret
     */
    setApiSecret(apiSecret) {
        this.config.apiSecret = apiSecret;
    }
    /**
     * Set JWT token
     */
    setToken(token) {
        this.config.token = token;
        // Call refresh callback if provided
        if (this.config.onTokenRefresh) {
            this.config.onTokenRefresh(token);
        }
    }
    /**
     * Clear authentication
     */
    clear() {
        this.config = {};
    }
    /**
     * Check if authenticated
     */
    isAuthenticated() {
        return !!(this.config.apiKey || this.config.token);
    }
    /**
     * Get authentication type
     */
    getAuthType() {
        if (this.config.apiKey)
            return 'api-key';
        if (this.config.token)
            return 'token';
        return 'none';
    }
}

/**
 * Custom error classes for AINative SDK
 */
class AINativeError extends Error {
    constructor(message, code, status, details, requestId) {
        super(message);
        this.name = 'AINativeError';
        this.code = code;
        this.status = status;
        this.details = details;
        this.requestId = requestId;
        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AINativeError);
        }
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            status: this.status,
            details: this.details,
            requestId: this.requestId,
            stack: this.stack
        };
    }
}
class NetworkError extends AINativeError {
    constructor(message, details) {
        super(message, 'NETWORK_ERROR', undefined, details);
        this.name = 'NetworkError';
    }
}
class AuthenticationError extends AINativeError {
    constructor(message = 'Authentication failed') {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}
class AuthorizationError extends AINativeError {
    constructor(message = 'Not authorized') {
        super(message, 'AUTHORIZATION_ERROR', 403);
        this.name = 'AuthorizationError';
    }
}
class RateLimitError extends AINativeError {
    constructor(message = 'Rate limit exceeded', retryAfter) {
        super(message, 'RATE_LIMIT_ERROR', 429);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}
class ValidationError extends AINativeError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', 422, details);
        this.name = 'ValidationError';
    }
}
class NotFoundError extends AINativeError {
    constructor(message = 'Resource not found') {
        super(message, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}
class TimeoutError extends AINativeError {
    constructor(message = 'Request timed out') {
        super(message, 'TIMEOUT_ERROR', 408);
        this.name = 'TimeoutError';
    }
}
class ServerError extends AINativeError {
    constructor(message = 'Internal server error', status = 500) {
        super(message, 'SERVER_ERROR', status);
        this.name = 'ServerError';
    }
}

/**
 * Main AINative Client for TypeScript/JavaScript
 */
class AINativeClient extends eventemitter3.EventEmitter {
    constructor(config = {}) {
        super();
        // Initialize configuration with defaults
        this.config = {
            baseUrl: config.baseUrl || 'https://api.ainative.studio',
            apiKey: config.apiKey || '',
            organizationId: config.organizationId || '',
            timeout: config.timeout || 30000,
            maxRetries: config.maxRetries || 3,
            retryDelay: config.retryDelay || 1000,
            debug: config.debug || false,
            headers: config.headers || {}
        };
        // Ensure base URL format
        if (!this.config.baseUrl.endsWith('/api/v1')) {
            this.config.baseUrl = `${this.config.baseUrl.replace(/\/$/, '')}/api/v1`;
        }
        // Initialize auth manager
        this.authManager = new AuthManager({
            apiKey: this.config.apiKey
        });
        // Create HTTP client
        this.httpClient = axios.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout,
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers
            }
        });
        // Setup interceptors
        this.setupInterceptors();
        // Debug logging
        if (this.config.debug) {
            this.enableDebugLogging();
        }
    }
    /**
     * Get ZeroDB client
     */
    get zerodb() {
        if (!this._zerodb) {
            this._zerodb = new ZeroDBClient(this);
        }
        return this._zerodb;
    }
    /**
     * Get Agent Swarm client
     */
    get agentSwarm() {
        if (!this._agentSwarm) {
            this._agentSwarm = new AgentSwarmClient(this);
        }
        return this._agentSwarm;
    }
    /**
     * Make an authenticated request
     */
    async request(method, endpoint, data, options = {}) {
        const config = {
            method,
            url: endpoint,
            data,
            timeout: options.timeout || this.config.timeout,
            signal: options.signal,
            headers: {
                ...this.authManager.getHeaders(),
                ...options.headers
            }
        };
        // Add organization ID if set
        if (this.config.organizationId) {
            config.headers['X-Organization-ID'] = this.config.organizationId;
        }
        let lastError = null;
        let retries = 0;
        while (retries <= this.config.maxRetries) {
            try {
                const response = await this.httpClient.request(config);
                return {
                    data: response.data,
                    status: response.status,
                    headers: response.headers,
                    meta: {
                        requestId: response.headers['x-request-id'],
                        timestamp: new Date().toISOString()
                    }
                };
            }
            catch (error) {
                lastError = this.handleError(error);
                // Don't retry on auth errors
                if (lastError instanceof AuthenticationError) {
                    throw lastError;
                }
                // Handle rate limiting
                if (lastError instanceof RateLimitError) {
                    const retryAfter = error.response?.headers['retry-after'];
                    if (retryAfter) {
                        await this.sleep(parseInt(retryAfter) * 1000);
                    }
                }
                // Retry logic
                if (retries < this.config.maxRetries) {
                    retries++;
                    await this.sleep(this.config.retryDelay * Math.pow(2, retries - 1));
                    continue;
                }
                throw lastError;
            }
        }
        throw lastError || new NetworkError('Request failed after retries');
    }
    /**
     * GET request helper
     */
    async get(endpoint, options) {
        return this.request('GET', endpoint, undefined, options);
    }
    /**
     * POST request helper
     */
    async post(endpoint, data, options) {
        return this.request('POST', endpoint, data, options);
    }
    /**
     * PUT request helper
     */
    async put(endpoint, data, options) {
        return this.request('PUT', endpoint, data, options);
    }
    /**
     * DELETE request helper
     */
    async delete(endpoint, options) {
        return this.request('DELETE', endpoint, undefined, options);
    }
    /**
     * PATCH request helper
     */
    async patch(endpoint, data, options) {
        return this.request('PATCH', endpoint, data, options);
    }
    /**
     * Check API health
     */
    async healthCheck() {
        return this.get('/health');
    }
    /**
     * Set API key
     */
    setApiKey(apiKey) {
        this.config.apiKey = apiKey;
        this.authManager.setApiKey(apiKey);
    }
    /**
     * Set organization ID
     */
    setOrganizationId(organizationId) {
        this.config.organizationId = organizationId;
    }
    /**
     * Setup request/response interceptors
     */
    setupInterceptors() {
        // Request interceptor
        this.httpClient.interceptors.request.use((config) => {
            this.emit('request', config);
            return config;
        }, (error) => {
            this.emit('request:error', error);
            return Promise.reject(error);
        });
        // Response interceptor
        this.httpClient.interceptors.response.use((response) => {
            this.emit('response', response);
            return response;
        }, (error) => {
            this.emit('response:error', error);
            return Promise.reject(error);
        });
    }
    /**
     * Handle errors and convert to SDK errors
     */
    handleError(error) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            const message = data?.detail || data?.message || error.message;
            switch (status) {
                case 400:
                    return new ValidationError(message);
                case 401:
                    return new AuthenticationError(message);
                case 403:
                    return new AuthorizationError(message);
                case 404:
                    return new NotFoundError(message);
                case 408:
                    return new TimeoutError(message);
                case 429:
                    return new RateLimitError(message, error.response.headers['retry-after']);
                case 500:
                case 502:
                case 503:
                    return new ServerError(message, status);
                default:
                    return new AINativeError(message, status.toString(), status);
            }
        }
        else if (error.request) {
            return new NetworkError('No response received from server');
        }
        else if (error.code === 'ECONNABORTED') {
            return new TimeoutError('Request timed out');
        }
        else {
            return new NetworkError(error.message);
        }
    }
    /**
     * Enable debug logging
     */
    enableDebugLogging() {
        this.on('request', (config) => {
            console.log('[AINative] Request:', {
                method: config.method,
                url: config.url,
                headers: config.headers
            });
        });
        this.on('response', (response) => {
            console.log('[AINative] Response:', {
                status: response.status,
                url: response.config.url,
                data: response.data
            });
        });
        this.on('response:error', (error) => {
            console.error('[AINative] Error:', error.message);
        });
    }
    /**
     * Sleep helper for retries
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Utility functions for AINative SDK
 */
/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Retry a function with exponential backoff
 */
async function retry(fn, options = {}) {
    const { maxAttempts = 3, initialDelay = 1000, maxDelay = 30000, factor = 2, onRetry } = options;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts) {
                throw error;
            }
            if (onRetry) {
                onRetry(attempt, error);
            }
            const delay = Math.min(initialDelay * Math.pow(factor, attempt - 1), maxDelay);
            await sleep(delay);
        }
    }
    throw lastError;
}
/**
 * Create a debounced function
 */
function debounce(fn, delay) {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delay);
    };
}
/**
 * Create a throttled function
 */
function throttle(fn, limit) {
    let inThrottle = false;
    return (...args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}
/**
 * Chunk an array into smaller arrays
 */
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
/**
 * Generate a UUID v4
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/**
 * Check if running in browser
 */
function isBrowser() {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}
/**
 * Check if running in Node.js
 */
function isNode() {
    return typeof process !== 'undefined' && process.versions && !!process.versions.node;
}
/**
 * Deep merge objects
 */
function deepMerge(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMerge(target, ...sources);
}
/**
 * Check if value is a plain object
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * Format bytes to human readable string
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
/**
 * Parse query string to object
 */
function parseQueryString(queryString) {
    const params = {};
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
/**
 * Build query string from object
 */
function buildQueryString(params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    }
    return searchParams.toString();
}

/**
 * Core AINative SDK exports (without framework integrations)
 */

exports.AINativeClient = AINativeClient;
exports.AINativeError = AINativeError;
exports.AgentSwarmClient = AgentSwarmClient;
exports.AuthManager = AuthManager;
exports.AuthenticationError = AuthenticationError;
exports.AuthorizationError = AuthorizationError;
exports.NetworkError = NetworkError;
exports.NotFoundError = NotFoundError;
exports.RateLimitError = RateLimitError;
exports.ServerError = ServerError;
exports.TimeoutError = TimeoutError;
exports.ValidationError = ValidationError;
exports.ZeroDBClient = ZeroDBClient;
exports.buildQueryString = buildQueryString;
exports.chunk = chunk;
exports.debounce = debounce;
exports.deepMerge = deepMerge;
exports.default = AINativeClient;
exports.formatBytes = formatBytes;
exports.isBrowser = isBrowser;
exports.isNode = isNode;
exports.parseQueryString = parseQueryString;
exports.retry = retry;
exports.sleep = sleep;
exports.throttle = throttle;
exports.uuid = uuid;
