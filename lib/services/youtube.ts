export class YouTubeService {
  private static extractVideoId(url: string): string {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (!match) throw new Error("Invalid YouTube URL");
    return match[1];
  }

  static async getVideoDetails(url: string) {
    try {
      const videoId = this.extractVideoId(url);
      // In a real implementation, we would make an API call to YouTube Data API
      // For now, return mock data
      return {
        id: videoId,
        title: "Sample Video",
        description: "This is a sample video description",
        channelTitle: "Sample Channel",
        publishedAt: new Date().toISOString(),
        thumbnails: {
          default: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
          medium: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
          high: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
        },
      };
    } catch (error) {
      throw new Error("Failed to fetch video details");
    }
  }

  static async getTranscript(videoId: string) {
    try {
      // In a real implementation, we would fetch the transcript using YouTube Transcript API
      // For now, return mock data
      return [
        { text: "Sample transcript segment 1", start: 0, duration: 5 },
        { text: "Sample transcript segment 2", start: 5, duration: 5 },
      ];
    } catch (error) {
      throw new Error("Failed to fetch transcript");
    }
  }
}