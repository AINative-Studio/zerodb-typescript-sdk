/**
 * Table/NoSQL operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { TableCreateRequest, Table, TableListResponse, TableDetailsResponse, TableDeleteRequest, TableDeleteResponse, RowInsertRequest, RowInsertResponse, RowQueryRequest, RowQueryResponse, RowUpdateRequest, RowUpdateResponse, RowDeleteRequest, RowDeleteResponse, UUID } from '../types';
export declare class TableOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Create a new table
     */
    createTable(request: TableCreateRequest): Promise<Table>;
    /**
     * List all tables in a project
     */
    listTables(projectId: UUID): Promise<TableListResponse>;
    /**
     * Get table details
     */
    getTable(projectId: UUID, tableName: string): Promise<TableDetailsResponse>;
    /**
     * Delete a table
     */
    deleteTable(request: TableDeleteRequest): Promise<TableDeleteResponse>;
    /**
     * Insert rows into a table
     */
    insertRows(request: RowInsertRequest): Promise<RowInsertResponse>;
    /**
     * Query rows from a table
     */
    queryRows(request: RowQueryRequest): Promise<RowQueryResponse>;
    /**
     * Update rows in a table
     */
    updateRows(request: RowUpdateRequest): Promise<RowUpdateResponse>;
    /**
     * Delete rows from a table
     */
    deleteRows(request: RowDeleteRequest): Promise<RowDeleteResponse>;
}
//# sourceMappingURL=tables.d.ts.map