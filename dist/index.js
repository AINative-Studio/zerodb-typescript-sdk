"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSwarmOperations = exports.AgentStateOperations = exports.AgentLearningOperations = exports.AgentCoordinationOperations = exports.AgentOrchestrationOperations = exports.AdminOperations = exports.RLHFOperations = exports.ProjectOperations = exports.EventOperations = exports.FileOperations = exports.TableOperations = exports.QuantumOperations = exports.VectorOperations = exports.ZeroDBClient = void 0;
// Export main client
const client_1 = require("./client");
Object.defineProperty(exports, "ZeroDBClient", { enumerable: true, get: function () { return client_1.ZeroDBClient; } });
// Export all types
__exportStar(require("./types"), exports);
// Export errors
__exportStar(require("./errors"), exports);
// Export utilities
__exportStar(require("./utils"), exports);
// Export operation classes (for advanced usage)
var vectors_1 = require("./operations/vectors");
Object.defineProperty(exports, "VectorOperations", { enumerable: true, get: function () { return vectors_1.VectorOperations; } });
var quantum_1 = require("./operations/quantum");
Object.defineProperty(exports, "QuantumOperations", { enumerable: true, get: function () { return quantum_1.QuantumOperations; } });
var tables_1 = require("./operations/tables");
Object.defineProperty(exports, "TableOperations", { enumerable: true, get: function () { return tables_1.TableOperations; } });
var files_1 = require("./operations/files");
Object.defineProperty(exports, "FileOperations", { enumerable: true, get: function () { return files_1.FileOperations; } });
var events_1 = require("./operations/events");
Object.defineProperty(exports, "EventOperations", { enumerable: true, get: function () { return events_1.EventOperations; } });
var projects_1 = require("./operations/projects");
Object.defineProperty(exports, "ProjectOperations", { enumerable: true, get: function () { return projects_1.ProjectOperations; } });
var rlhf_1 = require("./operations/rlhf");
Object.defineProperty(exports, "RLHFOperations", { enumerable: true, get: function () { return rlhf_1.RLHFOperations; } });
var admin_1 = require("./operations/admin");
Object.defineProperty(exports, "AdminOperations", { enumerable: true, get: function () { return admin_1.AdminOperations; } });
// Export agent operation classes
var agent_orchestration_1 = require("./operations/agent_orchestration");
Object.defineProperty(exports, "AgentOrchestrationOperations", { enumerable: true, get: function () { return agent_orchestration_1.AgentOrchestrationOperations; } });
var agent_coordination_1 = require("./operations/agent_coordination");
Object.defineProperty(exports, "AgentCoordinationOperations", { enumerable: true, get: function () { return agent_coordination_1.AgentCoordinationOperations; } });
var agent_learning_1 = require("./operations/agent_learning");
Object.defineProperty(exports, "AgentLearningOperations", { enumerable: true, get: function () { return agent_learning_1.AgentLearningOperations; } });
var agent_state_1 = require("./operations/agent_state");
Object.defineProperty(exports, "AgentStateOperations", { enumerable: true, get: function () { return agent_state_1.AgentStateOperations; } });
var agent_swarm_1 = require("./operations/agent_swarm");
Object.defineProperty(exports, "AgentSwarmOperations", { enumerable: true, get: function () { return agent_swarm_1.AgentSwarmOperations; } });
// Default export
exports.default = client_1.ZeroDBClient;
