"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  Sparkles,
  Zap,
  ShoppingCart,
  Users,
  FileText,
  Briefcase,
  Code2,
  Rocket,
  Database,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  tech: string[];
  popular: boolean;
  tags: string[];
}

const templates: Template[] = [
  {
    id: "react-app",
    name: "React App",
    description: "Modern React application with TypeScript, Tailwind CSS, and best practices",
    icon: Code2,
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    popular: true,
    tags: ["Frontend", "React"],
  },
  {
    id: "nextjs-app",
    name: "Next.js App",
    description: "Full-stack Next.js 14 app with App Router, server components, and API routes",
    icon: Layers,
    category: "Full-stack",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    popular: true,
    tags: ["Full-stack", "Next.js"],
  },
  {
    id: "saas-starter",
    name: "SaaS Starter",
    description: "Complete SaaS boilerplate with auth, payments, dashboard, and landing page",
    icon: Rocket,
    category: "Full-stack",
    tech: ["Next.js", "Clerk", "Stripe", "PostgreSQL"],
    popular: true,
    tags: ["SaaS", "Full-stack"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Full-featured online store with cart, checkout, and payment integration",
    icon: ShoppingCart,
    category: "Full-stack",
    tech: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    popular: true,
    tags: ["E-commerce", "Full-stack"],
  },
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "Analytics dashboard with charts, tables, and data visualization",
    icon: Zap,
    category: "Frontend",
    tech: ["React", "TypeScript", "Recharts", "Tailwind"],
    popular: false,
    tags: ["Dashboard", "Analytics"],
  },
  {
    id: "blog-cms",
    name: "Blog & CMS",
    description: "Content management system with markdown support and admin dashboard",
    icon: FileText,
    category: "Full-stack",
    tech: ["Next.js", "MDX", "PostgreSQL", "Prisma"],
    popular: false,
    tags: ["Blog", "CMS"],
  },
  {
    id: "portfolio",
    name: "Portfolio Site",
    description: "Professional portfolio with projects and contact form",
    icon: Briefcase,
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind", "Framer"],
    popular: false,
    tags: ["Portfolio", "Personal"],
  },
  {
    id: "ai-app",
    name: "AI Application",
    description: "AI-powered app with Claude integration, streaming, and chat interface",
    icon: Sparkles,
    category: "Full-stack",
    tech: ["Next.js", "Anthropic", "Streaming", "Tailwind"],
    popular: true,
    tags: ["AI", "Full-stack"],
  },
  {
    id: "social-network",
    name: "Social Network",
    description: "Social platform with posts, comments, and user profiles",
    icon: Users,
    category: "Full-stack",
    tech: ["Next.js", "Clerk", "PostgreSQL", "Prisma"],
    popular: false,
    tags: ["Social", "Full-stack"],
  },
  {
    id: "api-backend",
    name: "API Backend",
    description: "RESTful API with authentication, database, and documentation",
    icon: Database,
    category: "Backend",
    tech: ["Node.js", "Express", "PostgreSQL", "Swagger"],
    popular: false,
    tags: ["Backend", "API"],
  },
];

const categories = ["All", "Frontend", "Full-stack", "Backend"];

export default function TemplatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tech.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const popularTemplates = templates.filter((t) => t.popular);

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    toast.success(`Creating project from ${template?.name}...`);

    // Store template selection
    sessionStorage.setItem("selectedTemplate", templateId);

    // Redirect to editor
    setTimeout(() => {
      router.push("/editor");
    }, 500);
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

          <h1 className="text-4xl font-bold mb-2">Project Templates</h1>
          <p className="text-muted-foreground text-lg">
            Start with a professionally designed template and customize it with AI
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search templates by name, tech stack, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Templates */}
        {selectedCategory === "All" && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Templates</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {popularTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-all hover:border-lavender cursor-pointer"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-lavender-light flex items-center justify-center mb-4">
                      <template.icon className="w-6 h-6 text-lavender" />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {template.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {template.tech.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery
              ? `Search Results (${filteredTemplates.length})`
              : selectedCategory === "All"
              ? "All Templates"
              : `${selectedCategory} Templates`}
          </h2>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No templates found matching your search.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all hover:border-lavender cursor-pointer h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-lavender-light flex items-center justify-center shrink-0">
                          <template.icon className="w-6 h-6 text-lavender" />
                        </div>
                        {template.popular && (
                          <Badge className="bg-lavender text-white">Popular</Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm line-clamp-2 mt-2">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-1">
                        {template.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
