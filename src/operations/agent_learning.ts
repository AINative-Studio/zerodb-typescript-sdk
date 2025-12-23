/**
 * Agent Learning Operations
 * Handles feedback collection, performance metrics, and agent comparison
 */

import { ZeroDBClient } from '../client';
import {
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
  GetPerformanceMetricsRequest,
  GetPerformanceMetricsResponse,
  CompareAgentsRequest,
  CompareAgentsResponse
} from '../types/agents';

export class AgentLearningOperations {
  constructor(private client: ZeroDBClient) {}

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
  async submitFeedback(request: SubmitFeedbackRequest): Promise<SubmitFeedbackResponse> {
    return this.client.post<SubmitFeedbackResponse>(
      '/api/v1/agent-learning/feedback',
      request
    );
  }

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
  async getPerformanceMetrics(request: GetPerformanceMetricsRequest): Promise<GetPerformanceMetricsResponse> {
    const params = new URLSearchParams();
    params.append('agent_id', request.agent_id);
    if (request.period) params.append('period', request.period);

    return this.client.get<GetPerformanceMetricsResponse>(
      `/api/v1/agent-learning/metrics?${params.toString()}`
    );
  }

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
  async compareAgents(request: CompareAgentsRequest): Promise<CompareAgentsResponse> {
    return this.client.post<CompareAgentsResponse>(
      '/api/v1/agent-learning/compare',
      request
    );
  }
}
