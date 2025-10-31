"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Rocket,
  Share2,
  Download,
  MessageSquare,
  Settings,
  Command,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: MessageSquare,
      label: "AI Chat",
      shortcut: "⌘K",
      action: () => {
        toast.success("Opening AI Chat...");
        // Toggle AI chat panel
      },
    },
    {
      icon: Rocket,
      label: "Deploy",
      shortcut: "⌘D",
      action: () => {
        toast.success("Deploying project...");
      },
    },
    {
      icon: Share2,
      label: "Share",
      shortcut: "⌘S",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      },
    },
    {
      icon: Download,
      label: "Export",
      shortcut: "⌘E",
      action: () => {
        toast.success("Exporting project...");
      },
    },
    {
      icon: Settings,
      label: "Settings",
      shortcut: "⌘,",
      action: () => {
        toast.success("Opening settings...");
      },
    },
  ];

  return (
    <>
      {/* Main FAB Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-14 h-14 rounded-full bg-black hover:bg-black/90 text-white shadow-2xl shadow-lavender/30 hover:shadow-lavender/40 transition-all"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-2 min-w-[240px]">
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-lavender-light rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-black">{action.label}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {action.shortcut}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}
