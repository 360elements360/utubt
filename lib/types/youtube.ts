export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
}

export interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

export interface AnalysisResult {
  videoId: string;
  summary: string;
  keyPoints: string[];
  topics: string[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  timestamps: {
    time: number;
    topic: string;
  }[];
}