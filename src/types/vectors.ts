/**
 * Type definitions for vector operations
 */

import { UUID, Metadata, TimestampFields } from './index';

// Vector embedding (1536 dimensions for OpenAI embeddings)
export type VectorEmbedding = number[];

// Vector upsert request
export interface VectorUpsertRequest {
  project_id: UUID;
  embedding: VectorEmbedding;
  document: string;
  namespace?: string;
  metadata?: Metadata;
  vector_id?: string;
  source?: string;
}

// Batch vector upsert request
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

// Vector search request
export interface VectorSearchRequest {
  project_id: UUID;
  query_vector: VectorEmbedding;
  limit?: number;
  threshold?: number;
  namespace?: string;
  metadata_filter?: Metadata;
}

// Vector response
export interface Vector extends TimestampFields {
  vector_id: string;
  project_id: UUID;
  namespace: string;
  vector_embedding: VectorEmbedding;
  document: string;
  vector_metadata?: Metadata;
  source?: string;
}

// Vector search result
export interface VectorSearchResult {
  vectors: Vector[];
  total_count: number;
  search_time_ms: number;
}

// Vector upsert response
export interface VectorUpsertResponse {
  vector_id: string;
  status: string;
}

// Batch upsert response
export interface BatchVectorUpsertResponse {
  vector_ids: string[];
  success_count: number;
  error_count: number;
  errors: string[];
  total_time_ms: number;
}

// Vector delete response
export interface VectorDeleteResponse {
  status: string;
  deleted: boolean;
}

// Vector list request
export interface VectorListRequest {
  project_id: UUID;
  namespace?: string;
  limit?: number;
  offset?: number;
}

// Vector stats response
export interface VectorStatsResponse {
  total_vectors: number;
  namespaces: Array<{
    namespace: string;
    count: number;
  }>;
  storage_bytes: number;
  avg_vector_size: number;
}

// Vector index creation
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

// Vector storage optimization
export interface VectorOptimizeRequest {
  project_id: UUID;
  strategy: 'compression' | 'deduplication' | 'clustering';
}

export interface VectorOptimizeResponse {
  optimized_vectors: number;
  storage_saved_bytes: number;
  optimization_time_ms: number;
}

// Vector export
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
