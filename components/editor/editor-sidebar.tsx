"use client";

import { useState } from "react";
import {
  FileText,
  FolderOpen,
  Plus,
  Search,
  GitBranch,
  Package,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "@/lib/store/editor-store";
import { cn } from "@/lib/utils";

const mockFiles = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "App.tsx",
        type: "file",
        language: "typescript",
      },
      {
        id: "3",
        name: "components",
        type: "folder",
        children: [
          { id: "4", name: "Button.tsx", type: "file", language: "typescript" },
          { id: "5", name: "Input.tsx", type: "file", language: "typescript" },
        ],
      },
    ],
  },
  { id: "6", name: "package.json", type: "file", language: "json" },
  { id: "7", name: "README.md", type: "file", language: "markdown" },
];

interface FileTreeItemProps {
  item: any;
  level?: number;
}

function FileTreeItem({ item, level = 0 }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const { openFile, activeFileId } = useEditorStore();

  const handleClick = () => {
    if (item.type === "folder") {
      setIsExpanded(!isExpanded);
    } else {
      openFile({
        id: item.id,
        name: item.name,
        path: item.name,
        content: `// ${item.name}\n\n`,
        language: item.language || "typescript",
      });
    }
  };

  const isActive = activeFileId === item.id;

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-sm text-sm transition-colors",
          isActive && "bg-accent"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {item.type === "folder" ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0" />
            )}
            <FolderOpen className="w-4 h-4 shrink-0 text-blue-500" />
          </>
        ) : (
          <>
            <div className="w-4" />
            <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
          </>
        )}
        <span className="truncate">{item.name}</span>
      </button>

      {item.type === "folder" && isExpanded && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function EditorSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-3 border-b space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">Explorer</h2>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 pl-7 text-xs"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {mockFiles.map((item) => (
            <FileTreeItem key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-2 space-y-1">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <GitBranch className="w-4 h-4 mr-2" />
          Source Control
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Package className="w-4 h-4 mr-2" />
          Extensions
        </Button>
      </div>
    </div>
  );
}
