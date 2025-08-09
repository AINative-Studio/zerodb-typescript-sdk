/**
 * React Context Provider for AINative SDK
 */
import { ReactNode } from 'react';
import { AINativeClient } from '../client';
import { ClientConfig } from '../types';
export interface AINativeContextValue {
    client: AINativeClient;
}
export interface AINativeProviderProps {
    children: ReactNode;
    config?: ClientConfig;
    client?: AINativeClient;
}
/**
 * AINative Provider component
 *
 * @example
 * ```tsx
 * import { AINativeProvider } from '@ainative/sdk/react';
 *
 * function App() {
 *   return (
 *     <AINativeProvider config={{ apiKey: 'your-api-key' }}>
 *       <YourApp />
 *     </AINativeProvider>
 *   );
 * }
 * ```
 */
export declare function AINativeProvider({ children, config, client: providedClient }: AINativeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access AINative context
 */
export declare function useAINativeContext(): AINativeContextValue;
//# sourceMappingURL=AINativeProvider.d.ts.map