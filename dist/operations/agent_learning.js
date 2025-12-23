"use strict";
/**
 * Agent Learning Operations
 * Handles feedback collection, performance metrics, and agent comparison
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLearningOperations = void 0;
class AgentLearningOperations {
    constructor(client) {
        this.client = client;
    }
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
    async submitFeedback(request) {
        return this.client.post('/api/v1/agent-learning/feedback', request);
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
    async getPerformanceMetrics(request) {
        const params = new URLSearchParams();
        params.append('agent_id', request.agent_id);
        if (request.period)
            params.append('period', request.period);
        return this.client.get(`/api/v1/agent-learning/metrics?${params.toString()}`);
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
    async compareAgents(request) {
        return this.client.post('/api/v1/agent-learning/compare', request);
    }
}
exports.AgentLearningOperations = AgentLearningOperations;
