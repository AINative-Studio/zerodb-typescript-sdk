# ZeroDB MCP Client

Production-ready TypeScript/JavaScript client for the ZeroDB MCP Bridge API. Provides type-safe access to all ZeroDB capabilities including vector search, quantum operations, NoSQL tables, file storage, events, and more.

[![npm version](https://badge.fury.io/js/%40zerodb%2Fmcp-client.svg)](https://www.npmjs.com/package/@zerodb/mcp-client)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Complete API Coverage**: All 60+ ZeroDB operations supported
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Custom error classes with detailed error information
- **Retry Logic**: Built-in exponential backoff for transient failures
- **Authentication**: Support for both API keys and JWT tokens
- **Rate Limiting**: Automatic rate limit handling with retry-after support
- **Validation**: Input validation for vectors, UUIDs, and other data
- **Framework Support**: Works with Node.js, React, Next.js, and other frameworks

## Installation

```bash
npm install @zerodb/mcp-client
```

Or with yarn:

```bash
yarn add @zerodb/mcp-client
```

## Quick Start

```typescript
import { ZeroDBClient } from '@zerodb/mcp-client';

// Initialize the client
const client = new ZeroDBClient({
  apiKey: 'ZERODB_your_api_key',
  baseURL: 'https://api.ainative.studio' // optional
});

// Search vectors
const results = await client.vectors.search({
  project_id: 'your-project-uuid',
  query_vector: embedding, // 1536-dimensional array
  limit: 10,
  threshold: 0.7
});

console.log(`Found ${results.total_count} results`);
```

## Authentication

The client supports two authentication methods:

### API Key Authentication

```typescript
const client = new ZeroDBClient({
  apiKey: 'ZERODB_your_api_key'
});
```

### JWT Token Authentication

```typescript
const client = new ZeroDBClient({
  jwtToken: 'your_jwt_token'
});
```

### Updating Authentication

```typescript
// Switch to JWT
client.setAuthToken('new_jwt_token', 'jwt');

// Switch to API key
client.setAuthToken('ZERODB_new_api_key', 'apiKey');
```

## Configuration Options

```typescript
const client = new ZeroDBClient({
  apiKey: 'ZERODB_your_api_key',      // API key (or use jwtToken)
  jwtToken: 'your_jwt_token',         // JWT token (alternative to apiKey)
  baseURL: 'https://api.ainative.studio', // API base URL (optional)
  timeout: 30000,                     // Request timeout in ms (default: 30000)
  retryAttempts: 3,                   // Number of retry attempts (default: 3)
  retryDelay: 1000                    // Initial retry delay in ms (default: 1000)
});
```

## API Reference

### Vector Operations

#### Upsert a Vector

```typescript
const result = await client.vectors.upsert({
  project_id: 'project-uuid',
  embedding: [0.1, 0.2, ...], // 1536 dimensions
  document: 'This is a sample document',
  namespace: 'default',
  metadata: {
    source: 'api',
    type: 'article',
    tags: ['technology', 'ai']
  }
});
// Returns: { vector_id: string, status: string }
```

#### Batch Upsert Vectors

```typescript
const result = await client.vectors.batchUpsert({
  project_id: 'project-uuid',
  namespace: 'documents',
  vectors: [
    {
      embedding: [...],
      document: 'Document 1',
      metadata: { ... }
    },
    {
      embedding: [...],
      document: 'Document 2',
      metadata: { ... }
    }
  ]
});
// Returns: { vector_ids: string[], success_count: number, error_count: number }
```

#### Search Vectors

```typescript
const results = await client.vectors.search({
  project_id: 'project-uuid',
  query_vector: [...], // 1536 dimensions
  limit: 10,
  threshold: 0.7,
  namespace: 'default',
  metadata_filter: {
    category: 'technology'
  }
});
// Returns: { vectors: Vector[], total_count: number, search_time_ms: number }
```

#### Delete a Vector

```typescript
const result = await client.vectors.delete('project-uuid', 'vector-id');
// Returns: { status: string, deleted: boolean }
```

#### Get Vector by ID

```typescript
const vector = await client.vectors.get('project-uuid', 'vector-id');
// Returns: Vector object with all fields
```

#### List Vectors

```typescript
const vectors = await client.vectors.list({
  project_id: 'project-uuid',
  namespace: 'default',
  limit: 100,
  offset: 0
});
// Returns: Vector[]
```

#### Vector Statistics

```typescript
const stats = await client.vectors.stats('project-uuid');
// Returns: {
//   total_vectors: number,
//   namespaces: Array<{ namespace: string, count: number }>,
//   storage_bytes: number,
//   avg_vector_size: number
// }
```

#### Create Vector Index

```typescript
const index = await client.vectors.createIndex({
  project_id: 'project-uuid',
  namespace: 'default',
  index_type: 'HNSW' // or 'IVF' or 'FLAT'
});
// Returns: { index_id: string, estimated_build_time_seconds: number, status: string }
```

#### Optimize Vector Storage

```typescript
const result = await client.vectors.optimize({
  project_id: 'project-uuid',
  strategy: 'compression' // or 'deduplication' or 'clustering'
});
// Returns: { optimized_vectors: number, storage_saved_bytes: number, optimization_time_ms: number }
```

#### Export Vectors

```typescript
const result = await client.vectors.export({
  project_id: 'project-uuid',
  namespace: 'default',
  format: 'json' // or 'csv' or 'parquet'
});
// Returns: { download_url: string, vector_count: number, file_size_bytes: number }
```

### Quantum Operations

#### Compress Vector

```typescript
const result = await client.quantum.compress({
  project_id: 'project-uuid',
  embedding: [...],
  compression_ratio: 0.6,
  preserve_semantics: true
});
// Returns: { compressed_embedding: number[], compression_achieved: number }
```

#### Decompress Vector

```typescript
const result = await client.quantum.decompress({
  project_id: 'project-uuid',
  compressed_embedding: [...]
});
// Returns: { embedding: number[], quality_score: number }
```

#### Hybrid Similarity

```typescript
const result = await client.quantum.hybridSimilarity({
  project_id: 'project-uuid',
  query_vector: [...],
  candidate_vector: [...],
  metadata_boost: { relevance: 0.8 }
});
// Returns: { similarity_score: number, cosine_component: number, quantum_component: number }
```

### Table Operations

#### Create Table

```typescript
const table = await client.tables.createTable({
  project_id: 'project-uuid',
  table_name: 'users',
  schema: {
    name: { type: 'string', nullable: false },
    email: { type: 'string', nullable: false },
    age: { type: 'number', nullable: true }
  }
});
```

#### Insert Rows

```typescript
const result = await client.tables.insertRows({
  project_id: 'project-uuid',
  table_name: 'users',
  rows: [
    { name: 'John', email: 'john@example.com', age: 30 },
    { name: 'Jane', email: 'jane@example.com', age: 28 }
  ]
});
```

#### Query Rows

```typescript
const result = await client.tables.queryRows({
  project_id: 'project-uuid',
  table_name: 'users',
  filters: { age: { $gte: 25 } },
  limit: 10,
  order_by: 'name'
});
```

#### Update Rows

```typescript
const result = await client.tables.updateRows({
  project_id: 'project-uuid',
  table_name: 'users',
  filters: { email: 'john@example.com' },
  updates: { age: 31 }
});
```

#### Delete Rows

```typescript
const result = await client.tables.deleteRows({
  project_id: 'project-uuid',
  table_name: 'users',
  filters: { age: { $lt: 18 } },
  confirm: true
});
```

### File Operations

#### Upload File

```typescript
const result = await client.files.uploadBuffer(
  'project-uuid',
  'document.pdf',
  fileBuffer,
  'application/pdf',
  { author: 'John Doe' }
);
```

#### Download File

```typescript
const result = await client.files.download({
  project_id: 'project-uuid',
  file_id: 'file-uuid'
});
const content = Buffer.from(result.file_data, 'base64');
```

#### List Files

```typescript
const result = await client.files.list({
  project_id: 'project-uuid',
  prefix: 'documents/',
  limit: 50
});
```

#### Delete File

```typescript
const result = await client.files.delete({
  project_id: 'project-uuid',
  file_id: 'file-uuid'
});
```

### Event Operations

#### Create Event

```typescript
const result = await client.events.create({
  project_id: 'project-uuid',
  event_type: 'user.signup',
  topic: 'users',
  payload: { user_id: '123', email: 'user@example.com' },
  source: 'web-app'
});
```

#### List Events

```typescript
const result = await client.events.list({
  project_id: 'project-uuid',
  topic: 'users',
  limit: 100
});
```

#### Subscribe to Events

```typescript
const result = await client.events.subscribe({
  project_id: 'project-uuid',
  topic: 'users',
  webhook_url: 'https://myapp.com/webhooks/events'
});
```

### Project Operations

#### Create Project

```typescript
const project = await client.projects.create({
  name: 'My Project',
  description: 'Project description',
  tier: 'pro'
});
```

#### List Projects

```typescript
const result = await client.projects.list();
```

#### Get Project Stats

```typescript
const stats = await client.projects.stats({
  project_id: 'project-uuid'
});
```

#### Delete Project

```typescript
const result = await client.projects.delete({
  project_id: 'project-uuid',
  confirm: true
});
```

### RLHF Operations

#### Collect Interaction

```typescript
const result = await client.rlhf.collectInteraction({
  type: 'click',
  session_id: 'session-uuid',
  element_clicked: 'search-button',
  page_url: '/search'
});
```

#### Collect Agent Feedback

```typescript
const result = await client.rlhf.collectAgentFeedback({
  project_id: 'project-uuid',
  agent_type: 'search-agent',
  agent_response_id: 'response-uuid',
  user_rating: 5,
  feedback_text: 'Very helpful response'
});
```

### Admin Operations (Admin Only)

#### System Stats

```typescript
const stats = await client.admin.getSystemStats();
```

#### System Health

```typescript
const health = await client.admin.getSystemHealth();
```

## Error Handling

The client provides custom error classes for different error scenarios:

```typescript
import {
  ZeroDBError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  ValidationError,
  NotFoundError,
  NetworkError,
  TimeoutError
} from '@zerodb/mcp-client';

try {
  await client.vectors.search({
    project_id: 'invalid-uuid',
    query_vector: embedding,
    limit: 10
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
    console.error('Field errors:', error.errors);
  } else if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter);
  } else if (error instanceof NotFoundError) {
    console.error('Resource not found:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Framework Integration

### React / Next.js

```typescript
import { ZeroDBClient } from '@zerodb/mcp-client';
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [results, setResults] = useState([]);
  const client = new ZeroDBClient({ apiKey: process.env.ZERODB_API_KEY });

  const search = async (query: string) => {
    const embedding = await getEmbedding(query); // Your embedding function

    const results = await client.vectors.search({
      project_id: process.env.ZERODB_PROJECT_ID,
      query_vector: embedding,
      limit: 10
    });

    setResults(results.vectors);
  };

  return (
    <div>
      <input onChange={(e) => search(e.target.value)} />
      {results.map(result => (
        <div key={result.vector_id}>{result.document}</div>
      ))}
    </div>
  );
}
```

### Node.js Backend

```typescript
import express from 'express';
import { ZeroDBClient } from '@zerodb/mcp-client';

const app = express();
const client = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY
});

app.post('/api/search', async (req, res) => {
  try {
    const { query, projectId } = req.body;

    const results = await client.vectors.search({
      project_id: projectId,
      query_vector: query,
      limit: 10
    });

    res.json(results);
  } catch (error) {
    if (error instanceof RateLimitError) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(3000);
```

## Best Practices

### 1. Reuse Client Instances

Create a single client instance and reuse it across your application:

```typescript
// lib/zerodb.ts
import { ZeroDBClient } from '@zerodb/mcp-client';

export const zerodbClient = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY
});
```

### 2. Handle Rate Limits

```typescript
async function searchWithRetry(query: any, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.vectors.search(query);
    } catch (error) {
      if (error instanceof RateLimitError && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

### 3. Validate Embeddings

```typescript
import { validateEmbedding } from '@zerodb/mcp-client';

try {
  validateEmbedding(myEmbedding, 1536);
} catch (error) {
  console.error('Invalid embedding:', error.message);
}
```

### 4. Use TypeScript

Take advantage of full type safety:

```typescript
import { VectorSearchRequest, VectorSearchResult } from '@zerodb/mcp-client';

async function typedSearch(
  request: VectorSearchRequest
): Promise<VectorSearchResult> {
  return client.vectors.search(request);
}
```

## Testing

```bash
npm test
```

## Examples

See the `examples/` directory for comprehensive usage examples:

- `vectors-example.ts` - Vector operations
- `tables-example.ts` - Table/NoSQL operations
- `files-example.ts` - File storage operations

## License

MIT

## Support

- Documentation: https://docs.ainative.studio
- Issues: https://github.com/ainative-studio/zerodb-mcp-client/issues
- Email: support@ainative.studio

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.
