/**
 * Agent Coordination Operations
 * Handles inter-agent messaging and task distribution
 */

import { ZeroDBClient } from '../client';
import {
  SendMessageRequest,
  SendMessageResponse,
  DistributeTasksRequest,
  DistributeTasksResponse,
  WorkloadStatsRequest,
  WorkloadStatsResponse
} from '../types/agents';

export class AgentCoordinationOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Send message between agents
   *
   * @param request - Message parameters
   * @returns Message confirmation
   *
   * @example
   * ```typescript
   * const message = await client.agentCoordination.sendMessage({
   *   from_agent: 'coordinator',
   *   to_agent: 'backend',
   *   message: 'Start code review',
   *   message_type: 'task_assignment',
   *   priority: 'high'
   * });
   * ```
   */
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    return this.client.post<SendMessageResponse>(
      '/api/v1/agent-coordination/messages',
      request
    );
  }

  /**
   * Distribute tasks across agents
   *
   * @param request - Distribution parameters
   * @returns Task assignment details
   *
   * @example
   * ```typescript
   * const distribution = await client.agentCoordination.distributeTasks({
   *   tasks: ['task_1', 'task_2', 'task_3'],
   *   agents: ['backend', 'frontend', 'database'],
   *   strategy: 'load_balanced'
   * });
   * console.log('Distributed:', distribution.distributed);
   * ```
   */
  async distributeTasks(request: DistributeTasksRequest): Promise<DistributeTasksResponse> {
    return this.client.post<DistributeTasksResponse>(
      '/api/v1/agent-coordination/distribute',
      request
    );
  }

  /**
   * Get agent workload statistics
   *
   * @param request - Workload query parameters
   * @returns Workload statistics
   *
   * @example
   * ```typescript
   * // Get all agents' workload
   * const stats = await client.agentCoordination.getWorkloadStats({});
   *
   * // Get specific agent's workload
   * const agentStats = await client.agentCoordination.getWorkloadStats({
   *   agent_id: 'backend'
   * });
   * ```
   */
  async getWorkloadStats(request?: WorkloadStatsRequest): Promise<WorkloadStatsResponse> {
    const params = new URLSearchParams();
    if (request?.agent_id) params.append('agent_id', request.agent_id);

    return this.client.get<WorkloadStatsResponse>(
      `/api/v1/agent-coordination/workload?${params.toString()}`
    );
  }
}
