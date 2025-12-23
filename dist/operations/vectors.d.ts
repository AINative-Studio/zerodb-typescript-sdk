/**
 * Vector operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { VectorUpsertRequest, VectorUpsertResponse, BatchVectorUpsertRequest, BatchVectorUpsertResponse, VectorSearchRequest, VectorSearchResult, VectorDeleteResponse, Vector, VectorListRequest, VectorStatsResponse, VectorIndexCreateRequest, VectorIndexCreateResponse, VectorOptimizeRequest, VectorOptimizeResponse, VectorExportRequest, VectorExportResponse, UUID } from '../types';
export declare class VectorOperations {
    private client;
    constructor(client: ZeroDBClient);
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
    upsert(request: VectorUpsertRequest): Promise<VectorUpsertResponse>;
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
    batchUpsert(request: BatchVectorUpsertRequest): Promise<BatchVectorUpsertResponse>;
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
    search(request: VectorSearchRequest): Promise<VectorSearchResult>;
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
    delete(projectId: UUID, vectorId: string): Promise<VectorDeleteResponse>;
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
    get(projectId: UUID, vectorId: string): Promise<Vector>;
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
    list(request: VectorListRequest): Promise<Vector[]>;
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
    stats(projectId: UUID): Promise<VectorStatsResponse>;
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
    createIndex(request: VectorIndexCreateRequest): Promise<VectorIndexCreateResponse>;
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
    optimize(request: VectorOptimizeRequest): Promise<VectorOptimizeResponse>;
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
    export(request: VectorExportRequest): Promise<VectorExportResponse>;
}
//# sourceMappingURL=vectors.d.ts.map