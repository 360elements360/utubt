import { DashboardHeader } from "@/components/dashboard/header";
import { RecentAnalyses } from "@/components/dashboard/recent-analyses";
import { AnalysisResults } from "@/components/analysis/results-view";
import { SearchBar } from "@/components/search/search-bar";

export default function Home() {
  return (
    <div className="container mx-auto space-y-8">
      <DashboardHeader />
      <SearchBar />
      <AnalysisResults />
      <RecentAnalyses />
    </div>
  );
}