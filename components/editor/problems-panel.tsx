"use client";

import { useState } from "react";
import {
  AlertCircle,
  XCircle,
  Info,
  ChevronRight,
  Filter,
  RotateCcw,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Problem {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  file: string;
  line: number;
  column: number;
  source: string;
}

const mockProblems: Problem[] = [
  {
    id: "1",
    type: "error",
    message: "Property 'name' does not exist on type 'User'",
    file: "src/components/UserCard.tsx",
    line: 42,
    column: 18,
    source: "TypeScript",
  },
  {
    id: "2",
    type: "error",
    message: "Cannot find module './utils'",
    file: "src/App.tsx",
    line: 12,
    column: 24,
    source: "TypeScript",
  },
  {
    id: "3",
    type: "warning",
    message: "React Hook useEffect has a missing dependency: 'fetchData'",
    file: "src/hooks/useData.ts",
    line: 28,
    column: 6,
    source: "React Hooks",
  },
  {
    id: "4",
    type: "warning",
    message: "Unused variable 'count'",
    file: "src/components/Counter.tsx",
    line: 15,
    column: 9,
    source: "ESLint",
  },
  {
    id: "5",
    type: "info",
    message: "Consider using const instead of let",
    file: "src/utils/helpers.ts",
    line: 7,
    column: 1,
    source: "ESLint",
  },
];

export function ProblemsPanel() {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const errors = problems.filter((p) => p.type === "error");
  const warnings = problems.filter((p) => p.type === "warning");
  const infos = problems.filter((p) => p.type === "info");

  const getIcon = (type: Problem["type"]) => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleClearAll = () => {
    setProblems([]);
  };

  const handleRefresh = () => {
    setProblems(mockProblems);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Problems</h3>
          <div className="flex gap-1">
            <Badge variant="destructive" className="text-xs h-5">
              {errors.length}
            </Badge>
            <Badge className="bg-yellow-500 text-white text-xs h-5">
              {warnings.length}
            </Badge>
            <Badge variant="secondary" className="text-xs h-5">
              {infos.length}
            </Badge>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRefresh}>
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Filter className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-3 mt-2">
          <TabsTrigger value="all" className="text-xs">
            All ({problems.length})
          </TabsTrigger>
          <TabsTrigger value="errors" className="text-xs">
            Errors ({errors.length})
          </TabsTrigger>
          <TabsTrigger value="warnings" className="text-xs">
            Warnings ({warnings.length})
          </TabsTrigger>
          <TabsTrigger value="info" className="text-xs">
            Info ({infos.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            {problems.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No problems found</p>
                <p className="text-sm mt-1">Your code looks good!</p>
              </div>
            ) : (
              <div className="p-2">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg hover:bg-accent transition-colors mb-1",
                      selectedProblem?.id === problem.id && "bg-accent"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {getIcon(problem.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">{problem.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono">{problem.file}</span>
                          <span>•</span>
                          <span>
                            Ln {problem.line}, Col {problem.column}
                          </span>
                          <span>•</span>
                          <span>{problem.source}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="errors" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {errors.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors mb-1"
                >
                  <div className="flex items-start gap-2">
                    {getIcon(problem.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{problem.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">{problem.file}</span>
                        <span>•</span>
                        <span>
                          Ln {problem.line}, Col {problem.column}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="warnings" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {warnings.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors mb-1"
                >
                  <div className="flex items-start gap-2">
                    {getIcon(problem.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{problem.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">{problem.file}</span>
                        <span>•</span>
                        <span>
                          Ln {problem.line}, Col {problem.column}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="info" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {infos.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors mb-1"
                >
                  <div className="flex items-start gap-2">
                    {getIcon(problem.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{problem.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">{problem.file}</span>
                        <span>•</span>
                        <span>
                          Ln {problem.line}, Col {problem.column}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
