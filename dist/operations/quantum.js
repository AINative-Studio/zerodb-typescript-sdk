"use strict";
/**
 * Quantum operations for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantumOperations = void 0;
const utils_1 = require("../utils");
class QuantumOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Compress a vector using quantum-inspired compression
     */
    async compress(request) {
        (0, utils_1.validateEmbedding)(request.embedding);
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/compress`, {
            embedding: request.embedding,
            compression_ratio: request.compression_ratio || 0.6,
            preserve_semantics: request.preserve_semantics !== false
        });
    }
    /**
     * Decompress a quantum-compressed vector
     */
    async decompress(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/decompress`, {
            compressed_embedding: request.compressed_embedding
        });
    }
    /**
     * Calculate hybrid similarity using quantum enhancement
     */
    async hybridSimilarity(request) {
        (0, utils_1.validateEmbedding)(request.query_vector);
        (0, utils_1.validateEmbedding)(request.candidate_vector);
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/hybrid-similarity`, {
            query_vector: request.query_vector,
            candidate_vector: request.candidate_vector,
            metadata_boost: request.metadata_boost
        });
    }
    /**
     * Optimize quantum space for project vectors
     */
    async optimizeSpace(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/optimize-space`, {
            sample_count: request.sample_count || 100
        });
    }
    /**
     * Apply quantum feature mapping to vector
     */
    async featureMap(request) {
        (0, utils_1.validateEmbedding)(request.embedding);
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/feature-map`, {
            embedding: request.embedding
        });
    }
    /**
     * Calculate quantum kernel similarity
     */
    async kernelSimilarity(request) {
        (0, utils_1.validateEmbedding)(request.vector1);
        (0, utils_1.validateEmbedding)(request.vector2);
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/quantum/kernel-similarity`, {
            vector1: request.vector1,
            vector2: request.vector2
        });
    }
}
exports.QuantumOperations = QuantumOperations;
