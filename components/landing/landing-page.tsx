"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Terminal,
  Layers,
  Globe,
  Star,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Claude Sonnet 4 generates production-ready code from natural language with unprecedented accuracy",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Code2,
    title: "Professional Code Editor",
    description:
      "Monaco editor with IntelliSense, auto-completion, and real-time collaboration built-in",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Instant Live Preview",
    description:
      "See changes in real-time with hot reload across desktop, tablet, and mobile viewports",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Database,
    title: "Visual Database Designer",
    description:
      "Design schemas visually with AI assistance, automatic migrations, and relationship mapping",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: GitBranch,
    title: "Built-in Version Control",
    description:
      "Full versioning system with unlimited undo/redo, branching, and seamless GitHub integration",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Rocket,
    title: "One-Click Deployment",
    description:
      "Deploy instantly to Vercel, Netlify, or custom servers with zero configuration required",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with live cursors, instant sync, and team permissions",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Military-grade sandboxed execution, encrypted storage, and SOC 2 Type II compliance",
    gradient: "from-red-500 to-orange-500",
  },
];

const stats = [
  { value: "10x", label: "Faster Development", icon: Zap },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
  { value: "50+", label: "Languages Supported", icon: Globe },
  { value: "100k+", label: "Projects Created", icon: Rocket },
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
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-cyan-500/5" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
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
            <Button onClick={handleGetStarted} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Launch Editor
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-primary/10 via-violet-500/10 to-primary/10 border border-primary/20 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              Powered by Claude Sonnet 4 - The Most Advanced AI
            </span>
            <Star className="w-4 h-4 text-primary fill-primary" />
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Build Production
              <br />
              Apps in
            </span>{" "}
            <span className="bg-gradient-to-r from-violet-600 via-primary to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Seconds
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            The world's most advanced AI-powered application builder.
            <br />
            <span className="text-foreground/80 font-medium">
              Transform ideas into production-ready code instantly.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={handleGetStarted}
              disabled={isLoading}
              className="text-lg px-10 py-7 rounded-xl bg-gradient-to-r from-primary via-violet-600 to-primary bg-size-200 animate-gradient shadow-2xl shadow-primary/50 hover:shadow-primary/60 transition-all"
            >
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 w-5 h-5" />
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 rounded-xl border-2 hover:bg-accent/50 backdrop-blur-sm"
              onClick={() => router.push("/templates")}
            >
              <Layers className="mr-2 w-5 h-5" />
              Browse Templates
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-primary to-cyan-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-border/40 bg-card/80 backdrop-blur-xl shadow-2xl">
              <div className="bg-muted/30 px-6 py-4 flex items-center gap-3 border-b border-border/40 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    CodeForge AI Editor
                  </span>
                </div>
                <div className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-violet-500/10 via-background to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5" />
                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-600/20 backdrop-blur-sm border border-primary/20 mb-6">
                    <Terminal className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-xl font-medium mb-2">Your AI-powered workspace</p>
                  <p className="text-muted-foreground">Start building in seconds</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </motion.div>
          <motion.h2 variants={item} className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Everything you need,
            <br />
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              Built right in
            </span>
          </motion.h2>
          <motion.p variants={item} className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <div className="h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-primary to-cyan-600" />
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative px-12 py-20 text-center text-white">
            <Rocket className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers building the future with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleGetStarted}
                disabled={isLoading}
                className="text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-xl transition-all"
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
      <footer className="container mx-auto px-4 py-12 border-t border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-semibold">CodeForge AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, and Claude Sonnet 4
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 CodeForge AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
