export type TaskStatus = "queued" | "running" | "finished" | "stopped" | "error";

export interface ModelProfile {
  id?: number;
  name: string;
  provider: string;
  model: string;
  api_key?: string | null;
  base_url?: string | null;
  temperature?: number;
  extra_json?: Record<string, unknown>;
  is_default?: boolean;
}

export interface TaskRun {
  id: string;
  prompt: string;
  status: TaskStatus;
  result?: string | null;
  steps: number;
  duration_ms?: number;
  created_at?: string;
  updated_at?: string;
  model_profile_id?: number | null;
  metadata?: Record<string, unknown>;
}
