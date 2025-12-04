/**
 * React hook for Agent Swarm operations
 */
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
        start: any;
        status: any;
        stop: any;
        pause: any;
        resume: any;
        list: any;
    };
    tasks: {
        orchestrate: any;
        status: any;
        cancel: any;
        list: any;
    };
    agents: {
        types: any;
        get: any;
        add: any;
        remove: any;
        configurePrompt: any;
        getPrompt: any;
    };
    metrics: {
        swarm: any;
        agent: any;
        project: any;
    };
    events: {
        stream: any;
        history: any;
    };
    loading: any;
    error: any;
};
//# sourceMappingURL=useAgentSwarm.d.ts.map