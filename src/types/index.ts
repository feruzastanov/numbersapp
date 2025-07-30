export interface NumberInfo {
  text: string;
  number: number;
  found: boolean;
  type: string;
}

export interface FormData {
  number: string;
  infoType: 'math' | 'trivia' | 'date' | 'year';
  isRandom: boolean;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
} 