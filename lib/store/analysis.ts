import { create } from "zustand";
import { AnalysisResult, VideoDetails } from "../types/youtube";
import { YouTubeService } from "../services/youtube";
import { AnalysisService } from "../services/analysis";

interface AnalysisStore {
  isLoading: boolean;
  videoDetails: VideoDetails | null;
  analysisResult: AnalysisResult | null;
  error: string | null;
  analyzeVideo: (url: string) => Promise<void>;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  isLoading: false,
  videoDetails: null,
  analysisResult: null,
  error: null,
  analyzeVideo: async (url: string) => {
    set({ isLoading: true, error: null });
    try {
      const videoDetails = await YouTubeService.getVideoDetails(url);
      const transcript = await YouTubeService.getTranscript(videoDetails.id);
      const transcriptText = transcript.map(segment => segment.text).join(" ");
      const analysisResult = await AnalysisService.analyzeContent(transcriptText);
      
      set({ videoDetails, analysisResult, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "An error occurred", 
        isLoading: false 
      });
    }
  },
}));