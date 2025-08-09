/**
 * Authentication manager for AINative SDK
 */
import { AuthConfig } from './types';
export declare class AuthManager {
    private config;
    constructor(config?: AuthConfig);
    /**
     * Get authentication headers
     */
    getHeaders(): Record<string, string>;
    /**
     * Set API key
     */
    setApiKey(apiKey: string): void;
    /**
     * Set API secret
     */
    setApiSecret(apiSecret: string): void;
    /**
     * Set JWT token
     */
    setToken(token: string): void;
    /**
     * Clear authentication
     */
    clear(): void;
    /**
     * Check if authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Get authentication type
     */
    getAuthType(): 'api-key' | 'token' | 'none';
}
//# sourceMappingURL=auth.d.ts.map