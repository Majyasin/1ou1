"use client";

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
  Terminal,
  Layers,
  Globe,
  Star,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatFirstHero } from "./chat-first-hero";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Claude Sonnet 4 generates production-ready code from natural language with unprecedented accuracy",
  },
  {
    icon: Code2,
    title: "Professional Code Editor",
    description:
      "Monaco editor with IntelliSense, auto-completion, and real-time collaboration built-in",
  },
  {
    icon: Zap,
    title: "Instant Live Preview",
    description:
      "See changes in real-time with hot reload across desktop, tablet, and mobile viewports",
  },
  {
    icon: Database,
    title: "Visual Database Designer",
    description:
      "Design schemas visually with AI assistance, automatic migrations, and relationship mapping",
  },
  {
    icon: GitBranch,
    title: "Built-in Version Control",
    description:
      "Full versioning system with unlimited undo/redo, branching, and seamless GitHub integration",
  },
  {
    icon: Rocket,
    title: "One-Click Deployment",
    description:
      "Deploy instantly to Vercel, Netlify, or custom servers with zero configuration required",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with live cursors, instant sync, and team permissions",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Military-grade sandboxed execution, encrypted storage, and SOC 2 Type II compliance",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender-light/30 via-white to-lavender-light/20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lavender/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-lavender-light/40 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black">
              CodeForge AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/templates")}>
              Templates
            </Button>
            <Button variant="ghost" onClick={() => router.push("/projects")}>
              Projects
            </Button>
            <Button variant="ghost" onClick={() => router.push("/integrations")}>
              Integrations
            </Button>
            <Button onClick={() => router.push("/sign-in")} variant="outline">
              Sign In
            </Button>
            <Button onClick={() => router.push("/sign-up")} className="gap-2 bg-black hover:bg-black/90 text-white">
              <Sparkles className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Chat-First Hero */}
      <ChatFirstHero />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light border border-lavender/30 mb-6">
            <Layers className="w-4 h-4 text-lavender" />
            <span className="text-sm font-medium text-black">Powerful Features</span>
          </motion.div>
          <motion.h2 variants={item} className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-black">Everything you need,</span>
            <br />
            <span className="text-lavender">
              Built right in
            </span>
          </motion.h2>
          <motion.p variants={item} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade tools and features that professional developers love
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} className="group">
              <div className="h-full p-6 rounded-2xl bg-white backdrop-blur-sm border border-gray-200 hover:border-lavender/50 transition-all hover:shadow-xl hover:shadow-lavender/10 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-black mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black group-hover:text-lavender transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-black"
        >
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative px-12 py-20 text-center text-white">
            <Rocket className="w-16 h-16 mx-auto mb-6 animate-bounce text-lavender" />
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers building the future with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                disabled={isLoading}
                className="text-lg px-10 py-7 rounded-xl bg-lavender hover:bg-lavender-dark text-white shadow-2xl hover:shadow-xl transition-all"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-black" />
            <span className="font-semibold text-black">CodeForge AI</span>
          </div>
          <p className="text-sm text-gray-600">
            Built with Next.js, TypeScript, and Claude Sonnet 4
          </p>
          <p className="text-sm text-gray-600">
            © 2024 CodeForge AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
