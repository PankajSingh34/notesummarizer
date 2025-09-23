// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API interface for summarization response
interface SummarizeResponse {
  summary: string;
  originalWordCount: number;
  summaryWordCount: number;
  compressionRatio: number;
  metadata: {
    timestamp: string;
    length: string;
    processingTime: number;
  };
}

// API interface for file upload response
interface FileUploadResponse {
  content: string;
  filename: string;
  wordCount: number;
  fileSize: number;
  metadata: {
    timestamp: string;
    encoding: string;
  };
}

// Real API call to backend for text summarization
export const summarizeText = async (text: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, length }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: SummarizeResponse = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Summarization API error:', error);
    
    // Fallback to local summarization if API fails
    console.log('Falling back to local summarization...');
    return fallbackSummarize(text, length);
  }
};

// Upload and read file content
export const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/notes/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Upload failed! status: ${response.status}`);
    }

    const data: FileUploadResponse = await response.json();
    return data.content;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

// Validate content before summarization
export const validateContent = async (content: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notes/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Validation failed! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Content validation error:', error);
    throw error;
  }
};

// Fallback summarization for when API is unavailable
const fallbackSummarize = (text: string, length: string): string => {
  const sentences = text.split('. ').filter(s => s.trim().length > 0);
  
  let targetSentences: number;
  switch (length) {
    case 'short':
      targetSentences = Math.max(1, Math.ceil(sentences.length * 0.15));
      break;
    case 'long':
      targetSentences = Math.max(2, Math.ceil(sentences.length * 0.4));
      break;
    default:
      targetSentences = Math.max(1, Math.ceil(sentences.length * 0.25));
  }

  const keyPoints = sentences.slice(0, targetSentences);
  return keyPoints.join('. ') + '.';
};

// Utility function to count words
export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Generate a title from the first few words
export const generateTitle = (text: string): string => {
  const words = text.trim().split(/\s+/).slice(0, 8);
  return words.join(' ') + (text.trim().split(/\s+/).length > 8 ? '...' : '');
};