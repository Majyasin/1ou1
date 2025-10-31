"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  Globe,
  Lock,
  Code,
  QrCode,
  GitFork,
  Mail,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
}

export function ShareDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: ShareDialogProps) {
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate share URL
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/share/${projectId}`;
  const embedCode = `<iframe src="${shareUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = async (text: string, setStateFn: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setStateFn(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setStateFn(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleToggleVisibility = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsPublic(!isPublic);
    toast.success(`Project is now ${!isPublic ? "public" : "private"}`);
    setLoading(false);
  };

  const handleFork = () => {
    toast.success("Forking project...");
    // TODO: Implement fork functionality
  };

  const handleShare = (platform: string) => {
    const text = `Check out my project: ${projectName}`;
    const url = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${encodedText}&body=${url}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>
            Share your project with others or embed it in your website
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="fork">Fork</TabsTrigger>
          </TabsList>

          {/* Share Link Tab */}
          <TabsContent value="link" className="space-y-4">
            <div className="space-y-3">
              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {isPublic ? (
                    <Globe className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <div className="font-medium">
                      {isPublic ? "Public" : "Private"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isPublic
                        ? "Anyone with the link can view"
                        : "Only you can access"}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleVisibility}
                  disabled={loading}
                >
                  {loading
                    ? "Updating..."
                    : isPublic
                    ? "Make Private"
                    : "Make Public"}
                </Button>
              </div>

              {/* Share URL */}
              {isPublic && (
                <div className="space-y-2">
                  <Label>Share Link</Label>
                  <div className="flex gap-2">
                    <Input
                      value={shareUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(shareUrl, setCopied)}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Anyone with this link can view your project
                  </p>
                </div>
              )}

              {/* QR Code */}
              {isPublic && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <QrCode className="w-5 h-5" />
                  <span className="text-sm">Generate QR Code (Coming Soon)</span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Embed Tab */}
          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5" />
                <span className="font-medium">Embed Code</span>
              </div>

              {isPublic ? (
                <>
                  <div className="space-y-2">
                    <Label>HTML Embed Code</Label>
                    <div className="relative">
                      <pre className="p-3 bg-muted rounded-lg overflow-x-auto text-xs font-mono">
                        {embedCode}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleCopy(embedCode, setEmbedCopied)}
                      >
                        {embedCopied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-lg p-4 bg-muted">
                      <div className="aspect-video bg-background rounded flex items-center justify-center text-sm text-muted-foreground">
                        Your project will appear here
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Make your project public to enable embedding
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={handleToggleVisibility}
                  >
                    Make Public
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Social Sharing Tab */}
          <TabsContent value="social" className="space-y-4">
            {isPublic ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share on Social Media</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleShare("email")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Lock className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Make your project public to share on social media
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={handleToggleVisibility}
                >
                  Make Public
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Fork Tab */}
          <TabsContent value="fork" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <GitFork className="w-5 h-5" />
                <span className="font-medium">Fork Project</span>
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Create Your Own Copy</h4>
                  <p className="text-sm text-muted-foreground">
                    Forking creates a personal copy of this project that you can
                    modify freely without affecting the original.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Current: {projectName}</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">{projectName} (fork)</Badge>
                </div>

                <Button onClick={handleFork} className="w-full">
                  <GitFork className="w-4 h-4 mr-2" />
                  Fork This Project
                </Button>
              </div>

              {isPublic && (
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <p className="text-muted-foreground">
                    <strong>Note:</strong> This project is public. Anyone can fork
                    it.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
