"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone, RotateCcw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/lib/store/editor-store";
import { cn } from "@/lib/utils";

const deviceSizes = {
  desktop: { width: "100%", height: "100%" },
  tablet: { width: "768px", height: "1024px" },
  mobile: { width: "375px", height: "667px" },
};

export function PreviewPanel() {
  const { previewMode, setPreviewMode } = useEditorStore();
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          <Button
            variant={previewMode === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("desktop")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("tablet")}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4">
        <div className="mx-auto" style={deviceSizes[previewMode]}>
          <iframe
            key={key}
            className={cn(
              "w-full h-full bg-white rounded-lg shadow-2xl",
              previewMode !== "desktop" && "border-8 border-gray-800"
            )}
            sandbox="allow-scripts allow-same-origin allow-forms"
            srcDoc={`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                </style>
              </head>
              <body>
                <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                  <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">
                      Welcome to CodeForge AI
                    </h1>
                    <p class="text-lg text-gray-600 mb-8">
                      Start building your application with AI assistance.
                      Your changes will appear here in real-time.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-2">Feature 1</h3>
                        <p class="text-gray-600">
                          AI-powered code generation with Claude Sonnet 4
                        </p>
                      </div>
                      <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-2">Feature 2</h3>
                        <p class="text-gray-600">
                          Real-time preview with hot reload
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `}
          />
        </div>
      </div>
    </div>
  );
}
