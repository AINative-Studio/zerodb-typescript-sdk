# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-14

### Added
- Initial release of ZeroDB MCP Client
- Complete TypeScript support with full type definitions
- Vector operations (10 methods):
  - upsert, batchUpsert, search, delete, get, list
  - stats, createIndex, optimize, export
- Quantum operations (6 methods):
  - compress, decompress, hybridSimilarity
  - optimizeSpace, featureMap, kernelSimilarity
- Table/NoSQL operations (8 methods):
  - createTable, listTables, getTable, deleteTable
  - insertRows, queryRows, updateRows, deleteRows
- File operations (6 methods):
  - upload, uploadBuffer, download, list, delete
  - getMetadata, generatePresignedUrl
- Event operations (5 methods):
  - create, list, get, subscribe, stats
- Project operations (7 methods):
  - create, get, list, update, delete
  - stats, enableDatabase
- RLHF operations (10 methods):
  - collectInteraction, collectAgentFeedback, collectWorkflowFeedback
  - collectErrorReport, getStatus, getSummary
  - startCollection, stopCollection, getSessionInteractions, broadcastEvent
- Admin operations (5 methods):
  - getSystemStats, listAllProjects, getUserUsage
  - getSystemHealth, optimizeDatabase
- Custom error classes:
  - ZeroDBError, AuthenticationError, AuthorizationError
  - RateLimitError, ValidationError, NotFoundError
  - NetworkError, TimeoutError
- Built-in retry logic with exponential backoff
- Request/response interceptors
- Input validation utilities
- Comprehensive examples
- Complete API documentation

### Features
- Authentication via API key or JWT token
- Automatic rate limit handling
- Type-safe API with IntelliSense support
- Works with Node.js, React, Next.js, and other frameworks
- Production-ready error handling
- Configurable timeouts and retry behavior

### Documentation
- Complete README with API reference
- Usage examples for all operations
- Framework integration guides
- Best practices and patterns
