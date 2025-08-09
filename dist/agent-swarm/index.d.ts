/**
 * Agent Swarm client for TypeScript/JavaScript
 */
import type { AINativeClient } from '../client';
import type { ApiResponse } from '../types';
import type { Agent, AgentType, Swarm, StartSwarmRequest, OrchestrateTaskRequest, Task, SwarmMetrics, AgentPrompt, ConfigureAgentPromptRequest, SwarmEvent } from '../types/agent-swarm';
export declare class AgentSwarmClient {
    private client;
    constructor(client: AINativeClient);
    /**
     * Swarm Management
     */
    swarm: {
        /**
         * Start a new agent swarm
         */
        start: (data: StartSwarmRequest) => Promise<ApiResponse<Swarm>>;
        /**
         * Get swarm status
         */
        status: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * Stop a running swarm
         */
        stop: (swarmId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * Pause a running swarm
         */
        pause: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * Resume a paused swarm
         */
        resume: (swarmId: string) => Promise<ApiResponse<Swarm>>;
        /**
         * List all swarms
         */
        list: (projectId?: string) => Promise<ApiResponse<Swarm[]>>;
    };
    /**
     * Task Orchestration
     */
    tasks: {
        /**
         * Orchestrate a new task
         */
        orchestrate: (data: OrchestrateTaskRequest) => Promise<ApiResponse<Task>>;
        /**
         * Get task status
         */
        status: (taskId: string) => Promise<ApiResponse<Task>>;
        /**
         * Cancel a task
         */
        cancel: (taskId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * List tasks for a swarm
         */
        list: (swarmId: string) => Promise<ApiResponse<Task[]>>;
    };
    /**
     * Agent Management
     */
    agents: {
        /**
         * List available agent types
         */
        types: () => Promise<ApiResponse<AgentType[]>>;
        /**
         * Get agent details
         */
        get: (agentId: string) => Promise<ApiResponse<Agent>>;
        /**
         * Add agent to swarm
         */
        add: (swarmId: string, agent: {
            type: AgentType;
            config?: any;
        }) => Promise<ApiResponse<Agent>>;
        /**
         * Remove agent from swarm
         */
        remove: (swarmId: string, agentId: string) => Promise<ApiResponse<{
            message: string;
        }>>;
        /**
         * Configure agent prompts
         */
        configurePrompt: (data: ConfigureAgentPromptRequest) => Promise<ApiResponse<AgentPrompt>>;
        /**
         * Get agent prompts
         */
        getPrompt: (agentType: AgentType) => Promise<ApiResponse<AgentPrompt>>;
    };
    /**
     * Metrics and Monitoring
     */
    metrics: {
        /**
         * Get swarm metrics
         */
        swarm: (swarmId: string) => Promise<ApiResponse<SwarmMetrics>>;
        /**
         * Get agent metrics
         */
        agent: (agentId: string) => Promise<ApiResponse<any>>;
        /**
         * Get project-wide metrics
         */
        project: (projectId: string) => Promise<ApiResponse<any>>;
    };
    /**
     * Event Streaming
     */
    events: {
        /**
         * Stream swarm events
         */
        stream: (swarmId: string, onEvent: (event: SwarmEvent) => void) => EventSource;
        /**
         * Get historical events
         */
        history: (swarmId: string, limit?: number) => Promise<ApiResponse<SwarmEvent[]>>;
    };
}
//# sourceMappingURL=index.d.ts.map