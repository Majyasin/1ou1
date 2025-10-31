"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";

export default function Home() {
  const router = useRouter();

  return <LandingPage />;
}
