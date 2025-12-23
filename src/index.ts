/**
 * ZeroDB MCP Client
 *
 * Production-ready TypeScript/JavaScript client for ZeroDB MCP Bridge
 *
 * @example
 * ```typescript
 * import { ZeroDBClient } from '@zerodb/mcp-client';
 *
 * const client = new ZeroDBClient({
 *   apiKey: 'ZERODB_your_api_key'
 * });
 *
 * // Search vectors
 * const results = await client.vectors.search({
 *   project_id: 'project-uuid',
 *   query_vector: embedding,
 *   limit: 10
 * });
 * ```
 */

// Export main client
import { ZeroDBClient } from './client';
export { ZeroDBClient };

// Export all types
export * from './types';

// Export errors
export * from './errors';

// Export utilities
export * from './utils';

// Export operation classes (for advanced usage)
export { VectorOperations } from './operations/vectors';
export { QuantumOperations } from './operations/quantum';
export { TableOperations } from './operations/tables';
export { FileOperations } from './operations/files';
export { EventOperations } from './operations/events';
export { ProjectOperations } from './operations/projects';
export { RLHFOperations } from './operations/rlhf';
export { AdminOperations } from './operations/admin';

// Export agent operation classes
export { AgentOrchestrationOperations } from './operations/agent_orchestration';
export { AgentCoordinationOperations } from './operations/agent_coordination';
export { AgentLearningOperations } from './operations/agent_learning';
export { AgentStateOperations } from './operations/agent_state';
export { AgentSwarmOperations } from './operations/agent_swarm';

// Default export
export default ZeroDBClient;
