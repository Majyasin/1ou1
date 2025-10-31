"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Zap,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Suggestion {
  id: string;
  type: "error" | "warning" | "improvement" | "feature";
  title: string;
  description: string;
  file?: string;
  line?: number;
  action?: {
    label: string;
    handler: () => void;
  };
  applied?: boolean;
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    type: "error",
    title: "TypeScript Error",
    description: "Property 'name' does not exist on type 'User'",
    file: "src/App.tsx",
    line: 42,
    action: {
      label: "Add Property",
      handler: () => console.log("Add property"),
    },
  },
  {
    id: "2",
    type: "warning",
    title: "Missing Dependency",
    description: "React Hook useEffect has a missing dependency: 'fetchData'",
    file: "src/components/UserList.tsx",
    line: 15,
    action: {
      label: "Fix Dependencies",
      handler: () => console.log("Fix dependencies"),
    },
  },
  {
    id: "3",
    type: "improvement",
    title: "Performance Optimization",
    description: "This component re-renders unnecessarily. Consider using React.memo",
    file: "src/components/Card.tsx",
    line: 8,
    action: {
      label: "Apply Optimization",
      handler: () => console.log("Apply optimization"),
    },
  },
  {
    id: "4",
    type: "feature",
    title: "Add Loading State",
    description: "Add a loading indicator while data is being fetched",
    file: "src/components/UserList.tsx",
    action: {
      label: "Add Loading State",
      handler: () => console.log("Add loading state"),
    },
  },
  {
    id: "5",
    type: "improvement",
    title: "Accessibility Enhancement",
    description: "Add ARIA labels to improve screen reader support",
    file: "src/components/Button.tsx",
    action: {
      label: "Add ARIA Labels",
      handler: () => console.log("Add ARIA"),
    },
  },
];

export function AISuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleApplySuggestion = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (!suggestion?.action) return;

    suggestion.action.handler();

    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );

    toast.success("Suggestion applied successfully");

    // Remove applied suggestion after 2 seconds
    setTimeout(() => {
      setSuggestions((prev) => prev.filter((s) => s.id !== id));
    }, 2000);
  };

  const handleDismiss = (id: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    toast("Suggestion dismissed", { icon: "👋" });
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    toast.loading("Analyzing your code...");

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.dismiss();
      toast.success("Analysis complete!");
    }, 2000);
  };

  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "improvement":
        return <Zap className="w-4 h-4 text-blue-500" />;
      case "feature":
        return <Lightbulb className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: Suggestion["type"]) => {
    switch (type) {
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "improvement":
        return "Improvement";
      case "feature":
        return "Feature";
      default:
        return "Suggestion";
    }
  };

  const getTypeColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "error":
        return "border-red-500 bg-red-50";
      case "warning":
        return "border-yellow-500 bg-yellow-50";
      case "improvement":
        return "border-blue-500 bg-blue-50";
      case "feature":
        return "border-purple-500 bg-purple-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const errorCount = suggestions.filter((s) => s.type === "error").length;
  const warningCount = suggestions.filter((s) => s.type === "warning").length;
  const improvementCount = suggestions.filter(
    (s) => s.type === "improvement" || s.type === "feature"
  ).length;

  return (
    <div className="h-full flex flex-col bg-card border-l">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-lavender" />
            <h2 className="font-semibold">AI Suggestions</h2>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        {/* Summary */}
        <div className="flex gap-2 flex-wrap">
          {errorCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {errorCount} Error{errorCount !== 1 ? "s" : ""}
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge className="bg-yellow-500 text-white text-xs">
              {warningCount} Warning{warningCount !== 1 ? "s" : ""}
            </Badge>
          )}
          {improvementCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {improvementCount} Tip{improvementCount !== 1 ? "s" : ""}
            </Badge>
          )}
          {suggestions.length === 0 && (
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Clear
            </Badge>
          )}
        </div>
      </div>

      {/* Suggestions List */}
      <ScrollArea className="flex-1">
        {suggestions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="font-medium">No suggestions</p>
            <p className="text-sm mt-1">Your code looks good!</p>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={cn(
                  "border-l-4 rounded-r-lg p-3 space-y-2 transition-all",
                  getTypeColor(suggestion.type),
                  suggestion.applied && "opacity-50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    {getIcon(suggestion.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {suggestion.title}
                        </span>
                        {suggestion.applied && (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.description}
                      </p>
                      {suggestion.file && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <span className="font-mono">{suggestion.file}</span>
                          {suggestion.line && (
                            <>
                              <span>:</span>
                              <span>{suggestion.line}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 shrink-0"
                    onClick={() => handleDismiss(suggestion.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                {suggestion.action && !suggestion.applied && (
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full text-xs h-7"
                    onClick={() => handleApplySuggestion(suggestion.id)}
                  >
                    {suggestion.action.label}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {suggestions.length > 0 && (
        <div className="p-3 border-t">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              suggestions.forEach((s) => s.action && handleApplySuggestion(s.id));
            }}
          >
            Apply All Suggestions
          </Button>
        </div>
      )}
    </div>
  );
}
