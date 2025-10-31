"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
  timestamp: Date;
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "CodeForge AI Terminal v1.0.0",
      timestamp: new Date(),
    },
    {
      type: "output",
      content: "Type 'help' for available commands",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add to history
    setHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [
      ...prev,
      { type: "input", content: `$ ${trimmedCommand}`, timestamp: new Date() },
    ]);

    // Parse command
    const parts = trimmedCommand.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Built-in commands
    switch (cmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            content: "Available commands:",
            timestamp: new Date(),
          },
          {
            type: "output",
            content: "  help           - Show this help message",
            timestamp: new Date(),
          },
          {
            type: "output",
            content: "  clear          - Clear terminal",
            timestamp: new Date(),
          },
          {
            type: "output",
            content: "  npm install    - Install dependencies",
            timestamp: new Date(),
          },
          {
            type: "output",
            content: "  npm run dev    - Start development server",
            timestamp: new Date(),
          },
          {
            type: "output",
            content: "  npm run build  - Build for production",
            timestamp: new Date(),
          },
          { type: "output", content: "  ls             - List files", timestamp: new Date() },
          { type: "output", content: "  pwd            - Print working directory", timestamp: new Date() },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "ls":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            content: "node_modules/  package.json  src/  public/  README.md",
            timestamp: new Date(),
          },
        ]);
        break;

      case "pwd":
        setLines((prev) => [
          ...prev,
          { type: "output", content: "/workspace/project", timestamp: new Date() },
        ]);
        break;

      case "npm":
        if (args[0] === "install") {
          setLines((prev) => [
            ...prev,
            { type: "output", content: "Installing packages...", timestamp: new Date() },
          ]);
          setTimeout(() => {
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                content: "✓ Dependencies installed successfully",
                timestamp: new Date(),
              },
            ]);
          }, 1500);
        } else if (args[0] === "run" && args[1] === "dev") {
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: "Starting development server...",
              timestamp: new Date(),
            },
          ]);
          setTimeout(() => {
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                content: "✓ Server running at http://localhost:3000",
                timestamp: new Date(),
              },
            ]);
          }, 1000);
        } else if (args[0] === "run" && args[1] === "build") {
          setLines((prev) => [
            ...prev,
            { type: "output", content: "Building project...", timestamp: new Date() },
          ]);
          setTimeout(() => {
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                content: "✓ Build completed successfully",
                timestamp: new Date(),
              },
            ]);
          }, 2000);
        } else {
          setLines((prev) => [
            ...prev,
            {
              type: "error",
              content: `Unknown npm command: ${args.join(" ")}`,
              timestamp: new Date(),
            },
          ]);
        }
        break;

      default:
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            content: `Command not found: ${cmd}. Type 'help' for available commands.`,
            timestamp: new Date(),
          },
        ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < history.length) {
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className={`flex flex-col bg-black text-green-400 font-mono text-sm transition-all ${
        isExpanded ? "h-screen" : "h-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="font-semibold text-white">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "input"
                  ? "text-white"
                  : "text-green-400"
              }`}
            >
              {line.content}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
        <span className="text-white">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white"
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </div>
  );
}
