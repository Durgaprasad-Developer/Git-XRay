"use client";

import { useState, useEffect } from "react";
import { AnalysisReport } from "@/types/report.types";
import ScoreGauge from "./ScoreGauge";
import { trackEvent } from "@/utils/analytics";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
import ShareCard from "./ShareCard";

interface ResultsViewProps {
  report: AnalysisReport;
  onReset: () => void;
}

type ReviewMode = "standard" | "brutal" | "recruiter";

function scoreColor(score: number): string {
  if (score >= 75) return "#5DCAA5";
  if (score >= 50) return "#EF9F27";
  return "#E24B4A";
}

function scoreBg(score: number): string {
  if (score >= 75) return "#1D9E75";
  if (score >= 50) return "#EF9F27";
  return "#E24B4A";
}

export default function ResultsView({ report, onReset }: ResultsViewProps) {
  const [reviewMode, setReviewMode] = useState<ReviewMode>("standard");
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { profile, scores, archetype, archetypeEmoji, topRepositories, techStack, recruiterImpression, review, improvements, shareCard } = report;

  const subscores = [
    { label: "Consistency", value: scores.consistency },
    { label: "Project Quality", value: scores.projectQuality },
    { label: "Open Source", value: scores.openSource },
    { label: "Profile Branding", value: scores.profileBranding },
    { label: "Technical Depth", value: scores.technicalDepth },
    { label: "Recruiter Ready", value: scores.recruiterReady },
  ];

  const reviewContent = {
    standard: { title: "Honest Review", body: review.standard },
    brutal: { title: "🔥 Brutal Roast", body: review.brutal },
    recruiter: { title: "💼 Recruiter Lens (15-sec scan)", body: review.recruiter },
  };

  const AVG_SCORE = 58;
  const TOP10_SCORE = 91;

  return (
    <section className="pt-5 pb-12">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={onReset}
          className="text-[11px] text-[#787672] hover:text-[#ebebeb] transition-colors cursor-pointer bg-transparent border-none font-mono"
        >
          ← scan another
        </button>
        <div className="flex items-center gap-2 bg-[#101010] border border-[#242424] rounded-full px-[14px] py-[5px] pl-[5px]">
          <div className="w-6 h-6 rounded-full bg-[#085041] flex items-center justify-center text-[9px] font-bold text-[#5DCAA5]">
            {profile.username.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-[11px] text-[#b8b8b0]">{profile.username}</span>
        </div>
      </div>

      {/* Score Hero */}
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-[14px] p-7 mb-[10px] grid gap-6 items-center"
        style={{ gridTemplateColumns: "160px 1fr" }}>
        <ScoreGauge score={scores.overall} />
        <div>
          <div className="flex items-center gap-[10px] mb-[10px]">
            <span className="inline-flex items-center gap-[6px] bg-[#085041] text-[#5DCAA5] text-[11px] font-bold px-[13px] py-[6px] rounded-full border border-[#0F6E56] tracking-[0.04em]">
              <span className="text-[8px]">◆</span>
              {archetypeEmoji} {archetype}
            </span>
          </div>
          <div className="inline-block mb-[10px] text-[10px] text-[#EF9F27] bg-[#1a1200] border border-[#3a2a00] px-[11px] py-[5px] rounded-full">
            Top {profile.percentile}% of developers
          </div>
          <p className="text-[13px] text-[#b8b8b0] leading-[1.7] mb-3">
            {stripHtml(review.standard).slice(0, 130)}…
          </p>
          {/* vs bar */}
          <div className="bg-[#1f1f1f] rounded-md px-3 py-[10px]">
            <div className="text-[9px] text-[#787672] uppercase tracking-[0.1em] mb-[6px]">vs average developer</div>
            <div className="h-1 bg-[#242424] rounded-full relative overflow-hidden">
              <div
                className="h-full bg-[#1D9E75] rounded-full relative score-bar-fill"
                style={{ width: barsAnimated ? `${scores.overall}%` : "0%" }}
              >
                <div
                  className="absolute top-[-4px] w-[2px] h-3 bg-[#787672] rounded-[1px]"
                  style={{ left: `calc(${AVG_SCORE}% / ${scores.overall}% * 100%)` }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-[6px] text-[9px] text-[#787672]">
              <span className="text-[#5DCAA5]">You · {scores.overall}</span>
              <span>Avg · {AVG_SCORE}</span>
              <span>Top 10% · {TOP10_SCORE}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode row */}
      <div className="flex gap-[6px] mb-[10px]">
        {(
          [
            { key: "standard", label: "📊 Standard view" },
            { key: "brutal", label: "🔥 Roast me" },
            { key: "recruiter", label: "💼 Recruiter view" },
          ] as { key: ReviewMode; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            id={`review-mode-${key}`}
            onClick={() => {
              setReviewMode(key);
              trackEvent("review_mode_switched", { mode: key, username: profile.username });
            }}
            className={`flex-1 h-[38px] rounded-lg border font-mono text-[11px] cursor-pointer transition-all duration-150 ${
              reviewMode === key
                ? key === "brutal"
                  ? "bg-[#0a0200] border-[#E24B4A] text-[#E24B4A]"
                  : "bg-[#085041] border-[#1D9E75] text-[#5DCAA5]"
                : "border-[#2e2e2e] text-[#787672] bg-transparent hover:border-[#1D9E75] hover:text-[#5DCAA5]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Subscores grid */}
      <div className="grid grid-cols-2 gap-2 mb-[10px]">
        {subscores.map(({ label, value }) => (
          <div key={label} className="bg-[#101010] border border-[#242424] rounded-[10px] p-[14px_14px_12px]">
            <div className="text-[8px] text-[#787672] uppercase tracking-[0.12em] mb-[7px]">{label}</div>
            <div
              className="font-display text-[24px] font-extrabold leading-none mb-[7px]"
              style={{ fontFamily: "Syne, sans-serif", color: scoreColor(value) }}
            >
              {value}<small className="text-[11px] text-[#4a4a48] font-mono font-normal">/100</small>
            </div>
            <div className="h-[3px] bg-[#242424] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full score-bar-fill"
                style={{
                  width: barsAnimated ? `${value}%` : "0%",
                  background: scoreBg(value),
                  transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Review section */}
      <div className="bg-[#101010] border border-[#242424] rounded-[12px] p-5 mb-[10px]">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#787672] mb-4 flex items-center gap-2">
          <span className="inline-block w-[3px] h-[11px] bg-[#1D9E75] rounded-[2px]" />
          {reviewContent[reviewMode].title}
        </div>
        <p
          className="text-[13px] text-[#b8b8b0] leading-[1.9] border-l-2 border-[#085041] pl-4"
          dangerouslySetInnerHTML={{ __html: reviewContent[reviewMode].body }}
        />
      </div>

      {/* Recruiter Impression */}
      <div className="bg-[#101010] border border-[#242424] rounded-[12px] p-5 mb-[10px]">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#787672] mb-4 flex items-center gap-2">
          <span className="inline-block w-[3px] h-[11px] bg-[#1D9E75] rounded-[2px]" />
          Recruiter Impression · First 15 Seconds
        </div>
        <div className="flex flex-col gap-[6px]">
          {recruiterImpression.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-[10px] px-3 py-[9px] rounded-lg ${
                item.isVerdict ? "bg-transparent border border-dashed border-[#2e2e2e]" : "bg-[#181818]"
              }`}
            >
              <span
                className="w-[7px] h-[7px] rounded-full mt-[5px] flex-shrink-0"
                style={{
                  background:
                    item.sentiment === "positive"
                      ? "#1D9E75"
                      : item.sentiment === "neutral"
                      ? "#EF9F27"
                      : item.isVerdict
                      ? "#5DCAA5"
                      : "#E24B4A",
                }}
              />
              <span
                className="text-[12.5px] leading-[1.5]"
                style={{ color: item.isVerdict ? "#b8b8b0" : "#ebebeb" }}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Projects */}
      <div className="bg-[#101010] border border-[#242424] rounded-[12px] p-5 mb-[10px]">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#787672] mb-4 flex items-center gap-2">
          <span className="inline-block w-[3px] h-[11px] bg-[#1D9E75] rounded-[2px]" />
          Top Projects Analyzed
        </div>
        <div className="flex flex-col gap-2">
          {topRepositories.map((repo) => (
            <div
              key={repo.name}
              className="grid gap-2 px-3 py-[10px] bg-[#181818] rounded-lg items-start"
              style={{ gridTemplateColumns: "1fr auto" }}
            >
              <div>
                <div className="text-[13px] text-[#ebebeb] font-bold mb-[2px]">
                  {repo.name}
                </div>
                <div className="text-[11px] text-[#a0a09a]">
                  {repo.language || "Unknown"}{repo.description ? ` — ${repo.description.slice(0, 60)}` : ""}
                  {repo.stars > 0 ? ` · ${repo.stars}★` : ""}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {repo.signals.map((signal) => (
                  <span
                    key={signal}
                    className={`text-[9px] px-2 py-[3px] rounded border whitespace-nowrap ${
                      signal.startsWith("✓") || ["Deployed", "Clean code", "Good README", "Good UI"].includes(signal)
                        ? "bg-[#085041] text-[#5DCAA5] border-[#0F6E56]"
                        : "bg-[#1a0000] text-[#E24B4A] border-[#3a0000]"
                    }`}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvements */}
      <div className="bg-[#101010] border border-[#242424] rounded-[12px] p-5 mb-[10px]">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#787672] mb-4 flex items-center gap-2">
          <span className="inline-block w-[3px] h-[11px] bg-[#1D9E75] rounded-[2px]" />
          Top Improvements · Highest Impact First
        </div>
        <ul className="flex flex-col gap-[6px] list-none">
          {improvements.map((item, i) => (
            <li key={i} className="flex items-start gap-[11px] px-3 py-[10px] bg-[#181818] rounded-lg text-[12.5px] text-[#ebebeb] leading-[1.5]">
              <span className="w-[21px] h-[21px] rounded-full bg-[#1D9E75] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-[1px]">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="bg-[#101010] border border-[#242424] rounded-[12px] p-5 mb-[10px]">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#787672] mb-4 flex items-center gap-2">
          <span className="inline-block w-[3px] h-[11px] bg-[#1D9E75] rounded-[2px]" />
          Tech Stack Detected
        </div>
        <div className="text-[9px] text-[#787672] mb-[3px] uppercase tracking-[0.08em]">Primary identity</div>
        <div className="text-[13px] font-bold text-[#ebebeb] mb-2">{techStack.primaryIdentity}</div>
        <div className="flex flex-wrap gap-[5px]">
          {techStack.primary.map((t, i) => (
            <span key={`primary-${t}-${i}`} className="text-[10px] px-[9px] py-1 rounded border bg-[#085041] text-[#5DCAA5] border-[#0F6E56]">{t}</span>
          ))}
          {techStack.secondary.map((t, i) => (
            <span key={`secondary-${t}-${i}`} className="text-[10px] px-[9px] py-1 rounded border border-[#2e2e2e] text-[#787672]">{t}</span>
          ))}
        </div>
      </div>

      {/* Share Card */}
      <ShareCard data={shareCard} username={profile.username} />

      {/* Scan again */}
      <button
        id="scan-again-btn"
        onClick={onReset}
        className="block w-full mt-5 h-[42px] rounded-[10px] border border-[#2e2e2e] bg-transparent text-[#787672] font-mono text-[11px] cursor-pointer transition-all hover:border-[#0F6E56] hover:text-[#5DCAA5]"
      >
        ← Scan another profile
      </button>
    </section>
  );
}
