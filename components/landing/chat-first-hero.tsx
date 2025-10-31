"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Build a SaaS landing page with pricing tiers",
  "Create a todo app with authentication",
  "Build an e-commerce store with Stripe",
  "Make a blog with markdown support",
  "Create a dashboard with charts",
  "Build a social media feed",
];

export function ChatFirstHero() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Store prompt in session storage for editor to use
    sessionStorage.setItem("initialPrompt", prompt);
    router.push("/editor");
  };

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-lavender-light border border-lavender/30"
          >
            <Sparkles className="w-4 h-4 text-lavender" />
            <span className="text-sm font-medium text-black">
              Powered by Claude Sonnet 4
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="text-black">What do you</span>
            <br />
            <span className="text-lavender">want to build?</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Describe your idea in natural language. Our AI will generate a
            complete, production-ready application in seconds.
          </p>
        </motion.div>

        {/* Chat Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative mb-8"
        >
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Build a modern portfolio website with a blog, contact form, and dark mode..."
              className="w-full min-h-[140px] px-6 py-5 text-lg rounded-2xl border-2 border-gray-200 focus:border-lavender focus:outline-none focus:ring-4 focus:ring-lavender/10 resize-none bg-white shadow-xl shadow-lavender/5 transition-all"
              disabled={isGenerating}
            />
            <div className="absolute bottom-5 right-5 flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {prompt.length}/2000
              </span>
              <Button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                size="lg"
                className="bg-black hover:bg-black/90 text-white shadow-lg shadow-lavender/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <p className="text-sm text-gray-500 text-center mb-4">
            Or try one of these:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => handleSuggestion(suggestion)}
                className="px-4 py-3 text-left text-sm bg-white border border-gray-200 rounded-xl hover:border-lavender hover:shadow-md hover:shadow-lavender/10 transition-all group"
              >
                <span className="text-gray-700 group-hover:text-black">
                  {suggestion}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>100k+ projects created</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lavender" />
            <span>10x faster than traditional coding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-black" />
            <span>Production-ready code</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
