/**
 * Unit tests for ZeroDBClient
 */

import { ZeroDBClient } from '../src/client';
import { AuthenticationError } from '../src/errors';

describe('ZeroDBClient', () => {
  describe('Constructor', () => {
    it('should create client with API key', () => {
      const client = new ZeroDBClient({
        apiKey: 'ZERODB_test_key'
      });

      expect(client).toBeInstanceOf(ZeroDBClient);
    });

    it('should create client with JWT token', () => {
      const client = new ZeroDBClient({
        jwtToken: 'test_jwt_token'
      });

      expect(client).toBeInstanceOf(ZeroDBClient);
    });

    it('should throw error without authentication', () => {
      expect(() => {
        new ZeroDBClient({});
      }).toThrow(AuthenticationError);
    });

    it('should use default configuration', () => {
      const client = new ZeroDBClient({
        apiKey: 'ZERODB_test_key'
      });

      const config = client.getConfig();

      expect(config.baseURL).toBe('https://api.ainative.studio');
      expect(config.timeout).toBe(30000);
      expect(config.retryAttempts).toBe(3);
    });

    it('should use custom configuration', () => {
      const client = new ZeroDBClient({
        apiKey: 'ZERODB_test_key',
        baseURL: 'https://custom.api.com',
        timeout: 60000,
        retryAttempts: 5
      });

      const config = client.getConfig();

      expect(config.baseURL).toBe('https://custom.api.com');
      expect(config.timeout).toBe(60000);
      expect(config.retryAttempts).toBe(5);
    });
  });

  describe('Authentication', () => {
    it('should update auth token to JWT', () => {
      const client = new ZeroDBClient({
        apiKey: 'ZERODB_test_key'
      });

      expect(() => {
        client.setAuthToken('new_jwt_token', 'jwt');
      }).not.toThrow();
    });

    it('should update auth token to API key', () => {
      const client = new ZeroDBClient({
        jwtToken: 'test_jwt'
      });

      expect(() => {
        client.setAuthToken('ZERODB_new_key', 'apiKey');
      }).not.toThrow();
    });
  });

  describe('Operation Modules', () => {
    let client: ZeroDBClient;

    beforeEach(() => {
      client = new ZeroDBClient({
        apiKey: 'ZERODB_test_key'
      });
    });

    it('should have vectors module', () => {
      expect(client.vectors).toBeDefined();
      expect(typeof client.vectors.search).toBe('function');
    });

    it('should have quantum module', () => {
      expect(client.quantum).toBeDefined();
      expect(typeof client.quantum.compress).toBe('function');
    });

    it('should have tables module', () => {
      expect(client.tables).toBeDefined();
      expect(typeof client.tables.createTable).toBe('function');
    });

    it('should have files module', () => {
      expect(client.files).toBeDefined();
      expect(typeof client.files.upload).toBe('function');
    });

    it('should have events module', () => {
      expect(client.events).toBeDefined();
      expect(typeof client.events.create).toBe('function');
    });

    it('should have projects module', () => {
      expect(client.projects).toBeDefined();
      expect(typeof client.projects.create).toBe('function');
    });

    it('should have rlhf module', () => {
      expect(client.rlhf).toBeDefined();
      expect(typeof client.rlhf.collectInteraction).toBe('function');
    });

    it('should have admin module', () => {
      expect(client.admin).toBeDefined();
      expect(typeof client.admin.getSystemStats).toBe('function');
    });
  });
});
