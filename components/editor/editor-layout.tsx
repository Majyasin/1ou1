"use client";

import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EditorSidebar } from "./editor-sidebar";
import { CodeEditor } from "./code-editor";
import { PreviewPanel } from "./preview-panel";
import { AIChat } from "./ai-chat";
import { EditorHeader } from "./editor-header";
import { useEditorStore } from "@/lib/store/editor-store";

export function EditorLayout() {
  const { showPreview, showChat } = useEditorStore();

  return (
    <div className="h-screen flex flex-col bg-background">
      <EditorHeader />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Sidebar */}
          <Panel defaultSize={15} minSize={10} maxSize={25}>
            <EditorSidebar />
          </Panel>

          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />

          {/* Main Editor */}
          <Panel defaultSize={showPreview ? 45 : 85} minSize={30}>
            <CodeEditor />
          </Panel>

          {/* Preview Panel */}
          {showPreview && (
            <>
              <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />
              <Panel defaultSize={40} minSize={20}>
                <PreviewPanel />
              </Panel>
            </>
          )}

          {/* AI Chat Panel */}
          {showChat && (
            <>
              <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors" />
              <Panel defaultSize={25} minSize={20} maxSize={40}>
                <AIChat />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  );
}
