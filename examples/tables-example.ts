/**
 * Table/NoSQL Operations Examples
 */

import { ZeroDBClient } from '../src';

async function main() {
  const client = new ZeroDBClient({
    apiKey: 'ZERODB_your_api_key'
  });

  const projectId = 'your-project-uuid';

  // Example 1: Create a table
  console.log('Example 1: Create a table');
  const table = await client.tables.createTable({
    project_id: projectId,
    table_name: 'users',
    schema: {
      name: { type: 'string', nullable: false },
      email: { type: 'string', nullable: false },
      age: { type: 'number', nullable: true },
      is_active: { type: 'boolean', default: true },
      metadata: { type: 'object', nullable: true }
    }
  });
  console.log('Created table:', table.table_name);

  // Example 2: Insert rows
  console.log('\nExample 2: Insert rows');
  const insertResult = await client.tables.insertRows({
    project_id: projectId,
    table_name: 'users',
    rows: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        is_active: true,
        metadata: { role: 'admin' }
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 28,
        is_active: true,
        metadata: { role: 'user' }
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        age: 35,
        is_active: false,
        metadata: { role: 'user' }
      }
    ]
  });
  console.log('Inserted rows:', insertResult.inserted_count);

  // Example 3: Query rows
  console.log('\nExample 3: Query rows');
  const queryResult = await client.tables.queryRows({
    project_id: projectId,
    table_name: 'users',
    filters: {
      is_active: true
    },
    limit: 10,
    order_by: 'age'
  });
  console.log(`Found ${queryResult.total_count} active users`);
  queryResult.rows.forEach(row => {
    console.log(`- ${row.row_data.name} (${row.row_data.email})`);
  });

  // Example 4: Update rows
  console.log('\nExample 4: Update rows');
  const updateResult = await client.tables.updateRows({
    project_id: projectId,
    table_name: 'users',
    filters: {
      email: 'john@example.com'
    },
    updates: {
      age: 31,
      'metadata.last_login': new Date().toISOString()
    }
  });
  console.log('Updated rows:', updateResult.updated_count);

  // Example 5: List all tables
  console.log('\nExample 5: List all tables');
  const tablesResult = await client.tables.listTables(projectId);
  console.log('Tables:');
  tablesResult.tables.forEach(t => {
    console.log(`- ${t.table_name}: ${t.row_count} rows`);
  });

  // Example 6: Get table details
  console.log('\nExample 6: Get table details');
  const tableDetails = await client.tables.getTable(projectId, 'users');
  console.log('Table:', tableDetails.table.table_name);
  console.log('Row count:', tableDetails.table.row_count);
  console.log('Storage:', tableDetails.table.storage_bytes, 'bytes');

  // Example 7: Delete rows
  console.log('\nExample 7: Delete rows');
  const deleteRowsResult = await client.tables.deleteRows({
    project_id: projectId,
    table_name: 'users',
    filters: {
      is_active: false
    },
    confirm: true
  });
  console.log('Deleted rows:', deleteRowsResult.deleted_count);

  // Example 8: Delete table
  console.log('\nExample 8: Delete table');
  const deleteTableResult = await client.tables.deleteTable({
    project_id: projectId,
    table_name: 'users',
    confirm: true
  });
  console.log('Table deleted:', deleteTableResult.status);
  console.log('Rows deleted:', deleteTableResult.rows_deleted);
}

if (require.main === module) {
  main()
    .then(() => console.log('\nAll examples completed'))
    .catch(error => console.error('Error:', error));
}
