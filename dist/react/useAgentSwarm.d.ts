/**
 * React hook for Agent Swarm operations
 */
import type { Swarm, StartSwarmRequest, OrchestrateTaskRequest, Task, AgentType, ConfigureAgentPromptRequest } from '../types/agent-swarm';
/**
 * Hook for Agent Swarm operations with loading states
 *
 * @example
 * ```tsx
 * import { useAgentSwarm } from '@ainative/sdk/react';
 *
 * function SwarmComponent() {
 *   const { swarm, tasks, agents, loading, error } = useAgentSwarm();
 *
 *   const startSwarm = async () => {
 *     const result = await swarm.start({
 *       projectId: 'project-id',
 *       agents: [
 *         { type: 'data_analyst', name: 'Data Analyst' }
 *       ]
 *     });
 *     console.log('Swarm started:', result.data);
 *   };
 *
 *   return (
 *     <div>
 *       {loading && <p>Loading...</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       <button onClick={startSwarm}>Start Swarm</button>
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useAgentSwarm(): {
    swarm: {
        start: (data: StartSwarmRequest) => Promise<import("..").ApiResponse<Swarm>>;
        status: (swarmId: string) => Promise<import("..").ApiResponse<Swarm>>;
        stop: (swarmId: string) => Promise<import("..").ApiResponse<{
            message: string;
        }>>;
        pause: (swarmId: string) => Promise<import("..").ApiResponse<Swarm>>;
        resume: (swarmId: string) => Promise<import("..").ApiResponse<Swarm>>;
        list: (projectId?: string) => Promise<import("..").ApiResponse<Swarm[]>>;
    };
    tasks: {
        orchestrate: (data: OrchestrateTaskRequest) => Promise<import("..").ApiResponse<Task>>;
        status: (taskId: string) => Promise<import("..").ApiResponse<Task>>;
        cancel: (taskId: string) => Promise<import("..").ApiResponse<{
            message: string;
        }>>;
        list: (swarmId: string) => Promise<import("..").ApiResponse<Task[]>>;
    };
    agents: {
        types: () => Promise<import("..").ApiResponse<AgentType[]>>;
        get: (agentId: string) => Promise<import("..").ApiResponse<import("../types/agent-swarm").Agent>>;
        add: (swarmId: string, agent: {
            type: AgentType;
            config?: any;
        }) => Promise<import("..").ApiResponse<import("../types/agent-swarm").Agent>>;
        remove: (swarmId: string, agentId: string) => Promise<import("..").ApiResponse<{
            message: string;
        }>>;
        configurePrompt: (data: ConfigureAgentPromptRequest) => Promise<import("..").ApiResponse<import("../types/agent-swarm").AgentPrompt>>;
        getPrompt: (agentType: AgentType) => Promise<import("..").ApiResponse<import("../types/agent-swarm").AgentPrompt>>;
    };
    metrics: {
        swarm: (swarmId: string) => Promise<import("..").ApiResponse<import("../types/agent-swarm").SwarmMetrics>>;
        agent: (agentId: string) => Promise<import("..").ApiResponse<any>>;
        project: (projectId: string) => Promise<import("..").ApiResponse<any>>;
    };
    events: {
        stream: (swarmId: string, onEvent: (event: any) => void) => EventSource;
        history: (swarmId: string, limit?: number) => Promise<import("..").ApiResponse<import("../types/agent-swarm").SwarmEvent[]>>;
    };
    loading: boolean;
    error: Error | null;
};
//# sourceMappingURL=useAgentSwarm.d.ts.map