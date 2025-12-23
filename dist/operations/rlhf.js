"use strict";
/**
 * RLHF (Reinforcement Learning from Human Feedback) operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RLHFOperations = void 0;
class RLHFOperations {
    constructor(client) {
        this.client = client;
    }
    /**
     * Collect user interaction
     */
    async collectInteraction(request) {
        return this.client.post('/api/v1/rlhf/collect/interaction', request);
    }
    /**
     * Collect agent feedback
     */
    async collectAgentFeedback(request) {
        return this.client.post('/api/v1/rlhf/collect/agent-feedback', request);
    }
    /**
     * Collect workflow feedback
     */
    async collectWorkflowFeedback(request) {
        return this.client.post('/api/v1/rlhf/collect/workflow-feedback', request);
    }
    /**
     * Collect error report
     */
    async collectErrorReport(request) {
        return this.client.post('/api/v1/rlhf/collect/error-report', request);
    }
    /**
     * Get RLHF status
     */
    async getStatus() {
        return this.client.get('/api/v1/rlhf/status');
    }
    /**
     * Get RLHF summary (admin only)
     */
    async getSummary(request) {
        const params = request?.hours_back ? `?hours_back=${request.hours_back}` : '';
        return this.client.get(`/api/v1/rlhf/summary${params}`);
    }
    /**
     * Start RLHF collection (admin only)
     */
    async startCollection() {
        return this.client.post('/api/v1/rlhf/start', {});
    }
    /**
     * Stop RLHF collection (admin only)
     */
    async stopCollection() {
        return this.client.post('/api/v1/rlhf/stop', {});
    }
    /**
     * Get session interactions (admin only)
     */
    async getSessionInteractions(request) {
        return this.client.get(`/api/v1/rlhf/sessions/${request.session_id}/interactions`);
    }
    /**
     * Broadcast RLHF event
     */
    async broadcastEvent(request) {
        return this.client.post('/api/v1/rlhf/broadcast', request);
    }
}
exports.RLHFOperations = RLHFOperations;
