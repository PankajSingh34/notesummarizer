export interface Note {
  id: string;
  title: string;
  originalText: string;
  summary: string;
  wordCount: {
    original: number;
    summary: number;
  };
  timestamp: Date;
}

export interface AppState {
  currentNote: string;
  currentSummary: string;
  isLoading: boolean;
  history: Note[];
  darkMode: boolean;
}