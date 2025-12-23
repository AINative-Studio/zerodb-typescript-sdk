/**
 * Type definitions for event operations
 */
import { UUID, TimestampFields } from './index';
export interface EventCreateRequest {
    project_id: UUID;
    event_type: string;
    topic: string;
    payload: Record<string, any>;
    source: string;
}
export interface Event extends TimestampFields {
    event_id: UUID;
    project_id: UUID;
    topic: string;
    event_payload: Record<string, any>;
    published_at: string;
}
export interface EventCreateResponse {
    event_id: UUID;
    timestamp: string;
    status: 'queued' | 'processing';
}
export interface EventListRequest {
    project_id: UUID;
    event_type?: string;
    topic?: string;
    start_time?: string;
    end_time?: string;
    limit?: number;
    offset?: number;
}
export interface EventListResponse {
    events: Event[];
    total_count: number;
    has_more: boolean;
}
export interface EventDetailsRequest {
    project_id: UUID;
    event_id: UUID;
}
export interface EventDetailsResponse {
    event: Event;
    status: 'completed' | 'failed' | 'processing';
}
export interface EventSubscribeRequest {
    project_id: UUID;
    topic: string;
    webhook_url: string;
    filters?: Record<string, any>;
}
export interface EventSubscribeResponse {
    subscription_id: UUID;
    status: 'active';
    webhook_verified: boolean;
}
export interface EventStatsRequest {
    project_id: UUID;
    time_range: 'hours' | 'days' | 'weeks';
}
export interface EventStatsResponse {
    total_events: number;
    events_by_type: Record<string, number>;
    events_by_topic: Record<string, number>;
    avg_processing_time_ms: number;
}
//# sourceMappingURL=events.d.ts.map