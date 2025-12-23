/**
 * Quantum operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { QuantumCompressRequest, QuantumCompressResponse, QuantumDecompressRequest, QuantumDecompressResponse, QuantumHybridSimilarityRequest, QuantumHybridSimilarityResponse, QuantumOptimizeSpaceRequest, QuantumOptimizeSpaceResponse, QuantumFeatureMapRequest, QuantumFeatureMapResponse, QuantumKernelSimilarityRequest, QuantumKernelSimilarityResponse } from '../types';
export declare class QuantumOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Compress a vector using quantum-inspired compression
     */
    compress(request: QuantumCompressRequest): Promise<QuantumCompressResponse>;
    /**
     * Decompress a quantum-compressed vector
     */
    decompress(request: QuantumDecompressRequest): Promise<QuantumDecompressResponse>;
    /**
     * Calculate hybrid similarity using quantum enhancement
     */
    hybridSimilarity(request: QuantumHybridSimilarityRequest): Promise<QuantumHybridSimilarityResponse>;
    /**
     * Optimize quantum space for project vectors
     */
    optimizeSpace(request: QuantumOptimizeSpaceRequest): Promise<QuantumOptimizeSpaceResponse>;
    /**
     * Apply quantum feature mapping to vector
     */
    featureMap(request: QuantumFeatureMapRequest): Promise<QuantumFeatureMapResponse>;
    /**
     * Calculate quantum kernel similarity
     */
    kernelSimilarity(request: QuantumKernelSimilarityRequest): Promise<QuantumKernelSimilarityResponse>;
}
//# sourceMappingURL=quantum.d.ts.map