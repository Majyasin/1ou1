"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster as HotToaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <HotToaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
