/**
 * Table/NoSQL operations for ZeroDB MCP Client
 */

import { ZeroDBClient } from '../client';
import {
  TableCreateRequest,
  Table,
  TableListResponse,
  TableDetailsResponse,
  TableDeleteRequest,
  TableDeleteResponse,
  RowInsertRequest,
  RowInsertResponse,
  RowQueryRequest,
  RowQueryResponse,
  RowUpdateRequest,
  RowUpdateResponse,
  RowDeleteRequest,
  RowDeleteResponse,
  UUID
} from '../types';
import { sanitizeProjectId } from '../utils';

export class TableOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Create a new table
   */
  async createTable(request: TableCreateRequest): Promise<Table> {
    sanitizeProjectId(request.project_id);

    return this.client.post<Table>(
      `/api/v1/zerodb/${request.project_id}/database/tables`,
      {
        table_name: request.table_name,
        schema_definition: request.schema
      }
    );
  }

  /**
   * List all tables in a project
   */
  async listTables(projectId: UUID): Promise<TableListResponse> {
    sanitizeProjectId(projectId);

    return this.client.get<TableListResponse>(
      `/api/v1/zerodb/${projectId}/database/tables`
    );
  }

  /**
   * Get table details
   */
  async getTable(projectId: UUID, tableName: string): Promise<TableDetailsResponse> {
    sanitizeProjectId(projectId);

    return this.client.get<TableDetailsResponse>(
      `/api/v1/zerodb/${projectId}/database/tables/${tableName}`
    );
  }

  /**
   * Delete a table
   */
  async deleteTable(request: TableDeleteRequest): Promise<TableDeleteResponse> {
    sanitizeProjectId(request.project_id);

    if (!request.confirm) {
      throw new Error('Table deletion requires confirmation (confirm: true)');
    }

    return this.client.delete<TableDeleteResponse>(
      `/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}`
    );
  }

  /**
   * Insert rows into a table
   */
  async insertRows(request: RowInsertRequest): Promise<RowInsertResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<RowInsertResponse>(
      `/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`,
      {
        rows: request.rows
      }
    );
  }

  /**
   * Query rows from a table
   */
  async queryRows(request: RowQueryRequest): Promise<RowQueryResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<RowQueryResponse>(
      `/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows/query`,
      {
        filters: request.filters,
        limit: request.limit || 100,
        offset: request.offset || 0,
        order_by: request.order_by
      }
    );
  }

  /**
   * Update rows in a table
   */
  async updateRows(request: RowUpdateRequest): Promise<RowUpdateResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.put<RowUpdateResponse>(
      `/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`,
      {
        filters: request.filters,
        updates: request.updates
      }
    );
  }

  /**
   * Delete rows from a table
   */
  async deleteRows(request: RowDeleteRequest): Promise<RowDeleteResponse> {
    sanitizeProjectId(request.project_id);

    if (!request.confirm) {
      throw new Error('Row deletion requires confirmation (confirm: true)');
    }

    return this.client.delete<RowDeleteResponse>(
      `/api/v1/zerodb/${request.project_id}/database/tables/${request.table_name}/rows`,
      {
        data: { filters: request.filters }
      }
    );
  }
}
