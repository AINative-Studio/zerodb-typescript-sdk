/**
 * Project operations for ZeroDB MCP Client
 */

import { ZeroDBClient } from '../client';
import {
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectDetailsRequest,
  ProjectDetailsResponse,
  ProjectListResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDeleteRequest,
  ProjectDeleteResponse,
  ProjectStatsRequest,
  ProjectStatsResponse,
  DatabaseEnableRequest,
  DatabaseEnableResponse
} from '../types';
import { sanitizeProjectId } from '../utils';

export class ProjectOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Create a new project
   */
  async create(request: ProjectCreateRequest): Promise<ProjectCreateResponse> {
    return this.client.post<ProjectCreateResponse>(
      '/api/v1/zerodb/projects',
      {
        project_name: request.name,
        description: request.description,
        tier: request.tier || 'free'
      }
    );
  }

  /**
   * Get project details
   */
  async get(request: ProjectDetailsRequest): Promise<ProjectDetailsResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.get<ProjectDetailsResponse>(
      `/api/v1/zerodb/projects/${request.project_id}`
    );
  }

  /**
   * List all projects
   */
  async list(): Promise<ProjectListResponse> {
    return this.client.get<ProjectListResponse>('/api/v1/zerodb/projects');
  }

  /**
   * Update project
   */
  async update(request: ProjectUpdateRequest): Promise<ProjectUpdateResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.patch<ProjectUpdateResponse>(
      `/api/v1/zerodb/projects/${request.project_id}`,
      {
        project_name: request.name,
        description: request.description,
        tier: request.tier
      }
    );
  }

  /**
   * Delete project
   */
  async delete(request: ProjectDeleteRequest): Promise<ProjectDeleteResponse> {
    sanitizeProjectId(request.project_id);

    if (!request.confirm) {
      throw new Error('Project deletion requires confirmation (confirm: true)');
    }

    return this.client.delete<ProjectDeleteResponse>(
      `/api/v1/zerodb/projects/${request.project_id}`
    );
  }

  /**
   * Get project statistics
   */
  async stats(request: ProjectStatsRequest): Promise<ProjectStatsResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.get<ProjectStatsResponse>(
      `/api/v1/zerodb/projects/${request.project_id}/usage`
    );
  }

  /**
   * Enable database for project
   */
  async enableDatabase(request: DatabaseEnableRequest): Promise<DatabaseEnableResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<DatabaseEnableResponse>(
      `/api/v1/zerodb/${request.project_id}/database`,
      {}
    );
  }
}
