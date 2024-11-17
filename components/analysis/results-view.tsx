"use client";

import { useAnalysisStore } from "@/lib/store/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, FileText, ListChecks, MessageSquare } from "lucide-react";

export function AnalysisResults() {
  const { videoDetails, analysisResult, isLoading } = useAnalysisStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!videoDetails || !analysisResult) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{videoDetails.title}</h2>
          <p className="text-muted-foreground">{videoDetails.channelTitle}</p>
        </div>
        <Badge variant="secondary">
          {new Date(videoDetails.publishedAt).toLocaleDateString()}
        </Badge>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">
            <FileText className="h-4 w-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="timestamps">
            <Clock className="h-4 w-4 mr-2" />
            Timestamps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7">{analysisResult.summary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    {analysisResult.keyPoints.map((point, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-muted-foreground">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Topics Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-xl font-bold text-green-500">
                    {(analysisResult.sentiment.positive * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-blue-500">
                    {(analysisResult.sentiment.neutral * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Neutral</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-red-500">
                    {(analysisResult.sentiment.negative * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timestamps">
          <Card>
            <CardHeader>
              <CardTitle>Content Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {analysisResult.timestamps.map((timestamp, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="min-w-[100px] text-sm text-muted-foreground">
                        {new Date(timestamp.time * 1000).toISOString().substr(11, 8)}
                      </div>
                      <div>
                        <Badge variant="outline">{timestamp.topic}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}