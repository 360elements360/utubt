"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAnalysisStore } from "@/lib/store/analysis";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  url: z.string().url("Please enter a valid YouTube URL"),
});

export function SearchBar() {
  const { toast } = useToast();
  const analyzeVideo = useAnalysisStore((state) => state.analyzeVideo);
  const isLoading = useAnalysisStore((state) => state.isLoading);
  const error = useAnalysisStore((state) => state.error);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await analyzeVideo(values.url);
      toast({
        title: "Analysis Started",
        description: "We're analyzing your video. This may take a few moments.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter YouTube video URL"
                      {...field}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                      <SearchIcon className="mr-2 h-4 w-4" />
                      {isLoading ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}