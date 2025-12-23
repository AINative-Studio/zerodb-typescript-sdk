/**
 * Quantum operations for ZeroDB MCP Client
 */

import { ZeroDBClient } from '../client';
import {
  QuantumCompressRequest,
  QuantumCompressResponse,
  QuantumDecompressRequest,
  QuantumDecompressResponse,
  QuantumHybridSimilarityRequest,
  QuantumHybridSimilarityResponse,
  QuantumOptimizeSpaceRequest,
  QuantumOptimizeSpaceResponse,
  QuantumFeatureMapRequest,
  QuantumFeatureMapResponse,
  QuantumKernelSimilarityRequest,
  QuantumKernelSimilarityResponse
} from '../types';
import { validateEmbedding, sanitizeProjectId } from '../utils';

export class QuantumOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Compress a vector using quantum-inspired compression
   */
  async compress(request: QuantumCompressRequest): Promise<QuantumCompressResponse> {
    validateEmbedding(request.embedding);
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumCompressResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/compress`,
      {
        embedding: request.embedding,
        compression_ratio: request.compression_ratio || 0.6,
        preserve_semantics: request.preserve_semantics !== false
      }
    );
  }

  /**
   * Decompress a quantum-compressed vector
   */
  async decompress(request: QuantumDecompressRequest): Promise<QuantumDecompressResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumDecompressResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/decompress`,
      {
        compressed_embedding: request.compressed_embedding
      }
    );
  }

  /**
   * Calculate hybrid similarity using quantum enhancement
   */
  async hybridSimilarity(request: QuantumHybridSimilarityRequest): Promise<QuantumHybridSimilarityResponse> {
    validateEmbedding(request.query_vector);
    validateEmbedding(request.candidate_vector);
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumHybridSimilarityResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/hybrid-similarity`,
      {
        query_vector: request.query_vector,
        candidate_vector: request.candidate_vector,
        metadata_boost: request.metadata_boost
      }
    );
  }

  /**
   * Optimize quantum space for project vectors
   */
  async optimizeSpace(request: QuantumOptimizeSpaceRequest): Promise<QuantumOptimizeSpaceResponse> {
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumOptimizeSpaceResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/optimize-space`,
      {
        sample_count: request.sample_count || 100
      }
    );
  }

  /**
   * Apply quantum feature mapping to vector
   */
  async featureMap(request: QuantumFeatureMapRequest): Promise<QuantumFeatureMapResponse> {
    validateEmbedding(request.embedding);
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumFeatureMapResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/feature-map`,
      {
        embedding: request.embedding
      }
    );
  }

  /**
   * Calculate quantum kernel similarity
   */
  async kernelSimilarity(request: QuantumKernelSimilarityRequest): Promise<QuantumKernelSimilarityResponse> {
    validateEmbedding(request.vector1);
    validateEmbedding(request.vector2);
    sanitizeProjectId(request.project_id);

    return this.client.post<QuantumKernelSimilarityResponse>(
      `/api/v1/zerodb/${request.project_id}/quantum/kernel-similarity`,
      {
        vector1: request.vector1,
        vector2: request.vector2
      }
    );
  }
}
