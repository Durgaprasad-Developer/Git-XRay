"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import LandingView from "@/components/landing/LandingView";
import ScanningView from "@/components/loading/ScanningView";
import ResultsView from "@/components/report/ResultsView";
import { AnalysisReport } from "@/types/report.types";
import { initAnalytics, trackEvent } from "@/utils/analytics";

type AppState = "landing" | "scanning" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [username, setUsername] = useState<string>("");
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initAnalytics();
    trackEvent("page_view", { page: "landing" });
  }, []);

  const handleAnalyze = async (user: string) => {
    setUsername(user);
    setError(null);
    setAppState("scanning");
    trackEvent("profile_analysis_started", { username: user });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const data: AnalysisReport = await response.json();
      setReport(data);
      setAppState("results");
      trackEvent("profile_analysis_success", {
        username: user,
        score: data.scores.overall,
        archetype: data.archetype,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setAppState("landing");
      console.error("[App] Analysis error:", err);
      trackEvent("profile_analysis_failed", { username: user, error: message });
    }
  };

  const handleReset = () => {
    setAppState("landing");
    setReport(null);
    setError(null);
    trackEvent("profile_analysis_reset");
  };

  return (
    <div className="max-w-[660px] mx-auto px-5">
      <TopNav onNewScan={handleReset} showNewScan={appState !== "landing"} />

      {appState === "landing" && (
        <LandingView onAnalyze={handleAnalyze} error={error} />
      )}

      {appState === "scanning" && (
        <ScanningView username={username} />
      )}

      {appState === "results" && report && (
        <ResultsView report={report} onReset={handleReset} />
      )}
    </div>
  );
}
