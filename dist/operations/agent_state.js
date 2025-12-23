"use strict";
/**
 * Agent State Operations
 * Handles agent state management, checkpoints, and restoration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStateOperations = void 0;
class AgentStateOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current agent state
     *
     * @param request - State query parameters
     * @returns Current agent state
     *
     * @example
     * ```typescript
     * const state = await client.agentState.getState({
     *   agent_id: 'backend'
     * });
     * console.log('State:', state.state);
     * console.log('Version:', state.version);
     * ```
     */
    async getState(request) {
        const params = new URLSearchParams();
        params.append('agent_id', request.agent_id);
        if (request.version)
            params.append('version', request.version.toString());
        return this.client.get(`/api/v1/agent-state/state?${params.toString()}`);
    }
    /**
     * Create a state checkpoint
     *
     * @param request - Checkpoint creation parameters
     * @returns Created checkpoint details
     *
     * @example
     * ```typescript
     * const checkpoint = await client.agentState.createCheckpoint({
     *   agent_id: 'backend',
     *   name: 'pre_deployment',
     *   data: { config: { debug: true } },
     *   description: 'State before deployment'
     * });
     * ```
     */
    async createCheckpoint(request) {
        return this.client.post('/api/v1/agent-state/checkpoints', request);
    }
    /**
     * Restore agent state from a checkpoint
     *
     * @param request - Restoration parameters
     * @returns Restoration confirmation
     *
     * @example
     * ```typescript
     * const restore = await client.agentState.restoreCheckpoint({
     *   checkpoint_id: 'cp_123',
     *   agent_id: 'backend'
     * });
     * console.log('Restored:', restore.status);
     * ```
     */
    async restoreCheckpoint(request) {
        return this.client.post('/api/v1/agent-state/restore', request);
    }
    /**
     * List available checkpoints
     *
     * @param request - List filtering parameters
     * @returns List of checkpoints
     *
     * @example
     * ```typescript
     * // List all checkpoints for an agent
     * const checkpoints = await client.agentState.listCheckpoints({
     *   agent_id: 'backend',
     *   limit: 10
     * });
     *
     * checkpoints.checkpoints.forEach(cp => {
     *   console.log(`${cp.name}: ${cp.created_at}`);
     * });
     * ```
     */
    async listCheckpoints(request) {
        const params = new URLSearchParams();
        if (request?.agent_id)
            params.append('agent_id', request.agent_id);
        if (request?.limit)
            params.append('limit', request.limit.toString());
        if (request?.offset)
            params.append('offset', request.offset.toString());
        return this.client.get(`/api/v1/agent-state/checkpoints?${params.toString()}`);
    }
}
exports.AgentStateOperations = AgentStateOperations;
