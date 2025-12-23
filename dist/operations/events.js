"use strict";
/**
 * Event operations for ZeroDB MCP Client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventOperations = void 0;
const utils_1 = require("../utils");
class EventOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Create an event
     */
    async create(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/events`, {
            event_type: request.event_type,
            topic: request.topic,
            event_payload: request.payload,
            source: request.source
        });
    }
    /**
     * List events
     */
    async list(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        const params = new URLSearchParams();
        if (request.event_type)
            params.append('event_type', request.event_type);
        if (request.topic)
            params.append('topic', request.topic);
        if (request.start_time)
            params.append('start_time', request.start_time);
        if (request.end_time)
            params.append('end_time', request.end_time);
        if (request.limit)
            params.append('limit', request.limit.toString());
        if (request.offset)
            params.append('offset', request.offset.toString());
        return this.client.get(`/api/v1/zerodb/${request.project_id}/database/events?${params.toString()}`);
    }
    /**
     * Get event details
     */
    async get(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.get(`/api/v1/zerodb/${request.project_id}/database/events/${request.event_id}`);
    }
    /**
     * Subscribe to event stream
     */
    async subscribe(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.post(`/api/v1/zerodb/${request.project_id}/database/events/subscribe`, {
            topic: request.topic,
            webhook_url: request.webhook_url,
            filters: request.filters
        });
    }
    /**
     * Get event statistics
     */
    async stats(request) {
        (0, utils_1.sanitizeProjectId)(request.project_id);
        return this.client.get(`/api/v1/zerodb/${request.project_id}/database/events/stats?time_range=${request.time_range}`);
    }
}
exports.EventOperations = EventOperations;
