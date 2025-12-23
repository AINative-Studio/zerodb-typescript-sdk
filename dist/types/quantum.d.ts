/**
 * Type definitions for quantum operations
 */
import { UUID, VectorEmbedding } from './index';
export interface QuantumCompressRequest {
    project_id: UUID;
    embedding: VectorEmbedding;
    compression_ratio?: number;
    preserve_semantics?: boolean;
}
export interface QuantumCompressResponse {
    compressed_embedding: VectorEmbedding;
    original_size: number;
    compressed_size: number;
    compression_achieved: number;
}
export interface QuantumDecompressRequest {
    project_id: UUID;
    compressed_embedding: VectorEmbedding;
}
export interface QuantumDecompressResponse {
    embedding: VectorEmbedding;
    quality_score: number;
    decompression_time_ms: number;
}
export interface QuantumHybridSimilarityRequest {
    project_id: UUID;
    query_vector: VectorEmbedding;
    candidate_vector: VectorEmbedding;
    metadata_boost?: Record<string, any>;
}
export interface QuantumHybridSimilarityResponse {
    similarity_score: number;
    cosine_component: number;
    quantum_component: number;
    metadata_component?: number;
}
export interface QuantumOptimizeSpaceRequest {
    project_id: UUID;
    sample_count?: number;
}
export interface QuantumOptimizeSpaceResponse {
    optimization_applied: boolean;
    compression_efficiency: number;
    circuit_depth: number;
    rotation_angles: number[];
}
export interface QuantumFeatureMapRequest {
    project_id: UUID;
    embedding: VectorEmbedding;
}
export interface QuantumFeatureMapResponse {
    mapped_embedding: VectorEmbedding;
    feature_space_dimension: number;
    mapping_time_ms: number;
}
export interface QuantumKernelSimilarityRequest {
    project_id: UUID;
    vector1: VectorEmbedding;
    vector2: VectorEmbedding;
}
export interface QuantumKernelSimilarityResponse {
    kernel_value: number;
    interference_term: number;
    computation_time_ms: number;
}
//# sourceMappingURL=quantum.d.ts.map