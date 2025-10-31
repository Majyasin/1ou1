"use client";

import { useState } from "react";
import {
  Send,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  Save,
  FolderOpen,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface Response {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  time: number;
}

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  createdAt: Date;
}

const mockSavedRequests: SavedRequest[] = [
  {
    id: "1",
    name: "Get Users",
    method: "GET",
    url: "https://api.example.com/users",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Create User",
    method: "POST",
    url: "https://api.example.com/users",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Get User by ID",
    method: "GET",
    url: "https://api.example.com/users/123",
    createdAt: new Date(),
  },
];

export function APITester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.github.com/users/octocat");
  const [headers, setHeaders] = useState<Header[]>([
    { id: "1", key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>(mockSavedRequests);

  const handleSend = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);
    const startTime = Date.now();

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock response
      const mockResponse: Response = {
        status: 200,
        statusText: "OK",
        data: {
          login: "octocat",
          id: 1,
          name: "The Octocat",
          company: "@github",
          location: "San Francisco",
          bio: "GitHub mascot",
        },
        headers: {
          "content-type": "application/json",
          "cache-control": "max-age=60",
        },
        time: Date.now() - startTime,
      };

      setResponse(mockResponse);
      toast.success("Request successful!");
    } catch (error) {
      const errorResponse: Response = {
        status: 500,
        statusText: "Internal Server Error",
        data: { error: "Failed to fetch data" },
        headers: {},
        time: Date.now() - startTime,
      };
      setResponse(errorResponse);
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHeader = () => {
    setHeaders([
      ...headers,
      { id: Date.now().toString(), key: "", value: "", enabled: true },
    ]);
  };

  const handleRemoveHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id));
  };

  const handleHeaderChange = (id: string, field: "key" | "value", value: string) => {
    setHeaders(
      headers.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  const handleToggleHeader = (id: string) => {
    setHeaders(
      headers.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h))
    );
  };

  const handleSaveRequest = () => {
    const request: SavedRequest = {
      id: Date.now().toString(),
      name: prompt("Enter request name:") || "Untitled Request",
      method,
      url,
      createdAt: new Date(),
    };
    setSavedRequests([request, ...savedRequests]);
    toast.success("Request saved!");
  };

  const handleLoadRequest = (request: SavedRequest) => {
    setMethod(request.method);
    setUrl(request.url);
    toast.success(`Loaded: ${request.name}`);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      toast.success("Response copied!");
    }
  };

  const getMethodColor = (m: string) => {
    const colors: Record<string, string> = {
      GET: "bg-green-100 text-green-800",
      POST: "bg-blue-100 text-blue-800",
      PUT: "bg-yellow-100 text-yellow-800",
      DELETE: "bg-red-100 text-red-800",
      PATCH: "bg-purple-100 text-purple-800",
    };
    return colors[m] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600";
    if (status >= 400 && status < 500) return "text-yellow-600";
    if (status >= 500) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="h-full flex bg-card">
      {/* Sidebar - Saved Requests */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-3 border-b">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Saved Requests
          </h3>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {savedRequests.map((request) => (
              <button
                key={request.id}
                onClick={() => handleLoadRequest(request)}
                className="w-full text-left p-2 rounded hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className={cn("text-xs", getMethodColor(request.method))}>
                    {request.method}
                  </Badge>
                  <span className="text-sm font-medium truncate flex-1">
                    {request.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {request.url}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Request Builder */}
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center gap-2">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
              </SelectContent>
            </Select>

            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="flex-1 font-mono text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              onClick={handleSend}
              disabled={loading}
              className="bg-lavender hover:bg-lavender-dark"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>

            <Button variant="outline" size="icon" onClick={handleSaveRequest}>
              <Save className="w-4 h-4" />
            </Button>
          </div>

          {/* Request Options */}
          <Tabs defaultValue="headers">
            <TabsList>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="params">Params</TabsTrigger>
            </TabsList>

            <TabsContent value="headers" className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  {headers.filter((h) => h.enabled).length} active
                </Label>
                <Button variant="outline" size="sm" onClick={handleAddHeader}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Header
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {headers.map((header) => (
                  <div key={header.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={header.enabled}
                      onChange={() => handleToggleHeader(header.id)}
                      className="shrink-0"
                    />
                    <Input
                      placeholder="Key"
                      value={header.key}
                      onChange={(e) =>
                        handleHeaderChange(header.id, "key", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                    <Input
                      placeholder="Value"
                      value={header.value}
                      onChange={(e) =>
                        handleHeaderChange(header.id, "value", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => handleRemoveHeader(header.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="body">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="font-mono text-xs h-32"
              />
            </TabsContent>

            <TabsContent value="params">
              <p className="text-sm text-muted-foreground">
                Query parameters coming soon...
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Response Area */}
        <div className="flex-1 flex flex-col">
          {response ? (
            <>
              {/* Response Header */}
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className={cn("text-sm", getStatusColor(response.status))}
                  >
                    {response.status === 200 ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {response.status} {response.statusText}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {response.time}ms
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Response Tabs */}
              <Tabs defaultValue="body" className="flex-1 flex flex-col">
                <TabsList className="mx-3 mt-2">
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                </TabsList>

                <TabsContent value="body" className="flex-1 mt-0">
                  <ScrollArea className="h-full">
                    <pre className="p-4 text-xs font-mono">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="headers" className="flex-1 mt-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-2 text-xs font-mono">
                          <span className="font-semibold">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Send className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No response yet</p>
                <p className="text-sm mt-1">Send a request to see the response</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
