"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ArrowLeft,
  Check,
  Zap,
  Database,
  Cloud,
  Mail,
  CreditCard,
  Users,
  BarChart,
  Shield,
  Globe,
  Webhook,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const integrations = [
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy your projects instantly with automatic CI/CD",
    icon: Zap,
    category: "Deployment",
    popular: true,
    connected: false,
    color: "from-black to-gray-800",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "PostgreSQL database with real-time subscriptions",
    icon: Database,
    category: "Database",
    popular: true,
    connected: false,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments and manage subscriptions",
    icon: CreditCard,
    category: "Payments",
    popular: true,
    connected: false,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "clerk",
    name: "Clerk",
    description: "Complete user management and authentication",
    icon: Users,
    category: "Authentication",
    popular: true,
    connected: true,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "resend",
    name: "Resend",
    description: "Email API for developers",
    icon: Mail,
    category: "Communication",
    popular: false,
    connected: false,
    color: "from-black to-gray-700",
  },
  {
    id: "aws",
    name: "AWS",
    description: "Cloud infrastructure and services",
    icon: Cloud,
    category: "Cloud",
    popular: false,
    connected: false,
    color: "from-orange-500 to-yellow-600",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Version control and collaboration",
    icon: GitBranch,
    category: "Development",
    popular: true,
    connected: false,
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    description: "Track user behavior and insights",
    icon: BarChart,
    category: "Analytics",
    popular: false,
    connected: false,
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "sentry",
    name: "Sentry",
    description: "Error tracking and performance monitoring",
    icon: Shield,
    category: "Monitoring",
    popular: false,
    connected: false,
    color: "from-purple-600 to-pink-600",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    description: "CDN, DNS, and DDoS protection",
    icon: Globe,
    category: "Infrastructure",
    popular: false,
    connected: false,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Custom webhook integrations",
    icon: Webhook,
    category: "Custom",
    popular: false,
    connected: false,
    color: "from-green-600 to-teal-600",
  },
];

const categories = ["All", "Deployment", "Database", "Authentication", "Payments", "Communication", "Analytics", "Development"];

export default function IntegrationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-4">
            <span className="text-black">Powerful</span>{" "}
            <span className="text-lavender">Integrations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your favorite tools and services. Build faster with pre-configured integrations.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-lavender"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-black hover:bg-black/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Integrations */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-lavender" />
              Popular Integrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations
                .filter((i) => i.popular)
                .map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
            </div>
          </motion.div>
        )}

        {/* All Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === "All" ? "All Integrations" : `${selectedCategory} Integrations`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No integrations found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Custom Integration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-black text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Need a custom integration?</h3>
          <p className="text-lg mb-6 text-gray-300">
            We can help you integrate with any service. Contact our team for enterprise solutions.
          </p>
          <Button size="lg" variant="secondary" className="bg-lavender hover:bg-lavender-dark text-white">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function IntegrationCard({ integration }: { integration: typeof integrations[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full border-2 border-gray-200 hover:border-lavender hover:shadow-xl hover:shadow-lavender/10 transition-all">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg`}>
              <integration.icon className="w-7 h-7 text-white" />
            </div>
            {integration.connected ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <Check className="w-3 h-3" />
                Connected
              </div>
            ) : (
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                {integration.category}
              </span>
            )}
          </div>
          <CardTitle className="text-xl">{integration.name}</CardTitle>
          <CardDescription className="text-gray-600">
            {integration.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {integration.connected ? (
            <Button variant="outline" className="w-full" disabled>
              <Check className="w-4 h-4 mr-2" />
              Connected
            </Button>
          ) : (
            <Button className="w-full bg-black hover:bg-black/90 text-white">
              Connect
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
