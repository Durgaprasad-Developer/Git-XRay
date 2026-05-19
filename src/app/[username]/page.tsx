"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import ScanningView from "@/components/loading/ScanningView";
import ResultsView from "@/components/report/ResultsView";
import { AnalysisReport } from "@/types/report.types";
import { initAnalytics, trackEvent } from "@/utils/analytics";

export default function CandidatePage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract and decode username parameter safely
  const rawUsername = params.username as string;
  const username = rawUsername ? decodeURIComponent(rawUsername).trim() : "";

  const [appState, setAppState] = useState<"scanning" | "results">("scanning");
  const [report, setReport] = useState<AnalysisReport | null>(null);

  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }

    initAnalytics();
    trackEvent("profile_analysis_started", { username });

    const runAnalysis = async () => {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Analysis failed");
        }

        const data: AnalysisReport = await response.json();
        setReport(data);
        setAppState("results");
        trackEvent("profile_analysis_success", {
          username,
          score: data.scores.overall,
          archetype: data.archetype,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        console.error(`[Candidate Page] Analysis error for ${username}:`, err);
        trackEvent("profile_analysis_failed", { username, error: message });
        
        // Redirect back to landing page with the error details in query params
        router.push(`/?error=${encodeURIComponent(message)}`);
      }
    };

    runAnalysis();
  }, [username, router]);

  const handleReset = () => {
    trackEvent("profile_analysis_reset");
    router.push("/");
  };

  return (
    <div className={`${appState === "results" ? "max-w-[1240px]" : "max-w-[660px]"} mx-auto px-5 transition-all duration-300`}>
      <TopNav onNewScan={handleReset} showNewScan={appState === "results"} />

      {appState === "scanning" && (
        <ScanningView username={username} />
      )}

      {appState === "results" && report && (
        <ResultsView report={report} onReset={handleReset} />
      )}
    </div>
  );
}
