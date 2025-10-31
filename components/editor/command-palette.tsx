"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Command as CommandIcon,
  Search,
  FileText,
  Folder,
  Settings,
  Rocket,
  Download,
  Share2,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  keywords: string[];
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const commands: CommandItem[] = [
    {
      id: "new-file",
      title: "New File",
      subtitle: "Create a new file",
      icon: FileText,
      action: () => {
        console.log("New file");
        setOpen(false);
      },
      keywords: ["new", "file", "create"],
    },
    {
      id: "new-folder",
      title: "New Folder",
      subtitle: "Create a new folder",
      icon: Folder,
      action: () => {
        console.log("New folder");
        setOpen(false);
      },
      keywords: ["new", "folder", "create", "directory"],
    },
    {
      id: "ai-chat",
      title: "Open AI Chat",
      subtitle: "Chat with AI assistant",
      icon: Sparkles,
      action: () => {
        console.log("AI Chat");
        setOpen(false);
      },
      keywords: ["ai", "chat", "assistant", "help"],
    },
    {
      id: "deploy",
      title: "Deploy Project",
      subtitle: "Deploy to production",
      icon: Rocket,
      action: () => {
        console.log("Deploy");
        setOpen(false);
      },
      keywords: ["deploy", "production", "publish"],
    },
    {
      id: "export",
      title: "Export Project",
      subtitle: "Download project files",
      icon: Download,
      action: () => {
        console.log("Export");
        setOpen(false);
      },
      keywords: ["export", "download", "save"],
    },
    {
      id: "share",
      title: "Share Project",
      subtitle: "Get shareable link",
      icon: Share2,
      action: () => {
        console.log("Share");
        setOpen(false);
      },
      keywords: ["share", "link", "collaborate"],
    },
    {
      id: "settings",
      title: "Settings",
      subtitle: "Open settings",
      icon: Settings,
      action: () => {
        router.push("/settings");
        setOpen(false);
      },
      keywords: ["settings", "preferences", "config"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.subtitle?.toLowerCase().includes(searchLower) ||
      cmd.keywords.some((k) => k.includes(searchLower))
    );
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-lg bg-transparent"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-300">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="p-2">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-lavender-light rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <cmd.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-black">{cmd.title}</div>
                    {cmd.subtitle && (
                      <div className="text-sm text-gray-500">{cmd.subtitle}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No commands found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">↵</kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">↑↓</kbd>
              to navigate
            </span>
          </div>
          <span>
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">
              ⌘K
            </kbd>{" "}
            to toggle
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
