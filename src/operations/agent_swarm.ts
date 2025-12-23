/**
 * Agent Swarm Operations
 * Handles swarm lifecycle, scaling, and analytics
 */

import { ZeroDBClient } from '../client';
import {
  CreateSwarmRequest,
  CreateSwarmResponse,
  ListSwarmsRequest,
  ListSwarmsResponse,
  DeleteSwarmRequest,
  DeleteSwarmResponse,
  ScaleSwarmRequest,
  ScaleSwarmResponse,
  GetSwarmAnalyticsRequest,
  GetSwarmAnalyticsResponse,
  GetAgentTypesResponse,
  GetSwarmStatusRequest,
  GetSwarmStatusResponse,
  StartSwarmRequest,
  StartSwarmResponse,
  StopSwarmRequest,
  StopSwarmResponse,
  UpdateSwarmConfigRequest,
  UpdateSwarmConfigResponse
} from '../types/agents';

export class AgentSwarmOperations {
  constructor(private client: ZeroDBClient) {}

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
  async createSwarm(request: CreateSwarmRequest): Promise<CreateSwarmResponse> {
    return this.client.post<CreateSwarmResponse>(
      '/api/v1/agent-swarm/swarms',
      request
    );
  }

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
  async listSwarms(request?: ListSwarmsRequest): Promise<ListSwarmsResponse> {
    const params = new URLSearchParams();
    if (request?.project_id) params.append('project_id', request.project_id);
    if (request?.status) params.append('status', request.status);
    if (request?.limit) params.append('limit', request.limit.toString());
    if (request?.offset) params.append('offset', request.offset.toString());

    return this.client.get<ListSwarmsResponse>(
      `/api/v1/agent-swarm/swarms?${params.toString()}`
    );
  }

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
  async deleteSwarm(request: DeleteSwarmRequest): Promise<DeleteSwarmResponse> {
    return this.client.delete<DeleteSwarmResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}`
    );
  }

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
  async scaleSwarm(request: ScaleSwarmRequest): Promise<ScaleSwarmResponse> {
    return this.client.post<ScaleSwarmResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}/scale`,
      { count: request.count }
    );
  }

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
  async getSwarmAnalytics(request: GetSwarmAnalyticsRequest): Promise<GetSwarmAnalyticsResponse> {
    const params = new URLSearchParams();
    params.append('swarm_id', request.swarm_id);
    if (request.period) params.append('period', request.period);

    return this.client.get<GetSwarmAnalyticsResponse>(
      `/api/v1/agent-swarm/analytics?${params.toString()}`
    );
  }

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
  async getAgentTypes(): Promise<GetAgentTypesResponse> {
    return this.client.get<GetAgentTypesResponse>(
      '/api/v1/agent-swarm/types'
    );
  }

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
  async getStatus(request: GetSwarmStatusRequest): Promise<GetSwarmStatusResponse> {
    return this.client.get<GetSwarmStatusResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}/status`
    );
  }

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
  async startSwarm(request: StartSwarmRequest): Promise<StartSwarmResponse> {
    return this.client.post<StartSwarmResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}/start`,
      {}
    );
  }

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
  async stopSwarm(request: StopSwarmRequest): Promise<StopSwarmResponse> {
    return this.client.post<StopSwarmResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}/stop`,
      {}
    );
  }

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
  async updateSwarmConfig(request: UpdateSwarmConfigRequest): Promise<UpdateSwarmConfigResponse> {
    return this.client.put<UpdateSwarmConfigResponse>(
      `/api/v1/agent-swarm/swarms/${request.swarm_id}/config`,
      { config: request.config }
    );
  }
}
