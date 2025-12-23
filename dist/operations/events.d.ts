/**
 * Event operations for ZeroDB MCP Client
 */
import { ZeroDBClient } from '../client';
import { EventCreateRequest, EventCreateResponse, EventListRequest, EventListResponse, EventDetailsRequest, EventDetailsResponse, EventSubscribeRequest, EventSubscribeResponse, EventStatsRequest, EventStatsResponse } from '../types';
export declare class EventOperations {
    private client;
    constructor(client: ZeroDBClient);
    /**
     * Create an event
     */
    create(request: EventCreateRequest): Promise<EventCreateResponse>;
    /**
     * List events
     */
    list(request: EventListRequest): Promise<EventListResponse>;
    /**
     * Get event details
     */
    get(request: EventDetailsRequest): Promise<EventDetailsResponse>;
    /**
     * Subscribe to event stream
     */
    subscribe(request: EventSubscribeRequest): Promise<EventSubscribeResponse>;
    /**
     * Get event statistics
     */
    stats(request: EventStatsRequest): Promise<EventStatsResponse>;
}
//# sourceMappingURL=events.d.ts.map