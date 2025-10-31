"use client";

import {
  GitBranch,
  AlertCircle,
  CheckCircle,
  XCircle,
  Cloud,
  Wifi,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  projectName?: string;
  branch?: string;
  errors?: number;
  warnings?: number;
  deploymentStatus?: "success" | "building" | "failed" | "idle";
  collaborators?: number;
  lastSaved?: Date;
}

export function StatusBar({
  projectName = "Untitled Project",
  branch = "main",
  errors = 0,
  warnings = 2,
  deploymentStatus = "success",
  collaborators = 1,
  lastSaved,
}: StatusBarProps) {
  const getDeploymentIcon = () => {
    switch (deploymentStatus) {
      case "success":
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case "building":
        return <Cloud className="w-3 h-3 text-blue-500 animate-pulse" />;
      case "failed":
        return <XCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Cloud className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getDeploymentText = () => {
    switch (deploymentStatus) {
      case "success":
        return "Deployed";
      case "building":
        return "Deploying...";
      case "failed":
        return "Deploy Failed";
      default:
        return "Not Deployed";
    }
  };

  const formatLastSaved = (date?: Date) => {
    if (!date) return "Not saved";
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Saved just now";
    if (diff < 3600) return `Saved ${Math.floor(diff / 60)}m ago`;
    return `Saved ${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="h-6 bg-lavender text-white flex items-center justify-between px-3 text-xs">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Project Name */}
        <div className="flex items-center gap-1.5 font-medium">
          <Zap className="w-3 h-3" />
          <span>{projectName}</span>
        </div>

        {/* Git Branch */}
        <button className="flex items-center gap-1.5 hover:bg-lavender-dark px-2 py-0.5 rounded transition-colors">
          <GitBranch className="w-3 h-3" />
          <span>{branch}</span>
        </button>

        {/* Errors & Warnings */}
        {(errors > 0 || warnings > 0) && (
          <div className="flex items-center gap-3">
            {errors > 0 && (
              <button className="flex items-center gap-1 hover:bg-lavender-dark px-2 py-0.5 rounded transition-colors">
                <XCircle className="w-3 h-3" />
                <span>{errors} {errors === 1 ? 'error' : 'errors'}</span>
              </button>
            )}
            {warnings > 0 && (
              <button className="flex items-center gap-1 hover:bg-lavender-dark px-2 py-0.5 rounded transition-colors">
                <AlertCircle className="w-3 h-3" />
                <span>{warnings} {warnings === 1 ? 'warning' : 'warnings'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Collaborators */}
        {collaborators > 1 && (
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            <span>{collaborators} online</span>
          </div>
        )}

        {/* Last Saved */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{formatLastSaved(lastSaved)}</span>
        </div>

        {/* Deployment Status */}
        <button className="flex items-center gap-1.5 hover:bg-lavender-dark px-2 py-0.5 rounded transition-colors">
          {getDeploymentIcon()}
          <span>{getDeploymentText()}</span>
        </button>

        {/* Connection Status */}
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
}
