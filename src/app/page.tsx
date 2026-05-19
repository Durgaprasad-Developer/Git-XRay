"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import LandingView from "@/components/landing/LandingView";
import { initAnalytics, trackEvent } from "@/utils/analytics";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    initAnalytics();
    trackEvent("page_view", { page: "landing" });
  }, []);

  const handleAnalyze = (user: string) => {
    const cleanUser = user.trim();
    if (cleanUser) {
      trackEvent("profile_analysis_initiated", { username: cleanUser });
      router.push(`/${encodeURIComponent(cleanUser)}`);
    }
  };

  return (
    <LandingView onAnalyze={handleAnalyze} error={error} />
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="max-w-[660px] mx-auto px-5">
      <TopNav onNewScan={() => router.push("/")} showNewScan={false} />
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center font-mono text-[11px] text-[#787672]">
          Loading interface...
        </div>
      }>
        <HomeContent />
      </Suspense>
    </div>
  );
}
