"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ActivityBar } from "./activity-bar";
import { StatusBar } from "./status-bar";
import { EditorSidebar } from "./editor-sidebar";
import { CodeEditor } from "./code-editor";
import { PreviewPanel } from "./preview-panel";
import { AIChat } from "./ai-chat";
import { AISuggestions } from "./ai-suggestions";
import { Terminal } from "./terminal";
import { ProblemsPanel } from "./problems-panel";
import { ComponentLibrary } from "./component-library";
import { DeploymentDashboard } from "./deployment-dashboard";
import { APITester } from "./api-tester";
import { EnvManager } from "./env-manager";
import { ShareDialog } from "./share-dialog";
import { CommandPalette } from "./command-palette";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Play,
  Share2,
  Eye,
  EyeOff,
  Code2,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { useEditorStore } from "@/lib/store/editor-store";
import toast from "react-hot-toast";

export function UnifiedEditorLayout() {
  const [activeView, setActiveView] = useState("explorer");
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeBottomPanel, setActiveBottomPanel] = useState("terminal");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { currentProject } = useEditorStore();

  // Check for initial prompt from landing page
  useEffect(() => {
    const initialPrompt = sessionStorage.getItem("initialPrompt");
    if (initialPrompt) {
      toast.success("Generating your project with AI...");
      sessionStorage.removeItem("initialPrompt");
      // TODO: Trigger AI generation
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Project saved!");
    setIsSaving(false);
  };

  const handleRun = () => {
    toast.success("Running preview...");
  };

  const renderSidePanel = () => {
    switch (activeView) {
      case "explorer":
        return <EditorSidebar />;
      case "search":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Search (Coming Soon)</h3>
            <p className="text-sm text-muted-foreground">
              Global search across all files
            </p>
          </div>
        );
      case "git":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Source Control</h3>
            <p className="text-sm text-muted-foreground">3 changes</p>
          </div>
        );
      case "components":
        return <ComponentLibrary />;
      case "ai":
        return <AIChat />;
      case "deploy":
        return <DeploymentDashboard />;
      case "api":
        return <APITester />;
      case "database":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Database Explorer</h3>
            <p className="text-sm text-muted-foreground">
              View your database schema
            </p>
          </div>
        );
      case "integrations":
        return <EnvManager />;
      case "design":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Design System</h3>
            <p className="text-sm text-muted-foreground">
              Manage colors, typography, and spacing
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your workspace
            </p>
          </div>
        );
      default:
        return <EditorSidebar />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Action Bar */}
      <div className="h-10 border-b bg-card flex items-center justify-between px-3 gap-2">
        {/* Left - Project Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-lavender" />
            <span className="font-semibold text-sm">
              {currentProject?.name || "Untitled Project"}
            </span>
          </div>
        </div>

        {/* Center - Main Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-3 h-3 mr-1.5" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="ghost" size="sm" className="h-7" onClick={handleRun}>
            <Play className="w-3 h-3 mr-1.5" />
            Run
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7"
            onClick={() => setShareDialogOpen(true)}
          >
            <Share2 className="w-3 h-3 mr-1.5" />
            Share
          </Button>

          <div className="w-px h-4 bg-border mx-1" />

          <Button
            variant={showPreview ? "default" : "ghost"}
            size="sm"
            className="h-7"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <Eye className="w-3 h-3 mr-1.5" />
            ) : (
              <EyeOff className="w-3 h-3 mr-1.5" />
            )}
            Preview
          </Button>
        </div>

        {/* Right - Preview Mode Switcher */}
        {showPreview && (
          <div className="flex items-center gap-1">
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-3 h-3" />
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="w-3 h-3" />
            </Button>
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />

        {/* Main Panel Group */}
        <PanelGroup direction="vertical" className="flex-1">
          {/* Top Section - Editor + Panels */}
          <Panel defaultSize={75} minSize={30}>
            <PanelGroup direction="horizontal">
              {/* Left Sidebar - Dynamic based on activeView */}
              <Panel defaultSize={20} minSize={15} maxSize={40}>
                {renderSidePanel()}
              </Panel>

              <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />

              {/* Center - Code Editor */}
              <Panel defaultSize={showPreview ? 40 : 80} minSize={30}>
                <CodeEditor />
              </Panel>

              {/* Right - Preview (if enabled) */}
              {showPreview && (
                <>
                  <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />
                  <Panel defaultSize={40} minSize={20}>
                    <div className="h-full flex flex-col">
                      <div className="h-8 border-b bg-card flex items-center justify-between px-3">
                        <span className="text-xs font-medium">Preview</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <span className="text-xs">⟲</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <PreviewPanel />
                      </div>
                    </div>
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>

          {/* Bottom Section - Terminal, Problems, etc. */}
          <PanelResizeHandle className="h-1 bg-border hover:bg-lavender transition-colors" />
          <Panel defaultSize={25} minSize={15} maxSize={50}>
            <Tabs
              value={activeBottomPanel}
              onValueChange={setActiveBottomPanel}
              className="h-full flex flex-col"
            >
              <div className="border-b bg-card">
                <TabsList className="h-8 bg-transparent border-b-0">
                  <TabsTrigger value="terminal" className="text-xs h-7">
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger value="problems" className="text-xs h-7">
                    Problems
                  </TabsTrigger>
                  <TabsTrigger value="output" className="text-xs h-7">
                    Output
                  </TabsTrigger>
                  <TabsTrigger value="ai-suggestions" className="text-xs h-7">
                    AI Suggestions
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="terminal" className="flex-1 mt-0">
                <Terminal />
              </TabsContent>

              <TabsContent value="problems" className="flex-1 mt-0">
                <ProblemsPanel />
              </TabsContent>

              <TabsContent value="output" className="flex-1 mt-0">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground font-mono">
                    Build output will appear here...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="ai-suggestions" className="flex-1 mt-0">
                <AISuggestions />
              </TabsContent>
            </Tabs>
          </Panel>
        </PanelGroup>
      </div>

      {/* Status Bar */}
      <StatusBar
        projectName={currentProject?.name}
        branch="main"
        errors={2}
        warnings={3}
        deploymentStatus="success"
        lastSaved={new Date(Date.now() - 1000 * 60 * 2)}
      />

      {/* Dialogs */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        projectId={currentProject?.id || "untitled"}
        projectName={currentProject?.name || "Untitled Project"}
      />

      <CommandPalette />
    </div>
  );
}
