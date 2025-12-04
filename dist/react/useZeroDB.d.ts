/**
 * React hook for ZeroDB operations
 */
/**
 * Hook for ZeroDB operations with loading states
 *
 * @example
 * ```tsx
 * import { useZeroDB } from '@ainative/sdk/react';
 *
 * function MyComponent() {
 *   const { projects, vectors, memory, loading, error } = useZeroDB();
 *
 *   const createProject = async () => {
 *     const result = await projects.create({
 *       name: 'My Project',
 *       description: 'Test project'
 *     });
 *     console.log(result.data);
 *   };
 *
 *   return (
 *     <div>
 *       {loading && <p>Loading...</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       <button onClick={createProject}>Create Project</button>
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useZeroDB(): {
    projects: {
        list: any;
        create: any;
        get: any;
        update: any;
        delete: any;
    };
    vectors: {
        upsert: any;
        search: any;
        batchUpsert: any;
        list: any;
    };
    memory: {
        store: any;
        search: any;
        list: any;
    };
    events: {
        publish: any;
        list: any;
        stream: any;
    };
    analytics: {
        usage: any;
        costs: any;
        overview: any;
    };
    loading: any;
    error: any;
};
//# sourceMappingURL=useZeroDB.d.ts.map