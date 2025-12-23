/**
 * Agent Operation Types
 * Type definitions for agent orchestration, coordination, learning, state, and swarm operations
 */

// ============================================================================
// Agent Orchestration Types
// ============================================================================

export interface Task {
  id: string;
  agent_id: string;
  task_type: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
  result?: any;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface CreateTaskRequest {
  agent_id: string;
  task_type: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export interface CreateTaskResponse {
  id: string;
  status: string;
  task: Task;
}

export interface ListTasksRequest {
  agent_id?: string;
  status?: 'pending' | 'running' | 'completed' | 'failed';
  limit?: number;
  offset?: number;
}

export interface ListTasksResponse {
  tasks: Task[];
  total: number;
}

export interface TaskStatusResponse {
  id: string;
  status: string;
  progress?: number;
  message?: string;
  result?: any;
}

export interface ExecuteTaskRequest {
  task_id: string;
  params?: Record<string, any>;
}

export interface ExecuteTaskResponse {
  id: string;
  status: string;
  result?: any;
}

export interface TaskSequence {
  id: string;
  name: string;
  tasks: string[];
  status: string;
  created_at: string;
}

export interface CreateTaskSequenceRequest {
  name: string;
  tasks: string[];
  description?: string;
}

export interface CreateTaskSequenceResponse {
  id: string;
  sequence: TaskSequence;
}

// ============================================================================
// Agent Coordination Types
// ============================================================================

export interface AgentMessage {
  id: string;
  from_agent: string;
  to_agent: string;
  message: string;
  message_type?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
  created_at: string;
}

export interface SendMessageRequest {
  from_agent: string;
  to_agent: string;
  message: string;
  message_type?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

export interface SendMessageResponse {
  id: string;
  status: string;
  message: AgentMessage;
}

export interface DistributeTasksRequest {
  tasks: string[];
  agents: string[];
  strategy?: 'round_robin' | 'load_balanced' | 'random';
}

export interface TaskAssignment {
  task_id: string;
  agent_id: string;
}

export interface DistributeTasksResponse {
  distributed: number;
  assignments: TaskAssignment[];
}

export interface AgentWorkload {
  agent_id: string;
  active_tasks: number;
  load: number;
  status: string;
}

export interface WorkloadStatsRequest {
  agent_id?: string;
}

export interface WorkloadStatsResponse {
  agents: Record<string, AgentWorkload>;
  timestamp: string;
}

// ============================================================================
// Agent Learning Types
// ============================================================================

export interface Feedback {
  id: string;
  agent_id: string;
  interaction_id: string;
  rating: number;
  comments?: string;
  created_at: string;
}

export interface SubmitFeedbackRequest {
  agent_id: string;
  interaction_id: string;
  rating: number;
  comments?: string;
}

export interface SubmitFeedbackResponse {
  id: string;
  status: string;
  feedback: Feedback;
}

export interface PerformanceMetrics {
  agent_id: string;
  avg_rating: number;
  total_interactions: number;
  success_rate: number;
  response_time_avg: number;
  last_updated: string;
}

export interface GetPerformanceMetricsRequest {
  agent_id: string;
  period?: string;
}

export interface GetPerformanceMetricsResponse {
  metrics: PerformanceMetrics;
}

export interface AgentComparison {
  agent_id: string;
  metrics: PerformanceMetrics;
  rank?: number;
}

export interface CompareAgentsRequest {
  agents: string[];
  metric?: 'rating' | 'success_rate' | 'response_time';
}

export interface CompareAgentsResponse {
  agents: AgentComparison[];
  comparison: Record<string, any>;
}

// ============================================================================
// Agent State Types
// ============================================================================

export interface AgentState {
  agent_id: string;
  state: Record<string, any>;
  last_updated: string;
  version: number;
}

export interface GetStateRequest {
  agent_id: string;
  version?: number;
}

export interface GetStateResponse {
  agent_id: string;
  state: Record<string, any>;
  version: number;
}

export interface Checkpoint {
  id: string;
  agent_id: string;
  name: string;
  data: Record<string, any>;
  description?: string;
  created_at: string;
}

export interface CreateCheckpointRequest {
  agent_id: string;
  name: string;
  data: Record<string, any>;
  description?: string;
}

export interface CreateCheckpointResponse {
  id: string;
  checkpoint: Checkpoint;
}

export interface RestoreCheckpointRequest {
  checkpoint_id: string;
  agent_id?: string;
}

export interface RestoreCheckpointResponse {
  agent_id: string;
  checkpoint_id: string;
  status: string;
}

export interface ListCheckpointsRequest {
  agent_id?: string;
  limit?: number;
  offset?: number;
}

export interface ListCheckpointsResponse {
  checkpoints: Checkpoint[];
  total: number;
}

// ============================================================================
// Agent Swarm Types
// ============================================================================

export interface Swarm {
  id: string;
  name: string;
  project_id: string;
  status: 'idle' | 'active' | 'paused' | 'stopped';
  agent_count: number;
  config?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateSwarmRequest {
  name: string;
  project_id: string;
  config?: Record<string, any>;
}

export interface CreateSwarmResponse {
  id: string;
  swarm: Swarm;
}

export interface ListSwarmsRequest {
  project_id?: string;
  status?: 'idle' | 'active' | 'paused' | 'stopped';
  limit?: number;
  offset?: number;
}

export interface ListSwarmsResponse {
  swarms: Swarm[];
  total: number;
}

export interface DeleteSwarmRequest {
  swarm_id: string;
}

export interface DeleteSwarmResponse {
  success: boolean;
  message: string;
}

export interface ScaleSwarmRequest {
  swarm_id: string;
  count: number;
}

export interface ScaleSwarmResponse {
  id: string;
  agent_count: number;
  status: string;
}

export interface SwarmAnalytics {
  swarm_id: string;
  total_tasks: number;
  completed: number;
  failed: number;
  pending: number;
  avg_completion_time: number;
  period: string;
}

export interface GetSwarmAnalyticsRequest {
  swarm_id: string;
  period?: string;
}

export interface GetSwarmAnalyticsResponse {
  analytics: SwarmAnalytics;
}

export interface AgentType {
  type: string;
  description: string;
  capabilities: string[];
}

export interface GetAgentTypesResponse {
  types: AgentType[];
}

export interface GetSwarmStatusRequest {
  swarm_id: string;
}

export interface GetSwarmStatusResponse {
  id: string;
  status: string;
  agent_count: number;
  active_tasks: number;
  last_updated: string;
}

export interface StartSwarmRequest {
  swarm_id: string;
}

export interface StartSwarmResponse {
  id: string;
  status: string;
  message: string;
}

export interface StopSwarmRequest {
  swarm_id: string;
}

export interface StopSwarmResponse {
  id: string;
  status: string;
  message: string;
}

export interface UpdateSwarmConfigRequest {
  swarm_id: string;
  config: Record<string, any>;
}

export interface UpdateSwarmConfigResponse {
  id: string;
  config: Record<string, any>;
  status: string;
}
