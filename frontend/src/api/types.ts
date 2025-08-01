export interface ApiResponse {
  explanation: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ExplanationRequest {
  word: string;
  age: number;
}
