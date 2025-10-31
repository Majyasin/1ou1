"use client";

import { useState } from "react";
import {
  Settings,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Search,
  Download,
  Upload,
  Lock,
  Key,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface EnvVariable {
  id: string;
  key: string;
  value: string;
  environment: "development" | "production" | "all";
  category: string;
  description?: string;
}

const mockEnvVars: EnvVariable[] = [
  {
    id: "1",
    key: "ANTHROPIC_API_KEY",
    value: "sk-ant-api03-xxx",
    environment: "all",
    category: "AI",
    description: "Claude AI API key for code generation",
  },
  {
    id: "2",
    key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    value: "pk_test_xxx",
    environment: "all",
    category: "Authentication",
    description: "Clerk public key for authentication",
  },
  {
    id: "3",
    key: "CLERK_SECRET_KEY",
    value: "sk_test_xxx",
    environment: "production",
    category: "Authentication",
    description: "Clerk secret key (keep secure)",
  },
  {
    id: "4",
    key: "DATABASE_URL",
    value: "postgresql://user:password@localhost:5432/db",
    environment: "development",
    category: "Database",
    description: "PostgreSQL connection string",
  },
  {
    id: "5",
    key: "STRIPE_SECRET_KEY",
    value: "sk_test_xxx",
    environment: "production",
    category: "Payments",
    description: "Stripe API secret key",
  },
];

const categories = [
  "All",
  "AI",
  "Authentication",
  "Database",
  "Payments",
  "Email",
  "Storage",
  "Monitoring",
  "Other",
];

export function EnvManager() {
  const [envVars, setEnvVars] = useState<EnvVariable[]>(mockEnvVars);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEnv, setSelectedEnv] = useState<"all" | "development" | "production">("all");
  const [visibleValues, setVisibleValues] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newVar, setNewVar] = useState({
    key: "",
    value: "",
    environment: "all" as const,
    category: "Other",
    description: "",
  });

  const toggleVisibility = (id: string) => {
    setVisibleValues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = (id: string) => {
    setEnvVars(envVars.filter((v) => v.id !== id));
    toast.success("Variable deleted");
  };

  const handleAdd = () => {
    if (!newVar.key || !newVar.value) {
      toast.error("Key and value are required");
      return;
    }

    const variable: EnvVariable = {
      id: Date.now().toString(),
      ...newVar,
    };

    setEnvVars([...envVars, variable]);
    toast.success("Variable added");
    setAddDialogOpen(false);
    setNewVar({
      key: "",
      value: "",
      environment: "all",
      category: "Other",
      description: "",
    });
  };

  const handleExport = () => {
    const envContent = envVars
      .map((v) => {
        const comment = v.description ? `# ${v.description}\n` : "";
        return `${comment}${v.key}=${v.value}`;
      })
      .join("\n\n");

    const blob = new Blob([envContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `.env.${selectedEnv === "all" ? "local" : selectedEnv}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Environment file exported");
  };

  const filteredVars = envVars.filter((v) => {
    const matchesSearch =
      v.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || v.category === selectedCategory;

    const matchesEnv =
      selectedEnv === "all" ||
      v.environment === "all" ||
      v.environment === selectedEnv;

    return matchesSearch && matchesCategory && matchesEnv;
  });

  const getEnvColor = (env: string) => {
    switch (env) {
      case "development":
        return "bg-blue-100 text-blue-800";
      case "production":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-lavender" />
            <h2 className="font-semibold">Environment Variables</h2>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search variables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedEnv} onValueChange={(v: any) => setSelectedEnv(v)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 text-xs">
          <Badge variant="secondary">
            {filteredVars.length} variable{filteredVars.length !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline">
            {envVars.filter((v) => v.environment === "production").length}{" "}
            production
          </Badge>
        </div>
      </div>

      {/* Variables List */}
      <ScrollArea className="flex-1">
        {filteredVars.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No variables found</p>
            <p className="text-sm mt-1">Add your first environment variable</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {filteredVars.map((variable) => (
              <div
                key={variable.id}
                className="border rounded-lg p-3 space-y-2 hover:border-lavender transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono font-semibold">
                        {variable.key}
                      </code>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", getEnvColor(variable.environment))}
                      >
                        {variable.environment}
                      </Badge>
                      {variable.environment === "production" && (
                        <Lock className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                    {variable.description && (
                      <p className="text-xs text-muted-foreground">
                        {variable.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <code className="flex-1 text-xs font-mono px-2 py-1 bg-muted rounded truncate">
                        {visibleValues.has(variable.id)
                          ? variable.value
                          : "•".repeat(20)}
                      </code>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => toggleVisibility(variable.id)}
                    >
                      {visibleValues.has(variable.id) ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(variable.value, variable.id)}
                    >
                      {copiedId === variable.id ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(variable.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {variable.category}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Security Warning */}
      <div className="p-3 border-t bg-muted/50">
        <div className="flex gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Never commit .env files to version control. Use .env.example for
            templates.
          </p>
        </div>
      </div>

      {/* Add Variable Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Environment Variable</DialogTitle>
            <DialogDescription>
              Add a new environment variable to your project
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key *</Label>
              <Input
                id="key"
                placeholder="API_KEY"
                value={newVar.key}
                onChange={(e) => setNewVar({ ...newVar, key: e.target.value })}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                type="password"
                placeholder="your-secret-value"
                value={newVar.value}
                onChange={(e) =>
                  setNewVar({ ...newVar, value: e.target.value })
                }
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select
                value={newVar.environment}
                onValueChange={(v: any) =>
                  setNewVar({ ...newVar, environment: v })
                }
              >
                <SelectTrigger id="environment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="development">Development Only</SelectItem>
                  <SelectItem value="production">Production Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newVar.category}
                onValueChange={(v) => setNewVar({ ...newVar, category: v })}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Brief description of this variable"
                value={newVar.description}
                onChange={(e) =>
                  setNewVar({ ...newVar, description: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Variable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
