/**
 * Type definitions for table/NoSQL operations
 */

import { UUID, TimestampFields } from './index';

// Table schema definition
export interface TableSchema {
  [columnName: string]: {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    nullable?: boolean;
    default?: any;
  };
}

// Table creation
export interface TableCreateRequest {
  project_id: UUID;
  table_name: string;
  schema?: TableSchema;
}

export interface Table extends TimestampFields {
  table_id: UUID;
  project_id: UUID;
  table_name: string;
  schema_definition?: TableSchema;
}

// Table list response
export interface TableListResponse {
  tables: Array<{
    table_id: UUID;
    table_name: string;
    row_count: number;
    created_at: string;
  }>;
  total_count: number;
}

// Table details
export interface TableDetailsResponse {
  table: Table & {
    row_count: number;
    storage_bytes: number;
  };
  indexes: string[];
  status: 'active' | 'archived';
}

// Table deletion
export interface TableDeleteRequest {
  project_id: UUID;
  table_name: string;
  confirm: boolean;
}

export interface TableDeleteResponse {
  status: 'deleted' | 'not_found';
  rows_deleted: number;
}

// Row operations
export interface RowData {
  [key: string]: any;
}

export interface Row extends TimestampFields {
  row_id: UUID;
  project_id: UUID;
  table_id: UUID;
  table_name: string;
  row_data: RowData;
}

// Insert rows
export interface RowInsertRequest {
  project_id: UUID;
  table_name: string;
  rows: RowData[];
}

export interface RowInsertResponse {
  inserted_ids: UUID[];
  inserted_count: number;
  failed: Array<{
    index: number;
    error: string;
  }>;
}

// Query rows
export interface RowQueryRequest {
  project_id: UUID;
  table_name: string;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
  order_by?: string;
}

export interface RowQueryResponse {
  rows: Row[];
  total_count: number;
  has_more: boolean;
  query_time_ms: number;
}

// Update rows
export interface RowUpdateRequest {
  project_id: UUID;
  table_name: string;
  filters: Record<string, any>;
  updates: Record<string, any>;
}

export interface RowUpdateResponse {
  updated_count: number;
  status: 'success' | 'partial' | 'failed';
}

// Delete rows
export interface RowDeleteRequest {
  project_id: UUID;
  table_name: string;
  filters: Record<string, any>;
  confirm: boolean;
}

export interface RowDeleteResponse {
  deleted_count: number;
  status: 'success' | 'not_found';
}
