import type { ApiResponse, ApiError } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText,
        status: response.status,
      };
      throw error;
    }

    return response.json();
  },

  async getExplanation(data: {
    word: string;
    age: number;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/explain`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
