/**
 * RLHF (Reinforcement Learning from Human Feedback) operations
 */
import { ZeroDBClient } from '../client';
import { RLHFInteractionRequest, RLHFInteractionResponse, RLHFAgentFeedbackRequest, RLHFAgentFeedbackResponse, RLHFWorkflowFeedbackRequest, RLHFWorkflowFeedbackResponse, RLHFErrorReportRequest, RLHFErrorReportResponse, RLHFStatusResponse, RLHFSummaryRequest, RLHFSummaryResponse, RLHFControlResponse, RLHFSessionInteractionsRequest, RLHFSessionInteractionsResponse, RLHFBroadcastEventRequest, RLHFBroadcastEventResponse } from '../types';
export declare class RLHFOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Collect user interaction
     */
    collectInteraction(request: RLHFInteractionRequest): Promise<RLHFInteractionResponse>;
    /**
     * Collect agent feedback
     */
    collectAgentFeedback(request: RLHFAgentFeedbackRequest): Promise<RLHFAgentFeedbackResponse>;
    /**
     * Collect workflow feedback
     */
    collectWorkflowFeedback(request: RLHFWorkflowFeedbackRequest): Promise<RLHFWorkflowFeedbackResponse>;
    /**
     * Collect error report
     */
    collectErrorReport(request: RLHFErrorReportRequest): Promise<RLHFErrorReportResponse>;
    /**
     * Get RLHF status
     */
    getStatus(): Promise<RLHFStatusResponse>;
    /**
     * Get RLHF summary (admin only)
     */
    getSummary(request?: RLHFSummaryRequest): Promise<RLHFSummaryResponse>;
    /**
     * Start RLHF collection (admin only)
     */
    startCollection(): Promise<RLHFControlResponse>;
    /**
     * Stop RLHF collection (admin only)
     */
    stopCollection(): Promise<RLHFControlResponse>;
    /**
     * Get session interactions (admin only)
     */
    getSessionInteractions(request: RLHFSessionInteractionsRequest): Promise<RLHFSessionInteractionsResponse>;
    /**
     * Broadcast RLHF event
     */
    broadcastEvent(request: RLHFBroadcastEventRequest): Promise<RLHFBroadcastEventResponse>;
}
//# sourceMappingURL=rlhf.d.ts.map