/**
 * Agent Coordination Operations
 * Handles inter-agent messaging and task distribution
 */
import { ZeroDBClient } from '../client';
import { SendMessageRequest, SendMessageResponse, DistributeTasksRequest, DistributeTasksResponse, WorkloadStatsRequest, WorkloadStatsResponse } from '../types/agents';
export declare class AgentCoordinationOperations {
    private client;
    constructor(client: ZeroDBClient);
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
    sendMessage(request: SendMessageRequest): Promise<SendMessageResponse>;
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
    distributeTasks(request: DistributeTasksRequest): Promise<DistributeTasksResponse>;
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
    getWorkloadStats(request?: WorkloadStatsRequest): Promise<WorkloadStatsResponse>;
}
//# sourceMappingURL=agent_coordination.d.ts.map