/**
 * Vector operations for ZeroDB MCP Client
 */

import { ZeroDBClient } from '../client';
import {
  VectorUpsertRequest,
  VectorUpsertResponse,
  BatchVectorUpsertRequest,
  BatchVectorUpsertResponse,
  VectorSearchRequest,
  VectorSearchResult,
  VectorDeleteResponse,
  Vector,
  VectorListRequest,
  VectorStatsResponse,
  VectorIndexCreateRequest,
  VectorIndexCreateResponse,
  VectorOptimizeRequest,
  VectorOptimizeResponse,
  VectorExportRequest,
  VectorExportResponse,
  UUID
} from '../types';
import { validateEmbedding, sanitizeProjectId } from '../utils';

export class VectorOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Upsert a single vector
   *
   * @param request - Vector upsert request
   * @returns Vector upsert response with vector_id
   *
   * @example
   * ```typescript
   * const result = await client.vectors.upsert({
   *   project_id: 'project-uuid',
   *   embedding: [0.1, 0.2, ...], // 1536 dimensions
   *   document: 'This is a sample document',
   *   namespace: 'default',
   *   metadata: { source: 'api', type: 'article' }
   * });
   * console.log(result.vector_id);
   * ```
   */
  async upsert(request: VectorUpsertRequest): Promise<VectorUpsertResponse> {
    validateEmbedding(request.embedding);
    sanitizeProjectId(request.project_id);

    return this.client.post<VectorUpsertResponse>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/upsert`,
      {
        vector_embedding: request.embedding,
        document: request.document,
        namespace: request.namespace || 'default',
        vector_metadata: request.metadata,
        vector_id: request.vector_id,
        source: request.source
      }
    );
  }

  /**
   * Batch upsert multiple vectors
   *
   * @param request - Batch upsert request
   * @returns Batch upsert response with vector IDs
   *
   * @example
   * ```typescript
   * const result = await client.vectors.batchUpsert({
   *   project_id: 'project-uuid',
   *   namespace: 'documents',
   *   vectors: [
   *     { embedding: [...], document: 'Doc 1', metadata: {...} },
   *     { embedding: [...], document: 'Doc 2', metadata: {...} }
   *   ]
   * });
   * console.log(result.vector_ids);
   * ```
   */
  async batchUpsert(request: BatchVectorUpsertRequest): Promise<BatchVectorUpsertResponse> {
    sanitizeProjectId(request.project_id);

    // Validate all embeddings
    request.vectors.forEach((v, i) => {
      try {
        validateEmbedding(v.embedding);
      } catch (error) {
        throw new Error(`Invalid embedding at index ${i}: ${error}`);
      }
    });

    return this.client.post<BatchVectorUpsertResponse>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/upsert-batch`,
      {
        namespace: request.namespace || 'default',
        vectors: request.vectors.map(v => ({
          vector_embedding: v.embedding,
          document: v.document,
          vector_metadata: v.metadata,
          vector_id: v.vector_id
        }))
      }
    );
  }

  /**
   * Search vectors using semantic similarity
   *
   * @param request - Vector search request
   * @returns Search results with matching vectors
   *
   * @example
   * ```typescript
   * const result = await client.vectors.search({
   *   project_id: 'project-uuid',
   *   query_vector: [...], // 1536 dimensions
   *   limit: 10,
   *   threshold: 0.7,
   *   namespace: 'default'
   * });
   * console.log(result.vectors);
   * ```
   */
  async search(request: VectorSearchRequest): Promise<VectorSearchResult> {
    validateEmbedding(request.query_vector);
    sanitizeProjectId(request.project_id);

    return this.client.post<VectorSearchResult>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/search`,
      {
        query_vector: request.query_vector,
        limit: request.limit || 10,
        threshold: request.threshold,
        namespace: request.namespace || 'default',
        metadata_filter: request.metadata_filter
      }
    );
  }

  /**
   * Delete a specific vector
   *
   * @param projectId - Project ID
   * @param vectorId - Vector ID to delete
   * @returns Deletion status
   *
   * @example
   * ```typescript
   * const result = await client.vectors.delete('project-uuid', 'vector-id');
   * console.log(result.deleted);
   * ```
   */
  async delete(projectId: UUID, vectorId: string): Promise<VectorDeleteResponse> {
    sanitizeProjectId(projectId);

    return this.client.delete<VectorDeleteResponse>(
      `/api/v1/zerodb/${projectId}/database/vectors/${vectorId}`
    );
  }

  /**
   * Get a specific vector by ID
   *
   * @param projectId - Project ID
   * @param vectorId - Vector ID
   * @returns Vector details
   *
   * @example
   * ```typescript
   * const vector = await client.vectors.get('project-uuid', 'vector-id');
   * console.log(vector.document);
   * ```
   */
  async get(projectId: UUID, vectorId: string): Promise<Vector> {
    sanitizeProjectId(projectId);

    return this.client.get<Vector>(
      `/api/v1/zerodb/${projectId}/database/vectors/${vectorId}`
    );
  }

  /**
   * List vectors in a project/namespace
   *
   * @param request - List request with filters
   * @returns List of vectors
   *
   * @example
   * ```typescript
   * const vectors = await client.vectors.list({
   *   project_id: 'project-uuid',
   *   namespace: 'default',
   *   limit: 100,
   *   offset: 0
   * });
   * ```
   */
  async list(request: VectorListRequest): Promise<Vector[]> {
    sanitizeProjectId(request.project_id);

    const params = new URLSearchParams();
    if (request.namespace) params.append('namespace', request.namespace);
    if (request.limit) params.append('limit', request.limit.toString());
    if (request.offset) params.append('offset', request.offset.toString());

    return this.client.get<Vector[]>(
      `/api/v1/zerodb/${request.project_id}/database/vectors?${params.toString()}`
    );
  }

  /**
   * Get vector statistics for a project
   *
   * @param projectId - Project ID
   * @returns Vector statistics
   *
   * @example
   * ```typescript
   * const stats = await client.vectors.stats('project-uuid');
   * console.log(stats.total_vectors);
   * ```
   */
  async stats(projectId: UUID): Promise<VectorStatsResponse> {
    sanitizeProjectId(projectId);

    return this.client.get<VectorStatsResponse>(
      `/api/v1/zerodb/${projectId}/database/vectors/stats`
    );
  }

  /**
   * Create a vector index for optimized search
   *
   * @param request - Index creation request
   * @returns Index creation response
   *
   * @example
   * ```typescript
   * const index = await client.vectors.createIndex({
   *   project_id: 'project-uuid',
   *   namespace: 'default',
   *   index_type: 'HNSW'
   * });
   * console.log(index.index_id);
   * ```
   */
  async createIndex(request: VectorIndexCreateRequest): Promise<VectorIndexCreateResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<VectorIndexCreateResponse>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/indexes`,
      {
        namespace: request.namespace,
        index_type: request.index_type
      }
    );
  }

  /**
   * Optimize vector storage
   *
   * @param request - Optimization request
   * @returns Optimization results
   *
   * @example
   * ```typescript
   * const result = await client.vectors.optimize({
   *   project_id: 'project-uuid',
   *   strategy: 'compression'
   * });
   * console.log(result.storage_saved_bytes);
   * ```
   */
  async optimize(request: VectorOptimizeRequest): Promise<VectorOptimizeResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<VectorOptimizeResponse>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/optimize`,
      {
        strategy: request.strategy
      }
    );
  }

  /**
   * Export vectors to file
   *
   * @param request - Export request
   * @returns Export response with download URL
   *
   * @example
   * ```typescript
   * const result = await client.vectors.export({
   *   project_id: 'project-uuid',
   *   namespace: 'default',
   *   format: 'json'
   * });
   * console.log(result.download_url);
   * ```
   */
  async export(request: VectorExportRequest): Promise<VectorExportResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<VectorExportResponse>(
      `/api/v1/zerodb/${request.project_id}/database/vectors/export`,
      {
        namespace: request.namespace,
        format: request.format
      }
    );
  }
}
