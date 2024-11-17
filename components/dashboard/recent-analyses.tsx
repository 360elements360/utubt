import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentAnalyses = [
  {
    id: 1,
    title: "How to Build a Next.js App",
    channel: "Code with John",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "2024-03-15",
    insights: 8,
  },
  {
    id: 2,
    title: "React Best Practices 2024",
    channel: "React Masters",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "2024-03-14",
    insights: 12,
  },
  {
    id: 3,
    title: "TypeScript Tips and Tricks",
    channel: "TypeScript Guru",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: "2024-03-13",
    insights: 6,
  },
];

export function RecentAnalyses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Analyses</CardTitle>
        <CardDescription>
          Your most recent video content analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={analysis.thumbnail} alt={analysis.title} />
                <AvatarFallback>YT</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{analysis.title}</p>
                <p className="text-sm text-muted-foreground">
                  {analysis.channel}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {analysis.date}
              </div>
              <div className="text-sm font-medium">
                {analysis.insights} insights
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}