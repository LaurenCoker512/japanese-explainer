import { apiClient } from "./client";
import { mockApi } from "./mockApi";
import type { ExplanationRequest } from "./types";
import type { ApiResponse } from "./types";

export interface ApiService {
  getExplanation(data: ExplanationRequest): Promise<ApiResponse>;
}

export const api: ApiService =
  import.meta.env.VITE_USE_MOCK_API === "true" ? mockApi : apiClient;
