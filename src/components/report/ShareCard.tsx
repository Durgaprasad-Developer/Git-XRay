"use client";

import React, { useState } from "react";
import { ShareCardData } from "@/types/report.types";
import { trackEvent } from "@/utils/analytics";

interface ShareCardProps {
  data: ShareCardData;
  username: string;
  name: string;
}

interface ProfileThemeData {
  username: string;
  name: string;
  score: number;
  roles: string[];
  rank: string;
  stats: {
    consistency: number;
    profile: number;
    openSource: number;
  };
  year: number;
}

/* ═══════════════════════════════════════════════════════
   CARD 1 — OBSIDIAN TERMINAL
   Black + acid green, monospace editorial, 
   code receipt aesthetic like a build log
═══════════════════════════════════════════════════════ */
function ObsidianCard({ p }: { p: ProfileThemeData }) {
  const bar = (v: number) => "▓".repeat(Math.round(v / 10)) + "░".repeat(10 - Math.round(v / 10));
  
  return (
    <div style={{
      width: 900, height: 500,
      background: "#080b0f",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace",
      flexShrink: 0,
      userSelect: "none",
    }}>
      {/* grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,255,100,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,100,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* diagonal accent */}
      <div style={{
        position: "absolute", right: -60, top: -60,
        width: 320, height: 320,
        border: "1px solid rgba(0,255,100,0.08)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute", right: -20, top: -20,
        width: 220, height: 220,
        border: "1px solid rgba(0,255,100,0.05)",
        borderRadius: "50%",
      }} />

      {/* top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 3,
        background: "linear-gradient(90deg, #00ff64 0%, #00c8ff 50%, transparent 100%)",
      }} />

      {/* left scan line decoration */}
      <div style={{ position: "absolute", left: 48, top: 0, bottom: 0, width: 1, background: "rgba(0,255,100,0.06)" }} />

      {/* content */}
      <div style={{ position: "relative", zIndex: 1, padding: "44px 52px" }}>

        {/* header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 10, color: "#00ff6488", letterSpacing: 4, marginBottom: 10, textTransform: "uppercase" }}>
              ◉ github xray · scan complete
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#f0ffe8", letterSpacing: -0.5, lineHeight: 1 }}>
              {p.username}
            </div>
            <div style={{ fontSize: 12, color: "#00ff64aa", marginTop: 6, letterSpacing: 2 }}>
              github.com/{p.username}
            </div>
          </div>

          {/* score block */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 80, fontWeight: 900, color: "#00ff64", lineHeight: 1, letterSpacing: -4 }}>
              {p.score}
            </div>
            <div style={{ fontSize: 11, color: "#ffffff44", letterSpacing: 3, marginTop: -4 }}>/ 100 SCORE</div>
          </div>
        </div>

        {/* roles */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
          {p.roles.map(r => (
            <span key={r} style={{
              padding: "5px 14px",
              border: "1px solid #00ff6433",
              color: "#00ff64cc",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              background: "rgba(0,255,100,0.04)",
            }}>{r}</span>
          ))}
          <span style={{
            padding: "5px 14px",
            background: "#00ff6415",
            border: "1px solid #00ff6455",
            color: "#00ff64",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>{p.rank}</span>
        </div>

        {/* metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            ["CONSISTENCY", p.stats.consistency],
            ["PROFILE", p.stats.profile],
            ["OPEN_SOURCE", p.stats.openSource],
          ].map(([label, val], i) => (
            <div key={label as string} style={{
              borderLeft: i === 0 ? "none" : "1px solid rgba(0,255,100,0.08)",
              paddingLeft: i === 0 ? 0 : 28,
              paddingRight: 28,
            }}>
              <div style={{ fontSize: 11, color: "#ffffff33", letterSpacing: 3, marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#f0ffe8", letterSpacing: -1, marginBottom: 6 }}>{val}</div>
              <div style={{ fontSize: 11, color: "#00ff6466", letterSpacing: 1 }}>{bar(val as number)}</div>
            </div>
          ))}
        </div>

        {/* bottom row */}
        <div style={{
          position: "absolute", bottom: 36, left: 52, right: 52,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16,
        }}>
          <div style={{ fontSize: 10, color: "#ffffff22", letterSpacing: 2 }}>
            GENERATED · GITHUBXRAY.DEV · {p.year}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["◆", "◆", "◆"].map((d, i) => (
              <span key={i} style={{ fontSize: 6, color: i === 0 ? "#00ff64" : "#ffffff15" }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CARD 2 — PAPER SYSTEM
   Off-white brutalist paper texture, ink-stamp aesthetic
   like a zine or a typeface specimen — ultra shareable
═══════════════════════════════════════════════════════ */
function PaperCard({ p }: { p: ProfileThemeData }) {
  return (
    <div style={{
      width: 900, height: 500,
      background: "#f2ede3",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace",
      flexShrink: 0,
      userSelect: "none",
    }}>
      {/* grain texture via repeating pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #00000008 1px, transparent 1px)",
        backgroundSize: "4px 4px",
      }} />

      {/* thick left accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 8, background: "#0a0a0a" }} />

      {/* top stamp bar */}
      <div style={{
        position: "absolute", top: 0, left: 8, right: 0, height: 56,
        background: "#0a0a0a",
        display: "flex", alignItems: "center",
        padding: "0 36px",
        gap: 20,
      }}>
        <span style={{ fontSize: 10, color: "#f2ede3aa", letterSpacing: 4, textTransform: "uppercase" }}>GitHub XRAY</span>
        <span style={{ width: 1, height: 16, background: "#ffffff22" }} />
        <span style={{ fontSize: 10, color: "#f2ede3aa", letterSpacing: 4 }}>DEVELOPER PROFILE</span>
        <span style={{ width: 1, height: 16, background: "#ffffff22" }} />
        <span style={{ fontSize: 10, color: "#f2ede3aa", letterSpacing: 4 }}>{p.year}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {p.roles.map(r => (
            <span key={r} style={{
              padding: "3px 10px", fontSize: 9,
              background: "#f2ede3", color: "#0a0a0a",
              letterSpacing: 2, textTransform: "uppercase",
            }}>{r}</span>
          ))}
        </div>
      </div>

      {/* main body */}
      <div style={{ position: "relative", zIndex: 1, padding: "80px 44px 36px 52px" }}>

        {/* giant name */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 9, color: "#0a0a0a55", letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>
            ↳ handle
          </div>
          <div style={{
            fontSize: 52, fontWeight: 900, color: "#0a0a0a",
            lineHeight: 0.9, letterSpacing: -3,
            textTransform: "uppercase",
          }}>
            {p.name}
          </div>
          <div style={{ fontSize: 13, color: "#0a0a0a55", marginTop: 8, letterSpacing: 1 }}>
            /{p.username}
          </div>
        </div>

        {/* score + stats row */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginTop: 28, borderTop: "2px solid #0a0a0a", borderBottom: "2px solid #0a0a0a" }}>
          {/* big score */}
          <div style={{
            padding: "18px 32px 18px 0", borderRight: "2px solid #0a0a0a",
            display: "flex", flexDirection: "column", justifyContent: "center",
            minWidth: 120,
          }}>
            <div style={{ fontSize: 9, color: "#0a0a0a55", letterSpacing: 3, marginBottom: 4 }}>SCORE</div>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#0a0a0a", lineHeight: 1, letterSpacing: -4 }}>{p.score}</div>
            <div style={{ fontSize: 10, color: "#0a0a0a55", marginTop: -4 }}>/100</div>
          </div>

          {/* stats */}
          {[["CONSISTENCY", p.stats.consistency], ["PROFILE", p.stats.profile], ["OPEN SOURCE", p.stats.openSource]].map(([label, val], i) => (
            <div key={label as string} style={{
              flex: 1,
              padding: "18px 24px",
              borderRight: i < 2 ? "2px solid #0a0a0a" : "none",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 9, color: "#0a0a0a55", letterSpacing: 3, textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#0a0a0a", letterSpacing: -2, lineHeight: 1 }}>{val}</div>
              {/* thin progress */}
              <div style={{ height: 3, background: "#0a0a0a15", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${val}%`, background: "#0a0a0a" }} />
              </div>
            </div>
          ))}

          {/* rank */}
          <div style={{
            padding: "18px 24px",
            borderLeft: "2px solid #0a0a0a",
            background: "#0a0a0a",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            minWidth: 100,
          }}>
            <div style={{ fontSize: 9, color: "#f2ede366", letterSpacing: 3, marginBottom: 8 }}>RANK</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#f2ede3", textAlign: "center", letterSpacing: -0.5 }}>{p.rank}</div>
            <div style={{ fontSize: 9, color: "#f2ede344", marginTop: 4, letterSpacing: 1 }}>GLOBAL</div>
          </div>
        </div>

        {/* footer */}
        <div style={{
          marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 10, color: "#0a0a0a33", letterSpacing: 2 }}>githubxray.dev</div>
          <div style={{ fontSize: 10, color: "#0a0a0a33", letterSpacing: 2 }}>SCAN FREE · NO LOGIN · 30 SECONDS</div>
          {/* stamp */}
          <div style={{
            border: "2px solid #0a0a0a22", padding: "4px 10px",
            fontSize: 9, color: "#0a0a0a44", letterSpacing: 3, textTransform: "uppercase",
            transform: "rotate(-2deg)",
          }}>VERIFIED</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CARD 3 — MIDNIGHT GRADIENT
   Deep navy → charcoal, glass card, premium SaaS feel
   Notion / Linear / Vercel dashboard aesthetic
═══════════════════════════════════════════════════════ */
function MidnightCard({ p }: { p: ProfileThemeData }) {
  const pct = (v: number) => `${v}%`;
  return (
    <div style={{
      width: 900, height: 500,
      background: "#0c0e14",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
      flexShrink: 0,
      userSelect: "none",
    }}>
      {/* subtle top gradient bloom */}
      <div style={{
        position: "absolute", top: -120, left: "30%",
        width: 400, height: 300,
        background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: -80, right: "10%",
        width: 280, height: 200,
        background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* faint grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* top border shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6) 30%, rgba(20,184,166,0.6) 70%, transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "44px 52px" }}>

        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 20,
              marginBottom: 14,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#6366f1", letterSpacing: 1.5, textTransform: "uppercase" }}>GitHub XRAY</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#f8fafc", letterSpacing: -1, lineHeight: 1 }}>
              {p.name}
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 6, letterSpacing: 0.2 }}>
              github.com/{p.username}
            </div>
          </div>

          {/* score ring */}
          <div style={{
            width: 96, height: 96, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="96" height="96" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle cx="48" cy="48" r="40" fill="none" stroke="url(#scoreGrad)" strokeWidth="6"
                strokeDasharray={`${(p.score / 100) * 251.2} 251.2`} strokeLinecap="round" />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#f8fafc", lineHeight: 1, letterSpacing: -1 }}>{p.score}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>/100</div>
            </div>
          </div>
        </div>

        {/* roles */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {p.roles.map((r, i) => (
            <span key={r} style={{
              padding: "5px 14px",
              background: i === 0 ? "rgba(99,102,241,0.12)" : "rgba(20,184,166,0.1)",
              border: `1px solid ${i === 0 ? "rgba(99,102,241,0.25)" : "rgba(20,184,166,0.2)"}`,
              borderRadius: 6,
              color: i === 0 ? "#818cf8" : "#2dd4bf",
              fontSize: 12, letterSpacing: 0.5, fontWeight: 500,
            }}>{r}</span>
          ))}
          <span style={{
            padding: "5px 14px",
            background: "rgba(234,179,8,0.1)",
            border: "1px solid rgba(234,179,8,0.2)",
            borderRadius: 6,
            color: "#fbbf24",
            fontSize: 12, letterSpacing: 0.5, fontWeight: 500,
          }}>{p.rank}</span>
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            ["Consistency", p.stats.consistency, "#6366f1", "rgba(99,102,241,0.08)"],
            ["Profile", p.stats.profile, "#14b8a6", "rgba(20,184,166,0.08)"],
            ["Open Source", p.stats.openSource, "#f59e0b", "rgba(245,158,11,0.08)"],
          ].map(([label, val, color, bg]) => (
            <div key={label as string} style={{
              background: bg as string,
              border: `1px solid ${color}22`,
              borderRadius: 10,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 0.5, marginBottom: 8, fontWeight: 500 }}>{label as string}</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#f8fafc", letterSpacing: -2, lineHeight: 1, marginBottom: 10 }}>{val}</div>
              {/* progress bar */}
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: pct(val as number), background: color as string, borderRadius: 2, opacity: 0.8 }} />
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{
          position: "absolute", bottom: 32, left: 52, right: 52,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 11, color: "#1e293b", letterSpacing: 1 }}>githubxray.dev</div>
          <div style={{ fontSize: 11, color: "#1e293b", letterSpacing: 1 }}>FREE · NO LOGIN · 30 SECONDS</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SHARE CARD WRAPPER
═══════════════════════════════════════════════════════ */
const TABS = [
  { id: "obsidian", label: "Obsidian", sub: "Terminal Theme" },
  { id: "paper", label: "Paper", sub: "Brutalist Ink" },
  { id: "midnight", label: "Midnight", sub: "Premium Glass" },
];

export default function ShareCard({ data, username, name }: ShareCardProps) {
  const [activeTab, setActiveTab] = useState<"obsidian" | "paper" | "midnight">("obsidian");

  // Prepare profile fields dynamically mapped from API response
  const profileData: ProfileThemeData = {
    username: username,
    name: name || username,
    score: data.score,
    roles: [data.archetype, data.techIdentity],
    rank: `Top ${data.percentile}%`,
    stats: {
      consistency: data.consistencyScore,
      profile: data.profileScore,
      openSource: data.openSourceScore,
    },
    year: new Date().getFullYear(),
  };

  const handleShare = (platform: "linkedin" | "x" | "copy") => {
    trackEvent("share_clicked", { platform, username });
    const url = `https://githubx-ray.vercel.app/${username}`;
    const text = `My GitHub got X-rayed 👀 Score: ${data.score}/100 · Archetype: ${data.archetype} · Top ${data.percentile}% of developers\n\nCheck yours free:`;

    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="bg-[#101010] border border-[#242424] rounded-[16px] p-6 mb-[10px]">
      
      {/* Title & Introduction */}
      <div className="mb-6">
        <div className="text-[10px] text-[#5DCAA5] tracking-[0.18em] uppercase font-bold mb-1">
          ◉ Shareable Poster Cards
        </div>
        <h3 className="text-[17px] font-extrabold text-[#ebebeb] tracking-tight">
          Your Dev Stats. Poster-Ready.
        </h3>
        <p className="text-[12px] text-[#787672] mt-1">
          Choose a dynamic card theme below, screenshot it, and showcase it as a status symbol!
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as "obsidian" | "paper" | "midnight")}
            className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
              activeTab === t.id
                ? "bg-[#085041] border-[#1D9E75] text-[#5DCAA5]"
                : "bg-transparent border-[#242424] hover:border-[#2e2e2e] text-[#787672]"
            }`}
          >
            <div className="text-[11.5px] font-bold tracking-tight">
              {t.label}
            </div>
            <div className={`text-[8.5px] mt-[2px] tracking-wide ${activeTab === t.id ? "text-[#5DCAA5] opacity-80" : "text-[#4a4a48]"}`}>
              {t.sub}
            </div>
          </button>
        ))}
      </div>

      {/* High-Resolution Poster Card Preview (Scrollable responsive wrapper) */}
      <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-[#242424] bg-neutral-950 mb-5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-950 flex justify-start items-center">
        <div style={{ width: 900, height: 500, flexShrink: 0 }} className="mx-auto select-none">
          {activeTab === "obsidian" && <ObsidianCard p={profileData} />}
          {activeTab === "paper" && <PaperCard p={profileData} />}
          {activeTab === "midnight" && <MidnightCard p={profileData} />}
        </div>
      </div>

      {/* Helpful Instructions banner */}
      <div className="bg-[#181818] border border-[#242424] rounded-lg p-[14px] flex items-start gap-3 mb-6">
        <span className="text-[14px] leading-none select-none">📸</span>
        <div className="text-[11.5px] leading-relaxed text-[#b8b8b0]">
          <strong className="text-[#ebebeb]">Post to LinkedIn or X:</strong> Take a high-resolution screenshot of the card above to attach to your social media status post!
        </div>
      </div>

      <div className="h-px bg-[#1e1e1e] mb-4" />

      {/* Share Link Actions */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="text-[10px] text-[#4a4a48] tracking-wide mb-2 sm:mb-0">
          githubxray.dev · Scan yours free in 30 seconds
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {(["linkedin", "x", "copy"] as const).map((p) => (
            <button
              key={p}
              id={`share-${p}-btn`}
              onClick={() => handleShare(p)}
              className="flex-1 sm:flex-initial px-4 h-9 rounded-lg border border-[#0F6E56] bg-transparent text-[#5DCAA5] font-mono text-[10px] font-bold cursor-pointer tracking-[0.03em] transition-colors hover:bg-[#085041] whitespace-nowrap"
            >
              {p === "linkedin" ? "LinkedIn Link" : p === "x" ? "Post Link" : "Copy Link"}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
