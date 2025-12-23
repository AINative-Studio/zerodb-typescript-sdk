/**
 * Unit tests for utility functions
 */

import {
  isValidUUID,
  validateEmbedding,
  encodeToBase64,
  decodeFromBase64,
  sanitizeProjectId
} from '../src/utils';

describe('Utility Functions', () => {
  describe('isValidUUID', () => {
    it('should validate correct UUID', () => {
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    });

    it('should reject invalid UUID', () => {
      expect(isValidUUID('invalid-uuid')).toBe(false);
      expect(isValidUUID('123')).toBe(false);
      expect(isValidUUID('')).toBe(false);
    });
  });

  describe('validateEmbedding', () => {
    it('should validate correct embedding', () => {
      const embedding = new Array(1536).fill(0.5);
      expect(() => validateEmbedding(embedding)).not.toThrow();
    });

    it('should reject wrong dimension', () => {
      const embedding = new Array(100).fill(0.5);
      expect(() => validateEmbedding(embedding)).toThrow('must have 1536 dimensions');
    });

    it('should reject non-array', () => {
      expect(() => validateEmbedding('not-an-array' as any)).toThrow('must be an array');
    });

    it('should reject non-numeric values', () => {
      const embedding = new Array(1536).fill('string');
      expect(() => validateEmbedding(embedding as any)).toThrow('must contain only valid numbers');
    });

    it('should reject NaN values', () => {
      const embedding = new Array(1536).fill(NaN);
      expect(() => validateEmbedding(embedding)).toThrow('must contain only valid numbers');
    });
  });

  describe('encodeToBase64', () => {
    it('should encode string to base64', () => {
      const encoded = encodeToBase64('Hello World');
      expect(encoded).toBe(Buffer.from('Hello World').toString('base64'));
    });

    it('should encode buffer to base64', () => {
      const buffer = Buffer.from('Hello World');
      const encoded = encodeToBase64(buffer);
      expect(encoded).toBe(buffer.toString('base64'));
    });
  });

  describe('decodeFromBase64', () => {
    it('should decode base64 to buffer', () => {
      const base64 = Buffer.from('Hello World').toString('base64');
      const decoded = decodeFromBase64(base64);
      expect(decoded.toString()).toBe('Hello World');
    });
  });

  describe('sanitizeProjectId', () => {
    it('should accept valid UUID', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      expect(sanitizeProjectId(uuid)).toBe(uuid);
    });

    it('should reject invalid UUID', () => {
      expect(() => sanitizeProjectId('invalid')).toThrow('Invalid project ID format');
    });
  });
});
