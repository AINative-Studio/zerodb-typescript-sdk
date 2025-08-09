/**
 * React hook for ZeroDB operations
 */
import type { Project, CreateProjectRequest, Vector, UpsertVectorRequest, SearchVectorRequest, SearchVectorResponse, Memory, StoreMemoryRequest, SearchMemoryRequest } from '../types/zerodb';
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
        list: (options?: any) => Promise<import("..").ApiResponse<Project[]>>;
        create: (data: CreateProjectRequest) => Promise<import("..").ApiResponse<Project>>;
        get: (projectId: string) => Promise<import("..").ApiResponse<Project>>;
        update: (projectId: string, data: any) => Promise<import("..").ApiResponse<Project>>;
        delete: (projectId: string) => Promise<import("..").ApiResponse<void>>;
    };
    vectors: {
        upsert: (projectId: string, data: UpsertVectorRequest) => Promise<import("..").ApiResponse<Vector>>;
        search: (projectId: string, data: SearchVectorRequest) => Promise<import("..").ApiResponse<SearchVectorResponse>>;
        batchUpsert: (projectId: string, data: any) => Promise<import("..").ApiResponse<{
            inserted: number;
        }>>;
        list: (projectId: string, namespace?: string, limit?: number) => Promise<import("..").ApiResponse<Vector[]>>;
    };
    memory: {
        store: (projectId: string, data: StoreMemoryRequest) => Promise<import("..").ApiResponse<Memory>>;
        search: (projectId: string, data: SearchMemoryRequest) => Promise<import("..").ApiResponse<Memory[]>>;
        list: (projectId: string, options?: any) => Promise<import("..").ApiResponse<Memory[]>>;
    };
    events: {
        publish: (projectId: string, data: any) => Promise<import("..").ApiResponse<import("../types/zerodb").Event>>;
        list: (projectId: string, topic?: string, limit?: number) => Promise<import("..").ApiResponse<import("../types/zerodb").Event[]>>;
        stream: (projectId: string, options: any) => EventSource;
    };
    analytics: {
        usage: (projectId: string, days?: number) => Promise<import("..").ApiResponse<import("../types/zerodb").UsageMetrics[]>>;
        costs: (projectId: string, days?: number) => Promise<import("..").ApiResponse<import("../types/zerodb").CostAnalysis>>;
        overview: (projectId: string) => Promise<import("..").ApiResponse<import("../types/zerodb").Analytics>>;
    };
    loading: boolean;
    error: Error | null;
};
//# sourceMappingURL=useZeroDB.d.ts.map