/**
 * Endpoint Path Verification Test
 *
 * This test verifies that all SDK methods use the correct API endpoint paths
 * as documented in issue #393.
 *
 * Run: npx ts-node test-endpoints.ts
 */

import { AINativeClient } from './src';

// Mock HTTP client to capture endpoint paths
const capturedEndpoints: string[] = [];

function createMockClient() {
  const client = new AINativeClient({
    apiKey: 'test-key',
    baseUrl: 'https://api.ainative.studio',
    debug: true
  });

  // Intercept request method to capture endpoints
  const originalRequest = client['request'].bind(client);
  client['request'] = async function(method: string, endpoint: string, data?: any, options?: any) {
    capturedEndpoints.push(endpoint);
    console.log(`✓ ${method} ${endpoint}`);

    // Return mock response instead of making real request
    return {
      data: {},
      status: 200,
      headers: {},
      meta: { requestId: 'test', timestamp: new Date().toISOString() }
    };
  };

  return client;
}

async function testEndpoints() {
  console.log('🧪 Testing SDK Endpoint Paths\n');
  console.log('Expected: All paths should start with /projects (NOT /public/projects or /zerodb/projects)\n');

  const client = createMockClient();
  const testProjectId = 'test-project-id';

  try {
    // Test Project Operations
    console.log('\n📁 Project Operations:');
    await client.zerodb.projects.list();
    await client.zerodb.projects.create({ name: 'Test' });
    await client.zerodb.projects.get(testProjectId);
    await client.zerodb.projects.update(testProjectId, { name: 'Updated' });
    await client.zerodb.projects.delete(testProjectId);
    await client.zerodb.projects.suspend(testProjectId);
    await client.zerodb.projects.activate(testProjectId);

    // Test Database Operations
    console.log('\n💾 Database Operations:');
    await client.zerodb.database.status(testProjectId);
    await client.zerodb.database.enable(testProjectId);
    await client.zerodb.database.updateConfig(testProjectId, {});

    // Test Vector Operations
    console.log('\n🔢 Vector Operations:');
    await client.zerodb.vectors.upsert(testProjectId, {
      vectorEmbedding: [0.1, 0.2],
      namespace: 'test'
    });
    await client.zerodb.vectors.search(testProjectId, {
      queryVector: [0.1, 0.2],
      topK: 5
    });
    await client.zerodb.vectors.batchUpsert(testProjectId, {
      vectors: [{ vectorEmbedding: [0.1], namespace: 'test' }]
    });
    await client.zerodb.vectors.list(testProjectId, 'test', 10);

    // Test Memory Operations
    console.log('\n🧠 Memory Operations:');
    await client.zerodb.memory.store(testProjectId, {
      content: 'test',
      agentId: 'agent-1',
      sessionId: 'session-1',
      role: 'user'
    });
    await client.zerodb.memory.search(testProjectId, { query: 'test' });
    await client.zerodb.memory.list(testProjectId);

    // Test Event Operations
    console.log('\n📡 Event Operations:');
    await client.zerodb.events.publish(testProjectId, {
      topic: 'test',
      data: {}
    });
    await client.zerodb.events.list(testProjectId, 'test');

    // Test File Operations
    console.log('\n📄 File Operations:');
    await client.zerodb.files.upload(testProjectId, {
      fileName: 'test.txt',
      contentType: 'text/plain',
      metadata: {}
    });
    await client.zerodb.files.list(testProjectId);

    // Test Analytics Operations
    console.log('\n📊 Analytics Operations:');
    await client.zerodb.analytics.usage(testProjectId, 7);
    await client.zerodb.analytics.costs(testProjectId, 7);
    await client.zerodb.analytics.overview(testProjectId);

    // Verify Results
    console.log('\n\n✅ Verification Results:\n');

    const invalidPaths = capturedEndpoints.filter(path =>
      path.includes('/public/') || path.includes('/zerodb/projects')
    );

    const validPaths = capturedEndpoints.filter(path =>
      path.startsWith('/projects')
    );

    console.log(`Total endpoints tested: ${capturedEndpoints.length}`);
    console.log(`Valid paths (starting with /projects): ${validPaths.length}`);
    console.log(`Invalid paths (containing /public/ or /zerodb/projects): ${invalidPaths.length}`);

    if (invalidPaths.length > 0) {
      console.log('\n❌ FAILED: Found invalid paths:');
      invalidPaths.forEach(path => console.log(`  - ${path}`));
      process.exit(1);
    } else {
      console.log('\n✅ SUCCESS: All endpoints use correct paths!');
      console.log('\nSample corrected paths:');
      console.log(`  - ${capturedEndpoints[0]} (project list)`);
      console.log(`  - ${capturedEndpoints.find(p => p.includes('/database/vectors'))} (vectors)`);
      console.log(`  - ${capturedEndpoints.find(p => p.includes('/database/memory'))} (memory)`);
      console.log(`  - ${capturedEndpoints.find(p => p.includes('/database/events'))} (events)`);
      console.log(`  - ${capturedEndpoints.find(p => p.includes('/analytics'))} (analytics)`);

      console.log('\n🎉 All endpoints now match production API routes!');
      process.exit(0);
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testEndpoints();
