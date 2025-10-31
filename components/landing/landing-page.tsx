"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Zap,
  Database,
  GitBranch,
  Rocket,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Claude Sonnet 4 generates production-ready code from natural language",
  },
  {
    icon: Code2,
    title: "Advanced Code Editor",
    description:
      "Monaco editor with IntelliSense, auto-completion, and real-time collaboration",
  },
  {
    icon: Zap,
    title: "Live Preview",
    description:
      "See your changes instantly with hot reload across multiple devices",
  },
  {
    icon: Database,
    title: "Visual Database Designer",
    description:
      "Design schemas visually with AI assistance and instant migration",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description:
      "Built-in versioning with unlimited undo/redo and GitHub integration",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description:
      "Deploy to Vercel, Netlify, or custom servers with zero configuration",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together like Figma with live cursors and instant updates",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Sandboxed execution, encrypted storage, and SOC 2 compliance",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              Powered by Claude Sonnet 4
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build Apps with AI
            <br />
            <span className="text-primary">10x Faster</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The ultimate AI-powered full-stack application builder. Generate,
            edit, and deploy production-ready code in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleGetStarted}
              disabled={isLoading}
              className="text-lg px-8 py-6"
            >
              {isLoading ? "Loading..." : "Start Building"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => router.push("/templates")}
            >
              Explore Templates
            </Button>
          </div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 rounded-xl border bg-card shadow-2xl overflow-hidden"
          >
            <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-sm text-muted-foreground">
                CodeForge AI Editor
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center">
                <Code2 className="w-24 h-24 text-primary/40 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Your AI-powered workspace awaits
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to build apps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All the tools and features you need to go from idea to production
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-12 text-center text-primary-foreground"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to build?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start creating your next application with AI assistance
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleGetStarted}
            disabled={isLoading}
            className="text-lg px-8 py-6"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2024 CodeForge AI. Built with Next.js, TypeScript, and Claude
            Sonnet 4.
          </p>
        </div>
      </footer>
    </div>
  );
}
