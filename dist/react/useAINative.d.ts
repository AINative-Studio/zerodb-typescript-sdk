/**
 * React hook for AINative client
 */
/**
 * Hook to access the AINative client
 *
 * @example
 * ```tsx
 * import { useAINative } from '@ainative/sdk/react';
 *
 * function MyComponent() {
 *   const client = useAINative();
 *
 *   const checkHealth = async () => {
 *     const response = await client.healthCheck();
 *     console.log(response.data);
 *   };
 *
 *   return <button onClick={checkHealth}>Check Health</button>;
 * }
 * ```
 */
export declare function useAINative(): import("..").AINativeClient;
//# sourceMappingURL=useAINative.d.ts.map