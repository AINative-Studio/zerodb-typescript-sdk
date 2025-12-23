/**
 * RLHF (Reinforcement Learning from Human Feedback) operations
 */

import { ZeroDBClient } from '../client';
import {
  RLHFInteractionRequest,
  RLHFInteractionResponse,
  RLHFAgentFeedbackRequest,
  RLHFAgentFeedbackResponse,
  RLHFWorkflowFeedbackRequest,
  RLHFWorkflowFeedbackResponse,
  RLHFErrorReportRequest,
  RLHFErrorReportResponse,
  RLHFStatusResponse,
  RLHFSummaryRequest,
  RLHFSummaryResponse,
  RLHFControlResponse,
  RLHFSessionInteractionsRequest,
  RLHFSessionInteractionsResponse,
  RLHFBroadcastEventRequest,
  RLHFBroadcastEventResponse
} from '../types';

export class RLHFOperations {
  constructor(private client: ZeroDBClient) {}

  /**
   * Collect user interaction
   */
  async collectInteraction(request: RLHFInteractionRequest): Promise<RLHFInteractionResponse> {
    return this.client.post<RLHFInteractionResponse>(
      '/api/v1/rlhf/collect/interaction',
      request
    );
  }

  /**
   * Collect agent feedback
   */
  async collectAgentFeedback(request: RLHFAgentFeedbackRequest): Promise<RLHFAgentFeedbackResponse> {
    return this.client.post<RLHFAgentFeedbackResponse>(
      '/api/v1/rlhf/collect/agent-feedback',
      request
    );
  }

  /**
   * Collect workflow feedback
   */
  async collectWorkflowFeedback(request: RLHFWorkflowFeedbackRequest): Promise<RLHFWorkflowFeedbackResponse> {
    return this.client.post<RLHFWorkflowFeedbackResponse>(
      '/api/v1/rlhf/collect/workflow-feedback',
      request
    );
  }

  /**
   * Collect error report
   */
  async collectErrorReport(request: RLHFErrorReportRequest): Promise<RLHFErrorReportResponse> {
    return this.client.post<RLHFErrorReportResponse>(
      '/api/v1/rlhf/collect/error-report',
      request
    );
  }

  /**
   * Get RLHF status
   */
  async getStatus(): Promise<RLHFStatusResponse> {
    return this.client.get<RLHFStatusResponse>('/api/v1/rlhf/status');
  }

  /**
   * Get RLHF summary (admin only)
   */
  async getSummary(request?: RLHFSummaryRequest): Promise<RLHFSummaryResponse> {
    const params = request?.hours_back ? `?hours_back=${request.hours_back}` : '';
    return this.client.get<RLHFSummaryResponse>(`/api/v1/rlhf/summary${params}`);
  }

  /**
   * Start RLHF collection (admin only)
   */
  async startCollection(): Promise<RLHFControlResponse> {
    return this.client.post<RLHFControlResponse>('/api/v1/rlhf/start', {});
  }

  /**
   * Stop RLHF collection (admin only)
   */
  async stopCollection(): Promise<RLHFControlResponse> {
    return this.client.post<RLHFControlResponse>('/api/v1/rlhf/stop', {});
  }

  /**
   * Get session interactions (admin only)
   */
  async getSessionInteractions(request: RLHFSessionInteractionsRequest): Promise<RLHFSessionInteractionsResponse> {
    return this.client.get<RLHFSessionInteractionsResponse>(
      `/api/v1/rlhf/sessions/${request.session_id}/interactions`
    );
  }

  /**
   * Broadcast RLHF event
   */
  async broadcastEvent(request: RLHFBroadcastEventRequest): Promise<RLHFBroadcastEventResponse> {
    return this.client.post<RLHFBroadcastEventResponse>(
      '/api/v1/rlhf/broadcast',
      request
    );
  }
}
