"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Store",
    description: "Full-stack online store with Stripe integration",
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Personal portfolio with blog and project showcase",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: "3",
    name: "Dashboard App",
    description: "Analytics dashboard with real-time data",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState(mockProjects);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    router.push("/editor");
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Projects</h1>
              <p className="text-muted-foreground text-lg">
                Manage and organize your AI-generated applications
              </p>
            </div>
            <Button size="lg" onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleOpenProject(project.id)}
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Updated {getTimeAgo(project.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(project.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Open Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No projects found matching your search."
                : "No projects yet. Create your first project to get started!"}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Project
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
