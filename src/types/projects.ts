/**
 * Type definitions for project operations
 */

import { UUID, TimestampFields } from './index';

// Project tier
export type ProjectTier = 'free' | 'pro' | 'enterprise';

// Project creation
export interface ProjectCreateRequest {
  name: string;
  description?: string;
  tier?: ProjectTier;
}

export interface Project extends TimestampFields {
  project_id: UUID;
  name: string;
  description?: string;
  tier: ProjectTier;
  database_enabled: boolean;
}

export interface ProjectCreateResponse extends Project {
  status: 'active';
}

// Project details
export interface ProjectDetailsRequest {
  project_id: UUID;
}

export interface ProjectDetailsResponse {
  project: Project;
  stats: {
    vector_count: number;
    table_count: number;
    file_count: number;
    event_count: number;
  };
}

// Project list
export interface ProjectListResponse {
  projects: Project[];
  total_count: number;
}

// Project update
export interface ProjectUpdateRequest {
  project_id: UUID;
  name?: string;
  description?: string;
  tier?: ProjectTier;
}

export interface ProjectUpdateResponse {
  project: Project;
  status: 'updated';
}

// Project deletion
export interface ProjectDeleteRequest {
  project_id: UUID;
  confirm: boolean;
}

export interface ProjectDeleteResponse {
  status: 'deleted';
  data_deleted: {
    vectors: number;
    tables: number;
    files: number;
    events: number;
  };
}

// Project statistics
export interface ProjectStatsRequest {
  project_id: UUID;
}

export interface ProjectStatsResponse {
  storage: {
    vectors_bytes: number;
    files_bytes: number;
    total_bytes: number;
  };
  counts: {
    vectors: number;
    tables: number;
    rows: number;
    files: number;
    events: number;
  };
  usage: {
    api_calls_24h: number;
    bandwidth_bytes_24h: number;
  };
  performance: {
    avg_query_time_ms: number;
    p95_query_time_ms: number;
  };
}

// Enable database
export interface DatabaseEnableRequest {
  project_id: UUID;
}

export interface DatabaseEnableResponse {
  database_enabled: boolean;
  database_url: string;
  status: 'enabled';
}
