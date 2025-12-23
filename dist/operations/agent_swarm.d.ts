/**
 * Agent Swarm Operations
 * Handles swarm lifecycle, scaling, and analytics
 */
import { ZeroDBClient } from '../client';
import { CreateSwarmRequest, CreateSwarmResponse, ListSwarmsRequest, ListSwarmsResponse, DeleteSwarmRequest, DeleteSwarmResponse, ScaleSwarmRequest, ScaleSwarmResponse, GetSwarmAnalyticsRequest, GetSwarmAnalyticsResponse, GetAgentTypesResponse, GetSwarmStatusRequest, GetSwarmStatusResponse, StartSwarmRequest, StartSwarmResponse, StopSwarmRequest, StopSwarmResponse, UpdateSwarmConfigRequest, UpdateSwarmConfigResponse } from '../types/agents';
export declare class AgentSwarmOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Create a new agent swarm
     *
     * @param request - Swarm creation parameters
     * @returns Created swarm details
     *
     * @example
     * ```typescript
     * const swarm = await client.agentSwarm.createSwarm({
     *   name: 'Development Team',
     *   project_id: 'proj_123',
     *   config: { max_agents: 10, timeout: 300 }
     * });
     * ```
     */
    createSwarm(request: CreateSwarmRequest): Promise<CreateSwarmResponse>;
    /**
     * List swarms with optional filtering
     *
     * @param request - List filtering parameters
     * @returns List of swarms
     *
     * @example
     * ```typescript
     * const swarms = await client.agentSwarm.listSwarms({
     *   project_id: 'proj_123',
     *   status: 'active',
     *   limit: 20
     * });
     * ```
     */
    listSwarms(request?: ListSwarmsRequest): Promise<ListSwarmsResponse>;
    /**
     * Delete a swarm
     *
     * @param request - Deletion parameters
     * @returns Deletion confirmation
     *
     * @example
     * ```typescript
     * const result = await client.agentSwarm.deleteSwarm({
     *   swarm_id: 'swarm_123'
     * });
     * console.log('Deleted:', result.success);
     * ```
     */
    deleteSwarm(request: DeleteSwarmRequest): Promise<DeleteSwarmResponse>;
    /**
     * Scale swarm agent count
     *
     * @param request - Scaling parameters
     * @returns Updated swarm details
     *
     * @example
     * ```typescript
     * const scaled = await client.agentSwarm.scaleSwarm({
     *   swarm_id: 'swarm_123',
     *   count: 5
     * });
     * console.log('New agent count:', scaled.agent_count);
     * ```
     */
    scaleSwarm(request: ScaleSwarmRequest): Promise<ScaleSwarmResponse>;
    /**
     * Get swarm analytics
     *
     * @param request - Analytics query parameters
     * @returns Swarm analytics data
     *
     * @example
     * ```typescript
     * const analytics = await client.agentSwarm.getSwarmAnalytics({
     *   swarm_id: 'swarm_123',
     *   period: '7d'
     * });
     * console.log('Completed tasks:', analytics.analytics.completed);
     * console.log('Avg completion time:', analytics.analytics.avg_completion_time);
     * ```
     */
    getSwarmAnalytics(request: GetSwarmAnalyticsRequest): Promise<GetSwarmAnalyticsResponse>;
    /**
     * Get available agent types
     *
     * @returns List of available agent types and capabilities
     *
     * @example
     * ```typescript
     * const types = await client.agentSwarm.getAgentTypes();
     * types.types.forEach(type => {
     *   console.log(`${type.type}: ${type.description}`);
     *   console.log('Capabilities:', type.capabilities.join(', '));
     * });
     * ```
     */
    getAgentTypes(): Promise<GetAgentTypesResponse>;
    /**
     * Get swarm status
     *
     * @param request - Status query parameters
     * @returns Current swarm status
     *
     * @example
     * ```typescript
     * const status = await client.agentSwarm.getStatus({
     *   swarm_id: 'swarm_123'
     * });
     * console.log('Status:', status.status);
     * console.log('Active tasks:', status.active_tasks);
     * ```
     */
    getStatus(request: GetSwarmStatusRequest): Promise<GetSwarmStatusResponse>;
    /**
     * Start a swarm
     *
     * @param request - Start parameters
     * @returns Start confirmation
     *
     * @example
     * ```typescript
     * const result = await client.agentSwarm.startSwarm({
     *   swarm_id: 'swarm_123'
     * });
     * console.log('Status:', result.status);
     * ```
     */
    startSwarm(request: StartSwarmRequest): Promise<StartSwarmResponse>;
    /**
     * Stop a swarm
     *
     * @param request - Stop parameters
     * @returns Stop confirmation
     *
     * @example
     * ```typescript
     * const result = await client.agentSwarm.stopSwarm({
     *   swarm_id: 'swarm_123'
     * });
     * console.log('Status:', result.status);
     * ```
     */
    stopSwarm(request: StopSwarmRequest): Promise<StopSwarmResponse>;
    /**
     * Update swarm configuration
     *
     * @param request - Update parameters
     * @returns Updated configuration
     *
     * @example
     * ```typescript
     * const updated = await client.agentSwarm.updateSwarmConfig({
     *   swarm_id: 'swarm_123',
     *   config: { max_agents: 15, timeout: 600 }
     * });
     * console.log('New config:', updated.config);
     * ```
     */
    updateSwarmConfig(request: UpdateSwarmConfigRequest): Promise<UpdateSwarmConfigResponse>;
}
//# sourceMappingURL=agent_swarm.d.ts.map