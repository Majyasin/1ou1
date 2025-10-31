import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeForge AI - AI-Powered Full-Stack App Builder",
  description:
    "Build full-stack applications with AI assistance. The ultimate alternative to Lovable with advanced features and powerful AI code generation.",
  keywords: [
    "AI",
    "code generation",
    "web development",
    "full-stack",
    "app builder",
    "low-code",
    "no-code",
  ],
  authors: [{ name: "CodeForge AI" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
