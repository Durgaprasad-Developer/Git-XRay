"use client";

import { useState, KeyboardEvent } from "react";
import { trackEvent } from "@/utils/analytics";

interface LandingViewProps {
  onAnalyze: (username: string) => void;
  error: string | null;
}

type AnalysisMode = "standard" | "brutal" | "recruiter";

const DEMO_USERS = ["Durgaprasad-Developer", "torvalds", "sindresorhus"];

export default function LandingView({ onAnalyze, error }: LandingViewProps) {
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState<AnalysisMode>("standard");

  const handleModeChange = (newMode: AnalysisMode) => {
    setMode(newMode);
    trackEvent("landing_mode_changed", { mode: newMode });
  };

  const handleGo = () => {
    const user = username.trim() || "Durgaprasad-Developer";
    onAnalyze(user);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGo();
  };

  const handleDemo = (user: string) => {
    setUsername(user);
    trackEvent("demo_chip_clicked", { username: user });
    onAnalyze(user);
  };

  return (
    <section className="pt-12 pb-6">
      {/* Kicker */}
      <div className="flex items-center gap-[10px] text-[9px] text-[#1D9E75] tracking-[0.2em] uppercase mb-5">
        <span className="w-5 h-px bg-[#1D9E75]" />
        AI-powered profile analysis
      </div>

      {/* Headline */}
      <h1
        className="font-display text-[clamp(30px,5.5vw,50px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#ebebeb] mb-5"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        See what your GitHub
        <br />
        says{" "}
        <span className="text-[#5DCAA5]">about you.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[13px] text-[#b8b8b0] leading-[1.85] max-w-[470px] mb-9">
        Get an honest, recruiter-grade review of your GitHub profile in 30
        seconds. Score, archetype, top fixes, and a shareable card — no login
        required.
      </p>

      {/* Mode Tabs */}
      <div className="flex gap-[6px] mb-5">
        {(
          [
            { key: "standard", label: "📊 Standard" },
            { key: "brutal", label: "🔥 Brutal Mode" },
            { key: "recruiter", label: "💼 Recruiter Mode" },
          ] as { key: AnalysisMode; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            className={`px-4 py-[7px] rounded-full border font-mono text-[11px] cursor-pointer transition-all duration-150 ${
              mode === key
                ? "bg-[#085041] text-[#5DCAA5] border-[#0F6E56]"
                : "border-[#2e2e2e] text-[#787672] bg-transparent hover:border-[#1D9E75] hover:text-[#5DCAA5]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex gap-[10px] max-w-[540px] mb-[1.1rem]">
        <div className="flex items-center flex-1 bg-[#101010] border border-[#2e2e2e] rounded-[10px] px-4 h-[52px] transition-colors focus-within:border-[#1D9E75]">
          <span className="text-[12px] text-[#4a4a48] mr-[3px]">github.com/</span>
          <input
            id="github-username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="yourusername"
            autoComplete="off"
            className="bg-transparent border-none outline-none font-mono text-[14px] text-[#ebebeb] flex-1 placeholder:text-[#4a4a48]"
          />
        </div>
        <button
          id="analyze-button"
          onClick={handleGo}
          className="h-[52px] px-[26px] rounded-[10px] border-none bg-[#1D9E75] text-white font-mono text-[13px] font-bold cursor-pointer tracking-[0.04em] whitespace-nowrap transition-all duration-200 hover:bg-[#0F6E56] active:scale-[0.98]"
        >
          Analyze →
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-[#1a0000] border border-[#3a0000] text-[#E24B4A] text-[12px] max-w-[540px]">
          ⚠️ {error}
        </div>
      )}

      {/* Demo chips */}
      <div className="flex items-center gap-[7px] flex-wrap">
        <span className="text-[10px] text-[#4a4a48]">Try demo:</span>
        {DEMO_USERS.map((user) => (
          <button
            key={user}
            onClick={() => handleDemo(user)}
            className="text-[10px] px-[11px] py-1 rounded-full border border-[#2e2e2e] text-[#787672] cursor-pointer font-mono transition-all duration-150 bg-transparent hover:border-[#1D9E75] hover:text-[#5DCAA5] hover:bg-[#085041]"
          >
            {user}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-10 mt-10 pt-7 border-t border-[#242424]">
        {[
          { n: "14K+", l: "Profiles scanned" },
          { n: "30s", l: "Scan time" },
          { n: "4.8★", l: "User rating" },
          { n: "0", l: "Login required" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div
              className="text-[21px] font-extrabold text-[#ebebeb]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {n}
            </div>
            <div className="text-[9px] text-[#787672] mt-[3px] uppercase tracking-[0.08em]">
              {l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
