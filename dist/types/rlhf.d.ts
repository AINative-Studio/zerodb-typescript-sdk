/**
 * Type definitions for RLHF (Reinforcement Learning from Human Feedback) operations
 */
import { UUID } from './index';
export interface RLHFInteractionRequest {
    type: string;
    session_id: UUID;
    project_id?: UUID;
    element_clicked: string;
    page_url: string;
    additional_data?: Record<string, any>;
}
export interface RLHFInteractionResponse {
    feedback_id: UUID;
    status: 'collected';
    processed: boolean;
}
export interface RLHFAgentFeedbackRequest {
    project_id: UUID;
    agent_type: string;
    agent_response_id: UUID;
    user_rating: 1 | 2 | 3 | 4 | 5;
    feedback_text?: string;
}
export interface RLHFAgentFeedbackResponse {
    feedback_id: UUID;
    status: 'collected';
    learning_triggered: boolean;
}
export interface RLHFWorkflowFeedbackRequest {
    project_id: UUID;
    workflow_execution_id: UUID;
    overall_satisfaction: 1 | 2 | 3 | 4 | 5;
    stage_ratings: Record<string, number>;
    suggestions?: string[];
}
export interface RLHFWorkflowFeedbackResponse {
    feedback_id: UUID;
    status: 'collected';
    insights_generated: boolean;
}
export interface RLHFErrorReportRequest {
    error_type: string;
    error_message: string;
    context: Record<string, any>;
    user_description?: string;
    steps_to_reproduce?: string[];
}
export interface RLHFErrorReportResponse {
    feedback_id: UUID;
    status: 'collected';
    bug_tracker_created: boolean;
}
export interface RLHFStatusResponse {
    collection_active: boolean;
    active_sessions: number;
    pending_interactions: number;
    system_health: 'healthy' | 'degraded' | 'down';
}
export interface RLHFSummaryRequest {
    hours_back?: number;
}
export interface RLHFSummaryResponse {
    summary: {
        total_interactions: number;
        feedback_count: number;
        ratings_avg: number;
    };
    insights: string[];
    trending_issues: Array<{
        issue: string;
        count: number;
        severity: 'low' | 'medium' | 'high';
    }>;
}
export interface RLHFControlResponse {
    status: 'started' | 'stopped' | 'already_active' | 'already_inactive';
    message: string;
}
export interface RLHFSessionInteractionsRequest {
    session_id: UUID;
}
export interface RLHFSessionInteractionsResponse {
    session_id: UUID;
    total_interactions: number;
    interactions: Array<{
        interaction_id: UUID;
        type: string;
        timestamp: string;
        data: Record<string, any>;
    }>;
}
export interface RLHFBroadcastEventRequest {
    project_id?: UUID;
    event_data: Record<string, any>;
}
export interface RLHFBroadcastEventResponse {
    status: 'broadcasted';
    message: string;
}
//# sourceMappingURL=rlhf.d.ts.map