"use client";

import { useState, useRef, useEffect } from "react";
import {
  FileText,
  FolderOpen,
  Plus,
  Search,
  GitBranch,
  Package,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  FilePlus,
  FolderPlus,
  Edit3,
  Trash2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditorStore } from "@/lib/store/editor-store";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

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
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function FileTreeItem({
  item,
  level = 0,
  onRename,
  onDelete,
  onDuplicate,
}: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameName, setRenameName] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openFile, activeFileId } = useEditorStore();

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleClick = () => {
    if (isRenaming) return;

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

  const handleRenameSubmit = () => {
    if (renameName.trim() && renameName !== item.name) {
      onRename(item.id, renameName.trim());
    }
    setIsRenaming(false);
    setRenameName(item.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRenameSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
      setRenameName(item.name);
    }
  };

  const isActive = activeFileId === item.id;

  return (
    <div>
      <div
        className={cn(
          "w-full flex items-center gap-1 px-2 py-1 hover:bg-accent rounded-sm text-sm transition-colors group",
          isActive && "bg-accent"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <button onClick={handleClick} className="flex items-center gap-2 flex-1 min-w-0">
          {item.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 shrink-0" />
              )}
              <FolderOpen className="w-4 h-4 shrink-0 text-lavender" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
            </>
          )}
          {isRenaming ? (
            <Input
              ref={inputRef}
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleKeyDown}
              className="h-5 px-1 text-xs"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(item.id)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(item.id)}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.type === "folder" && isExpanded && item.children && (
        <div>
          {item.children.map((child: any) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onRename={onRename}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EditorSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState(mockFiles);
  const [createDialog, setCreateDialog] = useState<{
    open: boolean;
    type: "file" | "folder";
  }>({ open: false, type: "file" });
  const [newItemName, setNewItemName] = useState("");

  const handleCreateItem = () => {
    if (!newItemName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      type: createDialog.type,
      language: createDialog.type === "file" ? "typescript" : undefined,
      children: createDialog.type === "folder" ? [] : undefined,
    };

    setFiles([...files, newItem]);
    toast.success(
      `${createDialog.type === "file" ? "File" : "Folder"} created successfully`
    );
    setCreateDialog({ open: false, type: "file" });
    setNewItemName("");
  };

  const handleRename = (id: string, newName: string) => {
    const renameInTree = (items: any[]): any[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        if (item.children) {
          return { ...item, children: renameInTree(item.children) };
        }
        return item;
      });
    };

    setFiles(renameInTree(files));
    toast.success("Renamed successfully");
  };

  const handleDelete = (id: string) => {
    const deleteFromTree = (items: any[]): any[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.children) {
            return { ...item, children: deleteFromTree(item.children) };
          }
          return item;
        });
    };

    setFiles(deleteFromTree(files));
    toast.success("Deleted successfully");
  };

  const handleDuplicate = (id: string) => {
    const findAndDuplicate = (items: any[]): any[] => {
      const newItems = [...items];
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].id === id) {
          const duplicate = {
            ...newItems[i],
            id: Date.now().toString(),
            name: `${newItems[i].name} (copy)`,
          };
          newItems.splice(i + 1, 0, duplicate);
          toast.success("Duplicated successfully");
          return newItems;
        }
        if (newItems[i].children) {
          newItems[i].children = findAndDuplicate(newItems[i].children);
        }
      }
      return newItems;
    };

    setFiles(findAndDuplicate(files));
  };

  const filteredFiles = searchQuery
    ? files.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : files;

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-3 border-b space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">Explorer</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setCreateDialog({ open: true, type: "file" })}
              >
                <FilePlus className="w-4 h-4 mr-2" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCreateDialog({ open: true, type: "folder" })}
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {filteredFiles.map((item) => (
            <FileTreeItem
              key={item.id}
              item={item}
              onRename={handleRename}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
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

      {/* Create File/Folder Dialog */}
      <Dialog
        open={createDialog.open}
        onOpenChange={(open) =>
          setCreateDialog({ ...createDialog, open })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create New {createDialog.type === "file" ? "File" : "Folder"}
            </DialogTitle>
            <DialogDescription>
              Enter a name for your new{" "}
              {createDialog.type === "file" ? "file" : "folder"}.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder={
              createDialog.type === "file"
                ? "example.tsx"
                : "folder-name"
            }
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateItem();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateDialog({ open: false, type: "file" });
                setNewItemName("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateItem}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
