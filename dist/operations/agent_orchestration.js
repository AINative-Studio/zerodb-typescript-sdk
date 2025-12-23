"use strict";
/**
 * Agent Orchestration Operations
 * Handles task creation, execution, and management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentOrchestrationOperations = void 0;
class AgentOrchestrationOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create a new agent task
     *
     * @param request - Task creation parameters
     * @returns Created task details
     *
     * @example
     * ```typescript
     * const task = await client.agentOrchestration.createTask({
     *   agent_id: 'backend',
     *   task_type: 'code_review',
     *   description: 'Review pull request #42',
     *   priority: 'high'
     * });
     * ```
     */
    async createTask(request) {
        return this.client.post('/api/v1/agent-orchestration/tasks', request);
    }
    /**
     * List tasks with optional filtering
     *
     * @param request - List filtering parameters
     * @returns List of tasks
     *
     * @example
     * ```typescript
     * const tasks = await client.agentOrchestration.listTasks({
     *   agent_id: 'backend',
     *   status: 'completed',
     *   limit: 10
     * });
     * ```
     */
    async listTasks(request) {
        const params = new URLSearchParams();
        if (request?.agent_id)
            params.append('agent_id', request.agent_id);
        if (request?.status)
            params.append('status', request.status);
        if (request?.limit)
            params.append('limit', request.limit.toString());
        if (request?.offset)
            params.append('offset', request.offset.toString());
        return this.client.get(`/api/v1/agent-orchestration/tasks?${params.toString()}`);
    }
    /**
     * Get task status and progress
     *
     * @param taskId - Task ID
     * @returns Task status details
     *
     * @example
     * ```typescript
     * const status = await client.agentOrchestration.getTaskStatus('task_123');
     * console.log('Progress:', status.progress);
     * ```
     */
    async getTaskStatus(taskId) {
        return this.client.get(`/api/v1/agent-orchestration/tasks/${taskId}/status`);
    }
    /**
     * Execute a task
     *
     * @param request - Task execution parameters
     * @returns Execution result
     *
     * @example
     * ```typescript
     * const result = await client.agentOrchestration.executeTask({
     *   task_id: 'task_123',
     *   params: { verbose: true }
     * });
     * ```
     */
    async executeTask(request) {
        return this.client.post(`/api/v1/agent-orchestration/tasks/${request.task_id}/execute`, { params: request.params });
    }
    /**
     * Create a task sequence
     *
     * @param request - Task sequence parameters
     * @returns Created sequence details
     *
     * @example
     * ```typescript
     * const sequence = await client.agentOrchestration.createTaskSequence({
     *   name: 'Build Pipeline',
     *   tasks: ['task_1', 'task_2', 'task_3'],
     *   description: 'Sequential build tasks'
     * });
     * ```
     */
    async createTaskSequence(request) {
        return this.client.post('/api/v1/agent-orchestration/sequences', request);
    }
}
exports.AgentOrchestrationOperations = AgentOrchestrationOperations;
