"use client";

import { useEffect, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEditorStore } from "@/lib/store/editor-store";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function CodeEditor() {
  const { theme } = useTheme();
  const { openFiles, activeFileId, setActiveFile, closeFile, updateFileContent } =
    useEditorStore();
  const editorRef = useRef<any>(null);

  const activeFile = openFiles.find((f) => f.id === activeFileId);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure Monaco editor
    monaco.editor.defineTheme("codeforge-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0a0a0a",
      },
    });

    monaco.editor.defineTheme("codeforge-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff",
      },
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFileId && value !== undefined) {
      updateFileContent(activeFileId, value);
    }
  };

  if (openFiles.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">No file open</p>
          <p className="text-sm">
            Open a file from the sidebar or create a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tabs */}
      <div className="flex items-center bg-card border-b overflow-x-auto">
        {openFiles.map((file) => (
          <button
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-r hover:bg-accent transition-colors group",
              activeFileId === file.id && "bg-background"
            )}
          >
            <span className="text-sm">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-muted rounded p-0.5 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1">
        {activeFile && (
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={
              theme === "dark" ? "codeforge-dark" : "codeforge-light"
            }
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
              fontLigatures: true,
              wordWrap: "on",
              lineNumbers: "on",
              rulers: [80, 120],
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              formatOnPaste: true,
              formatOnType: true,
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnCommitCharacter: true,
              tabCompletion: "on",
              quickSuggestions: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
