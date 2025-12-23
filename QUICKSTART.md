# Quick Start Guide

Get up and running with ZeroDB MCP Client in 5 minutes.

## Installation

```bash
npm install @zerodb/mcp-client
```

## Get Your API Key

1. Sign up at https://ainative.studio
2. Create a project
3. Generate an API key from the dashboard

## Basic Usage

### 1. Initialize the Client

```typescript
import { ZeroDBClient } from '@zerodb/mcp-client';

const client = new ZeroDBClient({
  apiKey: 'ZERODB_your_api_key'
});
```

### 2. Store Your First Vector

```typescript
// Generate or get an embedding (1536 dimensions for OpenAI)
const embedding = await getEmbeddingFromOpenAI('Hello world');

// Store it
const result = await client.vectors.upsert({
  project_id: 'your-project-uuid',
  embedding: embedding,
  document: 'Hello world',
  metadata: { source: 'test' }
});

console.log('Vector ID:', result.vector_id);
```

### 3. Search for Similar Vectors

```typescript
// Get query embedding
const queryEmbedding = await getEmbeddingFromOpenAI('greeting');

// Search
const results = await client.vectors.search({
  project_id: 'your-project-uuid',
  query_vector: queryEmbedding,
  limit: 5
});

results.vectors.forEach(vector => {
  console.log(vector.document);
});
```

## Common Use Cases

### Semantic Search

```typescript
async function semanticSearch(query: string) {
  // 1. Get query embedding
  const embedding = await getEmbedding(query);

  // 2. Search similar vectors
  const results = await client.vectors.search({
    project_id: PROJECT_ID,
    query_vector: embedding,
    limit: 10,
    threshold: 0.7
  });

  // 3. Return documents
  return results.vectors.map(v => v.document);
}
```

### RAG (Retrieval Augmented Generation)

```typescript
async function ragQuery(question: string) {
  // 1. Search for relevant context
  const queryEmbedding = await getEmbedding(question);
  const results = await client.vectors.search({
    project_id: PROJECT_ID,
    query_vector: queryEmbedding,
    limit: 3
  });

  // 2. Combine context
  const context = results.vectors
    .map(v => v.document)
    .join('\n\n');

  // 3. Send to LLM with context
  const answer = await callLLM({
    system: 'Answer based on this context: ' + context,
    user: question
  });

  return answer;
}
```

### Document Storage with Metadata

```typescript
async function storeDocuments(documents: Array<{text: string, metadata: any}>) {
  // Prepare vectors
  const vectors = await Promise.all(
    documents.map(async doc => ({
      embedding: await getEmbedding(doc.text),
      document: doc.text,
      metadata: doc.metadata
    }))
  );

  // Batch insert
  const result = await client.vectors.batchUpsert({
    project_id: PROJECT_ID,
    namespace: 'documents',
    vectors: vectors
  });

  return result.vector_ids;
}
```

### NoSQL Database

```typescript
// Create a table
await client.tables.createTable({
  project_id: PROJECT_ID,
  table_name: 'users',
  schema: {
    email: { type: 'string', nullable: false },
    name: { type: 'string' },
    age: { type: 'number' }
  }
});

// Insert data
await client.tables.insertRows({
  project_id: PROJECT_ID,
  table_name: 'users',
  rows: [
    { email: 'user@example.com', name: 'John', age: 30 }
  ]
});

// Query data
const users = await client.tables.queryRows({
  project_id: PROJECT_ID,
  table_name: 'users',
  filters: { age: { $gte: 25 } }
});
```

## Error Handling

```typescript
import { RateLimitError, ValidationError } from '@zerodb/mcp-client';

try {
  await client.vectors.search({...});
} catch (error) {
  if (error instanceof RateLimitError) {
    // Wait and retry
    await sleep(error.retryAfter * 1000);
    // Retry...
  } else if (error instanceof ValidationError) {
    console.error('Invalid input:', error.errors);
  } else {
    console.error('Error:', error.message);
  }
}
```

## Next.js Integration

```typescript
// app/api/search/route.ts
import { ZeroDBClient } from '@zerodb/mcp-client';

const client = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY!
});

export async function POST(request: Request) {
  const { query } = await request.json();

  const embedding = await getEmbedding(query);

  const results = await client.vectors.search({
    project_id: process.env.ZERODB_PROJECT_ID!,
    query_vector: embedding,
    limit: 10
  });

  return Response.json(results);
}
```

## React Hook

```typescript
import { ZeroDBClient } from '@zerodb/mcp-client';
import { useState, useEffect } from 'react';

const client = new ZeroDBClient({
  apiKey: process.env.REACT_APP_ZERODB_API_KEY
});

export function useVectorSearch(query: string) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    getEmbedding(query)
      .then(embedding => client.vectors.search({
        project_id: process.env.REACT_APP_PROJECT_ID,
        query_vector: embedding,
        limit: 10
      }))
      .then(res => setResults(res.vectors))
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading };
}
```

## Best Practices

1. **Reuse Client**: Create one client instance and reuse it
2. **Environment Variables**: Store API keys in env variables
3. **Error Handling**: Always wrap calls in try-catch
4. **Batch Operations**: Use batch methods for multiple operations
5. **Namespaces**: Organize vectors with namespaces
6. **Metadata**: Add searchable metadata to vectors
7. **Indexes**: Create indexes for large datasets
8. **Validation**: Validate embeddings before upserting

## Environment Variables

Create a `.env` file:

```bash
ZERODB_API_KEY=ZERODB_your_api_key
ZERODB_PROJECT_ID=your-project-uuid
ZERODB_BASE_URL=https://api.ainative.studio
```

Load in your app:

```typescript
import dotenv from 'dotenv';
dotenv.config();

const client = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY
});
```

## Need Help?

- [Full Documentation](README.md)
- [API Reference](README.md#api-reference)
- [Examples](examples/)
- [Support](mailto:support@ainative.studio)
