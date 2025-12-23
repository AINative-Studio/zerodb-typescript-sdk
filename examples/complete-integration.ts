/**
 * Complete Integration Example
 *
 * This example demonstrates a complete RAG (Retrieval Augmented Generation) system
 * using ZeroDB for semantic search and document storage.
 */

import { ZeroDBClient } from '../src';
import * as fs from 'fs';

// Initialize client
const client = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY || 'ZERODB_your_api_key',
  baseURL: process.env.ZERODB_BASE_URL || 'https://api.ainative.studio'
});

const PROJECT_ID = process.env.ZERODB_PROJECT_ID || 'your-project-uuid';

/**
 * Mock function to get embeddings from OpenAI
 * In production, replace with actual OpenAI API call
 */
async function getEmbedding(text: string): Promise<number[]> {
  // Mock: Return random embedding
  // In production: Call OpenAI embeddings API
  return new Array(1536).fill(0).map(() => Math.random());
}

/**
 * Step 1: Initialize the knowledge base
 */
async function initializeKnowledgeBase() {
  console.log('Initializing knowledge base...\n');

  // Create a table for document metadata
  try {
    await client.tables.createTable({
      project_id: PROJECT_ID,
      table_name: 'documents',
      schema: {
        title: { type: 'string', nullable: false },
        author: { type: 'string' },
        category: { type: 'string' },
        published_date: { type: 'string' },
        url: { type: 'string' }
      }
    });
    console.log('✓ Created documents table');
  } catch (error) {
    console.log('ℹ Documents table already exists');
  }

  // Sample documents
  const documents = [
    {
      title: 'Introduction to Machine Learning',
      content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
      author: 'Dr. Jane Smith',
      category: 'AI/ML',
      url: 'https://example.com/ml-intro'
    },
    {
      title: 'Deep Learning Fundamentals',
      content: 'Deep learning uses artificial neural networks with multiple layers to progressively extract higher-level features from raw input.',
      author: 'Prof. John Doe',
      category: 'AI/ML',
      url: 'https://example.com/dl-fundamentals'
    },
    {
      title: 'Natural Language Processing',
      content: 'NLP is a branch of AI that helps computers understand, interpret and manipulate human language.',
      author: 'Dr. Jane Smith',
      category: 'NLP',
      url: 'https://example.com/nlp'
    }
  ];

  // Store document metadata
  await client.tables.insertRows({
    project_id: PROJECT_ID,
    table_name: 'documents',
    rows: documents.map(doc => ({
      title: doc.title,
      author: doc.author,
      category: doc.category,
      published_date: new Date().toISOString(),
      url: doc.url
    }))
  });
  console.log('✓ Stored document metadata\n');

  // Generate embeddings and store vectors
  const vectors = await Promise.all(
    documents.map(async (doc) => ({
      embedding: await getEmbedding(doc.content),
      document: doc.content,
      metadata: {
        title: doc.title,
        author: doc.author,
        category: doc.category,
        url: doc.url
      }
    }))
  );

  const result = await client.vectors.batchUpsert({
    project_id: PROJECT_ID,
    namespace: 'knowledge_base',
    vectors: vectors
  });

  console.log(`✓ Stored ${result.success_count} vectors\n`);
  return result.vector_ids;
}

/**
 * Step 2: Semantic Search
 */
async function semanticSearch(query: string, limit: number = 3) {
  console.log(`Searching for: "${query}"\n`);

  // Get query embedding
  const queryEmbedding = await getEmbedding(query);

  // Search similar vectors
  const results = await client.vectors.search({
    project_id: PROJECT_ID,
    query_vector: queryEmbedding,
    namespace: 'knowledge_base',
    limit: limit,
    threshold: 0.5
  });

  console.log(`Found ${results.total_count} results in ${results.search_time_ms}ms:\n`);

  results.vectors.forEach((vector, index) => {
    console.log(`${index + 1}. ${vector.vector_metadata?.title}`);
    console.log(`   Author: ${vector.vector_metadata?.author}`);
    console.log(`   Content: ${vector.document.substring(0, 80)}...`);
    console.log('');
  });

  return results.vectors;
}

/**
 * Step 3: RAG Query
 */
async function ragQuery(question: string) {
  console.log(`Question: "${question}"\n`);

  // 1. Search for relevant context
  const queryEmbedding = await getEmbedding(question);
  const searchResults = await client.vectors.search({
    project_id: PROJECT_ID,
    query_vector: queryEmbedding,
    namespace: 'knowledge_base',
    limit: 3,
    threshold: 0.5
  });

  // 2. Combine context
  const context = searchResults.vectors
    .map(v => `${v.vector_metadata?.title}: ${v.document}`)
    .join('\n\n');

  console.log('Retrieved context from:');
  searchResults.vectors.forEach(v => {
    console.log(`- ${v.vector_metadata?.title}`);
  });
  console.log('');

  // 3. In production, send to LLM with context
  // const answer = await callLLM({ system: context, user: question });
  console.log('Context for LLM:');
  console.log(context);
  console.log('\n(In production, this would be sent to an LLM for generation)\n');

  return { context, sources: searchResults.vectors };
}

/**
 * Step 4: Log interactions for RLHF
 */
async function logInteraction(sessionId: string, query: string, helpful: boolean) {
  // Log the search interaction
  await client.rlhf.collectInteraction({
    type: 'search',
    session_id: sessionId,
    element_clicked: 'search_button',
    page_url: '/search',
    additional_data: {
      query: query,
      timestamp: new Date().toISOString()
    }
  });

  // Log user feedback
  await client.rlhf.collectAgentFeedback({
    project_id: PROJECT_ID,
    agent_type: 'rag_search',
    agent_response_id: sessionId,
    user_rating: helpful ? 5 : 2,
    feedback_text: helpful ? 'Very helpful results' : 'Not relevant'
  });

  console.log('✓ Logged interaction for RLHF learning\n');
}

/**
 * Step 5: Track usage and performance
 */
async function trackAnalytics() {
  // Get vector statistics
  const vectorStats = await client.vectors.stats(PROJECT_ID);
  console.log('Vector Statistics:');
  console.log(`- Total vectors: ${vectorStats.total_vectors}`);
  console.log(`- Storage used: ${(vectorStats.storage_bytes / 1024).toFixed(2)} KB`);
  console.log('- Namespaces:');
  vectorStats.namespaces.forEach(ns => {
    console.log(`  * ${ns.namespace}: ${ns.count} vectors`);
  });
  console.log('');

  // Get project statistics
  const projectStats = await client.projects.stats({
    project_id: PROJECT_ID
  });
  console.log('Project Statistics:');
  console.log(`- Vectors: ${projectStats.counts.vectors}`);
  console.log(`- Tables: ${projectStats.counts.tables}`);
  console.log(`- Files: ${projectStats.counts.files}`);
  console.log(`- API calls (24h): ${projectStats.usage.api_calls_24h}`);
  console.log(`- Avg query time: ${projectStats.performance.avg_query_time_ms}ms`);
  console.log('');
}

/**
 * Step 6: Export data for backup
 */
async function exportData() {
  console.log('Exporting data...\n');

  // Export vectors
  const exportResult = await client.vectors.export({
    project_id: PROJECT_ID,
    namespace: 'knowledge_base',
    format: 'json'
  });

  console.log('Export Details:');
  console.log(`- Download URL: ${exportResult.download_url}`);
  console.log(`- Vector count: ${exportResult.vector_count}`);
  console.log(`- File size: ${(exportResult.file_size_bytes / 1024).toFixed(2)} KB`);
  console.log('');
}

/**
 * Main execution flow
 */
async function main() {
  try {
    console.log('='.repeat(60));
    console.log('ZeroDB Complete Integration Example');
    console.log('='.repeat(60));
    console.log('');

    // Step 1: Initialize
    await initializeKnowledgeBase();

    // Step 2: Search
    await semanticSearch('What is machine learning?');

    // Step 3: RAG Query
    await ragQuery('How do neural networks work in deep learning?');

    // Step 4: Log interaction
    const sessionId = 'session-' + Date.now();
    await logInteraction(sessionId, 'machine learning', true);

    // Step 5: Analytics
    await trackAnalytics();

    // Step 6: Export
    await exportData();

    console.log('='.repeat(60));
    console.log('Integration example completed successfully!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
}

export {
  initializeKnowledgeBase,
  semanticSearch,
  ragQuery,
  logInteraction,
  trackAnalytics,
  exportData
};
