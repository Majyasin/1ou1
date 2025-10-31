"use client";

import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EditorSidebar } from "./editor-sidebar";
import { CodeEditor } from "./code-editor";
import { PreviewPanel } from "./preview-panel";
import { AIChat } from "./ai-chat";
import { EditorHeader } from "./editor-header";
import { QuickActions } from "./quick-actions";
import { Terminal } from "./terminal";
import { CommandPalette } from "./command-palette";
import { AISuggestions } from "./ai-suggestions";
import { useEditorStore } from "@/lib/store/editor-store";
import toast from "react-hot-toast";

export function EditorLayout() {
  const { showPreview, showChat, showTerminal, showSuggestions } = useEditorStore();
  const [isGenerating, setIsGenerating] = useState(false);

  // Check for initial prompt from landing page and trigger AI generation
  useEffect(() => {
    const initialPrompt = sessionStorage.getItem("initialPrompt");
    if (initialPrompt) {
      toast.success("Generating your project with AI...");
      sessionStorage.removeItem("initialPrompt");
      generateProject(initialPrompt);
    }
  }, []);

  const generateProject = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate project");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim());

          for (const line of lines) {
            try {
              const data = JSON.parse(line);

              if (data.type === "file") {
                toast.success(`Generated: ${data.filename}`);
                // TODO: Add file to project
              } else if (data.type === "complete") {
                toast.success("Project generation complete!");
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate project");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <EditorHeader />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="vertical">
          {/* Main Editor Area */}
          <Panel defaultSize={showTerminal ? 70 : 100} minSize={40}>
            <PanelGroup direction="horizontal">
              {/* Sidebar */}
              <Panel defaultSize={15} minSize={10} maxSize={25}>
                <EditorSidebar />
              </Panel>

              <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />

              {/* Main Editor */}
              <Panel defaultSize={showPreview ? 45 : 85} minSize={30}>
                <CodeEditor />
              </Panel>

              {/* Preview Panel */}
              {showPreview && (
                <>
                  <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />
                  <Panel defaultSize={40} minSize={20}>
                    <PreviewPanel />
                  </Panel>
                </>
              )}

              {/* AI Chat Panel */}
              {showChat && (
                <>
                  <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />
                  <Panel defaultSize={25} minSize={20} maxSize={40}>
                    <AIChat />
                  </Panel>
                </>
              )}

              {/* AI Suggestions Panel */}
              {showSuggestions && (
                <>
                  <PanelResizeHandle className="w-1 bg-border hover:bg-lavender transition-colors" />
                  <Panel defaultSize={25} minSize={20} maxSize={40}>
                    <AISuggestions />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>

          {/* Terminal Panel */}
          {showTerminal && (
            <>
              <PanelResizeHandle className="h-1 bg-border hover:bg-lavender transition-colors" />
              <Panel defaultSize={30} minSize={15} maxSize={50}>
                <Terminal />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>

      {/* Quick Actions FAB */}
      <QuickActions />

      {/* Command Palette (⌘K) */}
      <CommandPalette />
    </div>
  );
}
