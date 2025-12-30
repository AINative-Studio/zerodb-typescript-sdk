# Changelog

All notable changes to the AINative TypeScript SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-29

### Breaking Changes

**CRITICAL FIX**: Corrected all API endpoint paths to match production API

All ZeroDB endpoint paths have been updated to match the actual backend API routes. This is a **breaking change** that fixes 404 errors users were experiencing.

#### Changed Endpoints

**Project Operations:**
- ❌ Before: `/public/projects`
- ✅ After: `/projects`

**Database Operations:**
- ❌ Before: `/public/projects/{id}/database`
- ✅ After: `/projects/{id}/database`

**Vector Operations:**
- ❌ Before: `/public/projects/{id}/database/vectors/*`
- ✅ After: `/projects/{id}/database/vectors/*`

**Memory Operations:**
- ❌ Before: `/public/projects/{id}/database/memory/*`
- ✅ After: `/projects/{id}/database/memory/*`

**Event Operations:**
- ❌ Before: `/public/projects/{id}/database/events/*`
- ✅ After: `/projects/{id}/database/events/*`

**File Operations:**
- ❌ Before: `/public/projects/{id}/database/files/*`
- ✅ After: `/projects/{id}/database/files/*`

**Analytics Operations:**
- ❌ Before: `/public/projects/{id}/analytics/*`
- ✅ After: `/projects/{id}/analytics/*`

### Migration Guide

**No code changes required!** The SDK API remains identical. Only the underlying HTTP endpoints have been corrected.

```typescript
// Your code works exactly the same way
import { AINativeClient } from '@ainative/sdk';

const client = new AINativeClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.ainative.studio'
});

// This now calls the correct endpoint: /v1/projects
const projects = await client.zerodb.projects.list();

// This now calls: /v1/projects/{id}/database/vectors/upsert
await client.zerodb.vectors.upsert(projectId, vectorData);
```

### What This Fixes

- ✅ All endpoints now return 200/201 instead of 404
- ✅ SDK works correctly with production API
- ✅ Vector operations execute successfully
- ✅ Memory operations execute successfully
- ✅ Event streaming works properly
- ✅ File uploads complete successfully

### Impact

**If you were using v1.0.0-1.0.3:**
- Your code will continue to work without changes
- Calls that were returning 404 will now succeed
- Performance may improve as requests no longer fail and retry

**Version Bump Reason:**
- This is a minor version bump (1.0.3 → 1.1.0) because it's a **fix** that changes **behavior**
- While technically a "breaking change" in implementation, the SDK API surface remains unchanged
- All existing user code continues to work without modification

---

## [1.0.3] - 2024-12-23

### Added
- Initial release of TypeScript SDK
- ZeroDB client with full CRUD operations
- Agent Swarm integration
- React hooks for common operations
- Vue composables for reactive state management
- Comprehensive error handling
- Automatic retry logic with exponential backoff
- Rate limit handling
- Debug logging support

### Features

**ZeroDB Operations:**
- Project management (CRUD)
- Vector operations (upsert, search, batch operations)
- Memory storage and search
- Event publishing and streaming
- File metadata management
- Analytics and cost tracking

**Agent Swarm:**
- Workflow creation and management
- Agent orchestration
- Task execution monitoring

**Developer Experience:**
- TypeScript-first with complete type definitions
- Framework-agnostic core client
- React hooks for React applications
- Vue composables for Vue.js applications
- EventEmitter-based event system
- Configurable retry and timeout settings

---

## [Unreleased]

### Planned
- WebSocket support for real-time updates
- Batch operation optimizations
- Response caching layer
- Request deduplication
- Pagination helpers
- Query builders for complex filters
