"use client";

import { useState } from "react";
import {
  Rocket,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Globe,
  GitBranch,
  Settings,
  ExternalLink,
  RefreshCw,
  Download,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Deployment {
  id: string;
  status: "success" | "failure" | "building" | "queued";
  branch: string;
  commit: string;
  message: string;
  url?: string;
  createdAt: Date;
  duration?: number;
}

interface BuildLog {
  timestamp: string;
  message: string;
  type: "info" | "warn" | "error";
}

const mockDeployments: Deployment[] = [
  {
    id: "1",
    status: "success",
    branch: "main",
    commit: "a1b2c3d",
    message: "feat: Add new component library",
    url: "https://project.vercel.app",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    duration: 45,
  },
  {
    id: "2",
    status: "building",
    branch: "develop",
    commit: "e4f5g6h",
    message: "fix: Update API endpoints",
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: "3",
    status: "success",
    branch: "main",
    commit: "i7j8k9l",
    message: "docs: Update README",
    url: "https://project-v2.vercel.app",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    duration: 38,
  },
  {
    id: "4",
    status: "failure",
    branch: "feature/auth",
    commit: "m0n1o2p",
    message: "feat: Add authentication",
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    duration: 12,
  },
];

const mockLogs: BuildLog[] = [
  { timestamp: "00:00:01", message: "Cloning repository...", type: "info" },
  { timestamp: "00:00:03", message: "Installing dependencies...", type: "info" },
  { timestamp: "00:00:15", message: "Building application...", type: "info" },
  { timestamp: "00:00:35", message: "Warning: Large bundle size detected", type: "warn" },
  { timestamp: "00:00:42", message: "Optimizing assets...", type: "info" },
  { timestamp: "00:00:45", message: "Build completed successfully", type: "info" },
  { timestamp: "00:00:46", message: "Deploying to Vercel...", type: "info" },
  { timestamp: "00:00:50", message: "Deployment successful!", type: "info" },
];

export function DeploymentDashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(
    deployments[0]
  );
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    toast.loading("Starting deployment...");

    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newDeployment: Deployment = {
      id: Date.now().toString(),
      status: "building",
      branch: "main",
      commit: "xyz123",
      message: "Manual deployment",
      createdAt: new Date(),
    };

    setDeployments([newDeployment, ...deployments]);
    setSelectedDeployment(newDeployment);
    setIsDeploying(false);
    toast.dismiss();
    toast.success("Deployment started!");
  };

  const getStatusIcon = (status: Deployment["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failure":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "building":
        return <Activity className="w-4 h-4 text-blue-500 animate-spin" />;
      case "queued":
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Deployment["status"]) => {
    const colors = {
      success: "bg-green-100 text-green-800",
      failure: "bg-red-100 text-red-800",
      building: "bg-blue-100 text-blue-800",
      queued: "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge variant="secondary" className={cn("text-xs", colors[status])}>
        {status}
      </Badge>
    );
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "N/A";
    return `${seconds}s`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const successRate = Math.round(
    (deployments.filter((d) => d.status === "success").length / deployments.length) * 100
  );

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-lavender" />
            <h2 className="font-semibold">Deployments</h2>
          </div>
          <Button
            size="sm"
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-lavender hover:bg-lavender-dark"
          >
            {isDeploying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Now
              </>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="border rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{deployments.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{successRate}%</div>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {deployments.find((d) => d.status === "building") ? "1" : "0"}
            </div>
            <div className="text-xs text-muted-foreground">Building</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="deployments" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3">
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="logs">Build Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Deployments Tab */}
        <TabsContent value="deployments" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  onClick={() => setSelectedDeployment(deployment)}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer hover:border-lavender transition-colors",
                    selectedDeployment?.id === deployment.id && "border-lavender bg-lavender-light/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <div>
                        <div className="font-medium text-sm">{deployment.message}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <GitBranch className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {deployment.branch}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <code className="text-xs font-mono">{deployment.commit}</code>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(deployment.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatTime(deployment.createdAt)}</span>
                    {deployment.duration && (
                      <span>Duration: {formatDuration(deployment.duration)}</span>
                    )}
                  </div>

                  {deployment.url && deployment.status === "success" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(deployment.url, "_blank");
                      }}
                    >
                      <Globe className="w-3 h-3 mr-2" />
                      View Deployment
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  )}

                  {deployment.status === "building" && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Building...</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Build Logs Tab */}
        <TabsContent value="logs" className="flex-1 mt-0">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="font-medium text-sm">
                  {selectedDeployment?.message || "Select a deployment"}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-3 h-3 mr-2" />
                Export
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-1 font-mono text-xs bg-black text-green-400 p-4 rounded-lg">
                {mockLogs.map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
                      log.type === "error" && "text-red-400",
                      log.type === "warn" && "text-yellow-400"
                    )}
                  >
                    <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Deployment Settings
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure your deployment preferences
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Auto Deploy</div>
                    <div className="text-xs text-muted-foreground">
                      Automatically deploy on git push
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Production Branch</div>
                    <div className="text-xs text-muted-foreground">
                      Branch to deploy to production
                    </div>
                  </div>
                  <code className="text-xs font-mono px-2 py-1 bg-muted rounded">
                    main
                  </code>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Build Command</div>
                    <div className="text-xs text-muted-foreground">
                      Command to build your project
                    </div>
                  </div>
                  <code className="text-xs font-mono px-2 py-1 bg-muted rounded">
                    npm run build
                  </code>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Environment Variables
                </h4>
                <p className="text-xs text-muted-foreground">
                  12 environment variables configured
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Variables
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Performance
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Build Time:</span>
                    <span className="font-medium">42s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-medium text-green-600">{successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Deploy:</span>
                    <span className="font-medium">
                      {formatTime(deployments[0].createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
