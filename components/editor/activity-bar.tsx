"use client";

import { useState } from "react";
import {
  Files,
  Search,
  GitBranch,
  Box,
  Settings,
  Rocket,
  Database,
  TestTube2,
  Sparkles,
  Package,
  Palette,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActivityItem {
  id: string;
  icon: any;
  label: string;
  badge?: number;
  shortcut?: string;
}

const activities: ActivityItem[] = [
  {
    id: "explorer",
    icon: Files,
    label: "Explorer",
    shortcut: "⌘⇧E",
  },
  {
    id: "search",
    icon: Search,
    label: "Search",
    shortcut: "⌘⇧F",
  },
  {
    id: "git",
    icon: GitBranch,
    label: "Source Control",
    badge: 3,
    shortcut: "⌘⇧G",
  },
  {
    id: "components",
    icon: Box,
    label: "Components",
    shortcut: "⌘⇧C",
  },
  {
    id: "ai",
    icon: Sparkles,
    label: "AI Assistant",
    shortcut: "⌘⇧A",
  },
  {
    id: "deploy",
    icon: Rocket,
    label: "Deployments",
    shortcut: "⌘⇧D",
  },
  {
    id: "api",
    icon: TestTube2,
    label: "API Tester",
    shortcut: "⌘⇧T",
  },
  {
    id: "database",
    icon: Database,
    label: "Database",
    shortcut: "⌘⇧B",
  },
  {
    id: "integrations",
    icon: Package,
    label: "Integrations",
    shortcut: "⌘⇧I",
  },
  {
    id: "design",
    icon: Palette,
    label: "Design System",
    shortcut: "⌘⇧Y",
  },
];

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  return (
    <div className="w-12 bg-card border-r flex flex-col items-center py-2 gap-1">
      {/* Logo */}
      <div className="mb-4 p-2">
        <Code2 className="w-6 h-6 text-lavender" />
      </div>

      {/* Activity Items */}
      <TooltipProvider>
        {activities.map((activity) => (
          <Tooltip key={activity.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewChange(activity.id)}
                className={cn(
                  "relative w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:bg-lavender-light",
                  activeView === activity.id
                    ? "bg-lavender text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <activity.icon className="w-5 h-5" />
                {activity.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-xs"
                  >
                    {activity.badge}
                  </Badge>
                )}
                {activeView === activity.id && (
                  <div className="absolute left-0 w-0.5 h-6 bg-lavender rounded-r" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              <span>{activity.label}</span>
              {activity.shortcut && (
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                  {activity.shortcut}
                </kbd>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>

      {/* Settings at bottom */}
      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onViewChange("settings")}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:bg-lavender-light",
                  activeView === "settings"
                    ? "bg-lavender text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Settings className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              <span>Settings</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘,</kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
