/**
 * Agent Learning Operations
 * Handles feedback collection, performance metrics, and agent comparison
 */
import { ZeroDBClient } from '../client';
import { SubmitFeedbackRequest, SubmitFeedbackResponse, GetPerformanceMetricsRequest, GetPerformanceMetricsResponse, CompareAgentsRequest, CompareAgentsResponse } from '../types/agents';
export declare class AgentLearningOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Submit feedback for an agent interaction
     *
     * @param request - Feedback parameters
     * @returns Feedback confirmation
     *
     * @example
     * ```typescript
     * const feedback = await client.agentLearning.submitFeedback({
     *   agent_id: 'backend',
     *   interaction_id: 'int_123',
     *   rating: 4.5,
     *   comments: 'Great code review, helpful suggestions'
     * });
     * ```
     */
    submitFeedback(request: SubmitFeedbackRequest): Promise<SubmitFeedbackResponse>;
    /**
     * Get performance metrics for an agent
     *
     * @param request - Metrics query parameters
     * @returns Agent performance metrics
     *
     * @example
     * ```typescript
     * const metrics = await client.agentLearning.getPerformanceMetrics({
     *   agent_id: 'backend',
     *   period: '7d'
     * });
     * console.log('Avg Rating:', metrics.metrics.avg_rating);
     * console.log('Success Rate:', metrics.metrics.success_rate);
     * ```
     */
    getPerformanceMetrics(request: GetPerformanceMetricsRequest): Promise<GetPerformanceMetricsResponse>;
    /**
     * Compare performance metrics across multiple agents
     *
     * @param request - Comparison parameters
     * @returns Agent comparison results
     *
     * @example
     * ```typescript
     * const comparison = await client.agentLearning.compareAgents({
     *   agents: ['backend', 'frontend', 'database'],
     *   metric: 'success_rate'
     * });
     *
     * comparison.agents.forEach(agent => {
     *   console.log(`${agent.agent_id}: ${agent.metrics.success_rate}%`);
     * });
     * ```
     */
    compareAgents(request: CompareAgentsRequest): Promise<CompareAgentsResponse>;
}
//# sourceMappingURL=agent_learning.d.ts.map