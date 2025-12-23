/**
 * Agent State Operations
 * Handles agent state management, checkpoints, and restoration
 */
import { ZeroDBClient } from '../client';
import { GetStateRequest, GetStateResponse, CreateCheckpointRequest, CreateCheckpointResponse, RestoreCheckpointRequest, RestoreCheckpointResponse, ListCheckpointsRequest, ListCheckpointsResponse } from '../types/agents';
export declare class AgentStateOperations {
    private client;
    constructor(client: ZeroDBClient);
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
    getState(request: GetStateRequest): Promise<GetStateResponse>;
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
    createCheckpoint(request: CreateCheckpointRequest): Promise<CreateCheckpointResponse>;
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
    restoreCheckpoint(request: RestoreCheckpointRequest): Promise<RestoreCheckpointResponse>;
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
    listCheckpoints(request?: ListCheckpointsRequest): Promise<ListCheckpointsResponse>;
}
//# sourceMappingURL=agent_state.d.ts.map