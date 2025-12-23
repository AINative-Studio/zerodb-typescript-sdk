/**
 * Vector Operations Examples
 *
 * This example demonstrates how to use vector operations with the ZeroDB client
 */

import { ZeroDBClient } from '../src';

async function main() {
  // Initialize client
  const client = new ZeroDBClient({
    apiKey: 'ZERODB_your_api_key',
    baseURL: 'https://api.ainative.studio'
  });

  const projectId = 'your-project-uuid';

  // Example 1: Upsert a single vector
  console.log('Example 1: Upsert a single vector');
  const embedding = new Array(1536).fill(0).map(() => Math.random());

  const upsertResult = await client.vectors.upsert({
    project_id: projectId,
    embedding: embedding,
    document: 'This is a sample document about machine learning',
    namespace: 'documents',
    metadata: {
      source: 'api',
      type: 'article',
      category: 'technology'
    }
  });
  console.log('Vector ID:', upsertResult.vector_id);

  // Example 2: Batch upsert multiple vectors
  console.log('\nExample 2: Batch upsert multiple vectors');
  const batchResult = await client.vectors.batchUpsert({
    project_id: projectId,
    namespace: 'documents',
    vectors: [
      {
        embedding: new Array(1536).fill(0).map(() => Math.random()),
        document: 'Document about artificial intelligence',
        metadata: { category: 'AI' }
      },
      {
        embedding: new Array(1536).fill(0).map(() => Math.random()),
        document: 'Document about deep learning',
        metadata: { category: 'ML' }
      },
      {
        embedding: new Array(1536).fill(0).map(() => Math.random()),
        document: 'Document about neural networks',
        metadata: { category: 'NN' }
      }
    ]
  });
  console.log('Inserted vectors:', batchResult.vector_ids);
  console.log('Success count:', batchResult.success_count);

  // Example 3: Search vectors
  console.log('\nExample 3: Search vectors');
  const queryEmbedding = new Array(1536).fill(0).map(() => Math.random());

  const searchResults = await client.vectors.search({
    project_id: projectId,
    query_vector: queryEmbedding,
    limit: 5,
    threshold: 0.7,
    namespace: 'documents',
    metadata_filter: {
      category: 'technology'
    }
  });

  console.log(`Found ${searchResults.total_count} results in ${searchResults.search_time_ms}ms`);
  searchResults.vectors.forEach((vector, index) => {
    console.log(`${index + 1}. ${vector.document.substring(0, 50)}...`);
    console.log(`   Metadata:`, vector.vector_metadata);
  });

  // Example 4: Get a specific vector
  console.log('\nExample 4: Get a specific vector');
  const vector = await client.vectors.get(projectId, upsertResult.vector_id);
  console.log('Vector document:', vector.document);
  console.log('Vector metadata:', vector.vector_metadata);

  // Example 5: List vectors
  console.log('\nExample 5: List vectors');
  const vectors = await client.vectors.list({
    project_id: projectId,
    namespace: 'documents',
    limit: 10
  });
  console.log(`Total vectors: ${vectors.length}`);

  // Example 6: Get vector statistics
  console.log('\nExample 6: Get vector statistics');
  const stats = await client.vectors.stats(projectId);
  console.log('Total vectors:', stats.total_vectors);
  console.log('Storage used:', stats.storage_bytes, 'bytes');
  console.log('Namespaces:');
  stats.namespaces.forEach(ns => {
    console.log(`  - ${ns.namespace}: ${ns.count} vectors`);
  });

  // Example 7: Create vector index for faster search
  console.log('\nExample 7: Create vector index');
  const indexResult = await client.vectors.createIndex({
    project_id: projectId,
    namespace: 'documents',
    index_type: 'HNSW'
  });
  console.log('Index ID:', indexResult.index_id);
  console.log('Status:', indexResult.status);

  // Example 8: Optimize vector storage
  console.log('\nExample 8: Optimize vector storage');
  const optimizeResult = await client.vectors.optimize({
    project_id: projectId,
    strategy: 'compression'
  });
  console.log('Optimized vectors:', optimizeResult.optimized_vectors);
  console.log('Storage saved:', optimizeResult.storage_saved_bytes, 'bytes');

  // Example 9: Export vectors
  console.log('\nExample 9: Export vectors');
  const exportResult = await client.vectors.export({
    project_id: projectId,
    namespace: 'documents',
    format: 'json'
  });
  console.log('Download URL:', exportResult.download_url);
  console.log('Vector count:', exportResult.vector_count);

  // Example 10: Delete a vector
  console.log('\nExample 10: Delete a vector');
  const deleteResult = await client.vectors.delete(projectId, upsertResult.vector_id);
  console.log('Deleted:', deleteResult.deleted);
}

// Error handling example
async function errorHandlingExample() {
  const client = new ZeroDBClient({
    apiKey: 'ZERODB_your_api_key'
  });

  try {
    await client.vectors.search({
      project_id: 'invalid-uuid',
      query_vector: new Array(1536).fill(0),
      limit: 10
    });
  } catch (error) {
    if (error instanceof ZeroDBClient.ValidationError) {
      console.error('Validation error:', error.message);
      console.error('Errors:', error.errors);
    } else if (error instanceof ZeroDBClient.AuthenticationError) {
      console.error('Authentication failed:', error.message);
    } else if (error instanceof ZeroDBClient.RateLimitError) {
      console.error('Rate limited. Retry after:', error.retryAfter, 'seconds');
    } else {
      console.error('Error:', error);
    }
  }
}

// Run examples
if (require.main === module) {
  main()
    .then(() => console.log('\nAll examples completed successfully'))
    .catch(error => console.error('Error running examples:', error));
}
