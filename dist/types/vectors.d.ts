/**
 * Type definitions for vector operations
 */
import { UUID, Metadata, TimestampFields } from './index';
export type VectorEmbedding = number[];
export interface VectorUpsertRequest {
    project_id: UUID;
    embedding: VectorEmbedding;
    document: string;
    namespace?: string;
    metadata?: Metadata;
    vector_id?: string;
    source?: string;
}
export interface BatchVectorUpsertRequest {
    project_id: UUID;
    namespace?: string;
    vectors: Array<{
        embedding: VectorEmbedding;
        document: string;
        metadata?: Metadata;
        vector_id?: string;
    }>;
}
export interface VectorSearchRequest {
    project_id: UUID;
    query_vector: VectorEmbedding;
    limit?: number;
    threshold?: number;
    namespace?: string;
    metadata_filter?: Metadata;
}
export interface Vector extends TimestampFields {
    vector_id: string;
    project_id: UUID;
    namespace: string;
    vector_embedding: VectorEmbedding;
    document: string;
    vector_metadata?: Metadata;
    source?: string;
}
export interface VectorSearchResult {
    vectors: Vector[];
    total_count: number;
    search_time_ms: number;
}
export interface VectorUpsertResponse {
    vector_id: string;
    status: string;
}
export interface BatchVectorUpsertResponse {
    vector_ids: string[];
    success_count: number;
    error_count: number;
    errors: string[];
    total_time_ms: number;
}
export interface VectorDeleteResponse {
    status: string;
    deleted: boolean;
}
export interface VectorListRequest {
    project_id: UUID;
    namespace?: string;
    limit?: number;
    offset?: number;
}
export interface VectorStatsResponse {
    total_vectors: number;
    namespaces: Array<{
        namespace: string;
        count: number;
    }>;
    storage_bytes: number;
    avg_vector_size: number;
}
export interface VectorIndexCreateRequest {
    project_id: UUID;
    namespace: string;
    index_type: 'HNSW' | 'IVF' | 'FLAT';
}
export interface VectorIndexCreateResponse {
    index_id: string;
    estimated_build_time_seconds: number;
    status: 'building' | 'completed' | 'failed';
}
export interface VectorOptimizeRequest {
    project_id: UUID;
    strategy: 'compression' | 'deduplication' | 'clustering';
}
export interface VectorOptimizeResponse {
    optimized_vectors: number;
    storage_saved_bytes: number;
    optimization_time_ms: number;
}
export interface VectorExportRequest {
    project_id: UUID;
    namespace?: string;
    format: 'json' | 'csv' | 'parquet';
}
export interface VectorExportResponse {
    download_url: string;
    vector_count: number;
    file_size_bytes: number;
    expires_at: string;
}
//# sourceMappingURL=vectors.d.ts.map