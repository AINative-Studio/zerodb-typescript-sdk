/**
 * Agent Orchestration Operations
 * Handles task creation, execution, and management
 */
import { ZeroDBClient } from '../client';
import { CreateTaskRequest, CreateTaskResponse, ListTasksRequest, ListTasksResponse, TaskStatusResponse, ExecuteTaskRequest, ExecuteTaskResponse, CreateTaskSequenceRequest, CreateTaskSequenceResponse } from '../types/agents';
export declare class AgentOrchestrationOperations {
    private client;
    constructor(client: ZeroDBClient);
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
    createTask(request: CreateTaskRequest): Promise<CreateTaskResponse>;
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
    listTasks(request?: ListTasksRequest): Promise<ListTasksResponse>;
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
    getTaskStatus(taskId: string): Promise<TaskStatusResponse>;
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
    executeTask(request: ExecuteTaskRequest): Promise<ExecuteTaskResponse>;
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
    createTaskSequence(request: CreateTaskSequenceRequest): Promise<CreateTaskSequenceResponse>;
}
//# sourceMappingURL=agent_orchestration.d.ts.map