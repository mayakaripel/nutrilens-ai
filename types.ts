export interface UserProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  goal: 'Maintenance' | 'Weight Loss' | 'Muscle Gain';
  sensitivities: string[]; // e.g., 'Lactose', 'Gluten'
  dislikes: string; // e.g., 'Feeling bloated'
  bio: string; // Freeform description
  hungerLevel: number; // 1-10
}

export interface AnalysisResult {
  verdict: string; // Markdown content
  strategy: string; // Markdown content
  rawText: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}