/**
 * Project operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { ProjectCreateRequest, ProjectCreateResponse, ProjectDetailsRequest, ProjectDetailsResponse, ProjectListResponse, ProjectUpdateRequest, ProjectUpdateResponse, ProjectDeleteRequest, ProjectDeleteResponse, ProjectStatsRequest, ProjectStatsResponse, DatabaseEnableRequest, DatabaseEnableResponse } from '../types';
export declare class ProjectOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Create a new project
     */
    create(request: ProjectCreateRequest): Promise<ProjectCreateResponse>;
    /**
     * Get project details
     */
    get(request: ProjectDetailsRequest): Promise<ProjectDetailsResponse>;
    /**
     * List all projects
     */
    list(): Promise<ProjectListResponse>;
    /**
     * Update project
     */
    update(request: ProjectUpdateRequest): Promise<ProjectUpdateResponse>;
    /**
     * Delete project
     */
    delete(request: ProjectDeleteRequest): Promise<ProjectDeleteResponse>;
    /**
     * Get project statistics
     */
    stats(request: ProjectStatsRequest): Promise<ProjectStatsResponse>;
    /**
     * Enable database for project
     */
    enableDatabase(request: DatabaseEnableRequest): Promise<DatabaseEnableResponse>;
}
//# sourceMappingURL=projects.d.ts.map