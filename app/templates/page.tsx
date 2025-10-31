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
} from "lucide-react";
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
import { motion } from "framer-motion";

const templates = [
  {
    id: "1",
    name: "SaaS Landing Page",
    description: "Modern landing page with pricing, features, and testimonials",
    icon: Sparkles,
    tags: ["Marketing", "SaaS"],
    preview: "/templates/saas-landing.png",
  },
  {
    id: "2",
    name: "E-commerce Store",
    description:
      "Full-featured online store with cart, checkout, and product catalog",
    icon: ShoppingCart,
    tags: ["E-commerce", "Full-stack"],
    preview: "/templates/ecommerce.png",
  },
  {
    id: "3",
    name: "Dashboard App",
    description: "Admin dashboard with charts, tables, and analytics",
    icon: Zap,
    tags: ["Dashboard", "Analytics"],
    preview: "/templates/dashboard.png",
  },
  {
    id: "4",
    name: "Social Network",
    description: "Social platform with posts, comments, and user profiles",
    icon: Users,
    tags: ["Social", "Full-stack"],
    preview: "/templates/social.png",
  },
  {
    id: "5",
    name: "Blog Platform",
    description: "Content management system with markdown support",
    icon: FileText,
    tags: ["Blog", "CMS"],
    preview: "/templates/blog.png",
  },
  {
    id: "6",
    name: "Portfolio Site",
    description: "Professional portfolio with projects and contact form",
    icon: Briefcase,
    tags: ["Portfolio", "Personal"],
    preview: "/templates/portfolio.png",
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleUseTemplate = (templateId: string) => {
    router.push(`/editor?template=${templateId}`);
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
            Start with a professionally designed template and customize it with
            AI
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <template.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted rounded-md text-xs"
                    >
                      {tag}
                    </span>
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
          ))}
        </motion.div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No templates found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
