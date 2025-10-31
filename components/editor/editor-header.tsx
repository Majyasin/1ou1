"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Save,
  Play,
  Download,
  Settings,
  Menu,
  Moon,
  Sun,
  Eye,
  MessageSquare,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/lib/store/editor-store";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export function EditorHeader() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { currentProject, showPreview, showChat, togglePreview, toggleChat } =
    useEditorStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Project saved successfully!");
    setIsSaving(false);
  };

  const handleRun = () => {
    toast.success("Running preview...");
  };

  const handleExport = () => {
    toast.success("Exporting project...");
  };

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="mr-2"
        >
          <Code2 className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-lg">
            {currentProject?.name || "Untitled Project"}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/projects")}
          >
            <FolderOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>

        <Button variant="ghost" size="sm" onClick={handleRun}>
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>

        <Button variant="ghost" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>

        <div className="h-6 w-px bg-border mx-2" />

        <Button
          variant={showPreview ? "default" : "ghost"}
          size="sm"
          onClick={togglePreview}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>

        <Button
          variant={showChat ? "default" : "ghost"}
          size="sm"
          onClick={toggleChat}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          AI Chat
        </Button>

        <div className="h-6 w-px bg-border mx-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
