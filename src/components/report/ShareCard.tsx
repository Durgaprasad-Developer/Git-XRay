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

interface CardCustomizations {
  accentColor: string;      // glowing neon highlight (violet, cyan, orange, or green)
  bgColor: string;          // deep matching background color
  themeTag: string;         // tech-fest classification tag
  gradientBloom: string;    // dynamic mesh gradient background for CyberGlow
  cyberAccent: string;      // secondary complementary accent color
}

/**
 * Dynamic brand customization engine based on developer's tech identity / archetype.
 * Customizes styling in real-time so that AI/ML developers, Frontend developers, 
 * and Systems developers receive unique, highly personalized cards.
 */
function getDynamicCustomizations(archetype: string, techIdentity: string): CardCustomizations {
  const archLower = archetype.toLowerCase();
  const techLower = techIdentity.toLowerCase();

  // 1. AI / ML Guy
  if (
    archLower.includes("ai") || 
    archLower.includes("ml") || 
    archLower.includes("machine") || 
    archLower.includes("deep learning") ||
    techLower.includes("python") ||
    techLower.includes("ai") ||
    techLower.includes("ml")
  ) {
    return {
      accentColor: "#a855f7", // neural violet
      bgColor: "#0b0414",
      themeTag: "[NEURAL_ENGINE_V2]",
      gradientBloom: "radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(192,38,211,0.12) 0%, transparent 60%)",
      cyberAccent: "#e879f9",
    };
  }

  // 2. Frontend / React / UI Specialist
  if (
    archLower.includes("frontend") || 
    archLower.includes("ui") || 
    archLower.includes("ux") || 
    archLower.includes("design") ||
    techLower.includes("react") ||
    techLower.includes("javascript") ||
    techLower.includes("typescript") ||
    techLower.includes("css") ||
    techLower.includes("html")
  ) {
    return {
      accentColor: "#06b6d4", // electric cyan
      bgColor: "#020d10",
      themeTag: "[PIXEL_PERFECT_UI]",
      gradientBloom: "radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(20,184,166,0.12) 0%, transparent 60%)",
      cyberAccent: "#2dd4bf",
    };
  }

  // 3. Backend / Systems / Cloud Architect
  if (
    archLower.includes("backend") || 
    archLower.includes("systems") || 
    archLower.includes("cloud") || 
    archLower.includes("database") ||
    archLower.includes("devops") ||
    techLower.includes("go") ||
    techLower.includes("rust") ||
    techLower.includes("docker") ||
    techLower.includes("kubernetes") ||
    techLower.includes("c++") ||
    techLower.includes("java")
  ) {
    return {
      accentColor: "#f97316", // systems rust / bronze orange
      bgColor: "#130903",
      themeTag: "[SYSTEMS_ARCH_V4]",
      gradientBloom: "radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(220,38,38,0.12) 0%, transparent 60%)",
      cyberAccent: "#facc15",
    };
  }

  // 4. Default / Polyglot / General Developer
  return {
    accentColor: "#00ff64", // acid neon green
    bgColor: "#080b0f",
    themeTag: "[FULL_STACK_FLOW]",
    gradientBloom: "radial-gradient(ellipse at 80% 20%, rgba(0,255,100,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,200,255,0.12) 0%, transparent 60%)",
    cyberAccent: "#00c8ff",
  };
}

/* ═══════════════════════════════════════════════════════
   CARD 1 — OBSIDIAN TERMINAL (Tech-Fest Edition)
   Dark cyberpunk monospace ticket, glowing accents, 
   dynamic theme tags and high-contrast grids
═══════════════════════════════════════════════════════ */
function ObsidianCard({ p, c }: { p: ProfileThemeData; c: CardCustomizations }) {
  const bar = (v: number) => "▓".repeat(Math.round(v / 10)) + "░".repeat(10 - Math.round(v / 10));
  
  return (
    <div style={{
      width: 900, height: 500,
      background: c.bgColor,
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace",
      flexShrink: 0,
      userSelect: "none",
      border: `2px solid ${c.accentColor}33`,
      borderRadius: "16px",
      boxShadow: `0 0 40px ${c.accentColor}11`,
    }}>
      {/* terminal grids */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${c.accentColor}04 1px, transparent 1px), linear-gradient(90deg, ${c.accentColor}04 1px, transparent 1px)`,
        backgroundSize: "25px 25px",
      }} />

      {/* diagonal aesthetic accent */}
      <div style={{
        position: "absolute", right: -50, top: -50,
        width: 300, height: 300,
        border: `1px solid ${c.accentColor}15`,
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute", right: -10, top: -10,
        width: 200, height: 200,
        border: `1px dashed ${c.accentColor}10`,
        borderRadius: "50%",
      }} />

      {/* glowing top neon bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${c.accentColor} 0%, ${c.cyberAccent} 50%, transparent 100%)`,
        boxShadow: `0 2px 10px ${c.accentColor}55`,
      }} />

      {/* scan decorative line */}
      <div style={{ position: "absolute", left: 48, top: 0, bottom: 0, width: 1, background: `${c.accentColor}15` }} />

      {/* content container */}
      <div style={{ position: "relative", zIndex: 1, padding: "44px 52px" }}>

        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, color: `${c.accentColor}bb`, letterSpacing: 4, marginBottom: 10, fontWeight: "bold" }}>
              ◉ XRAY STATUS RECON · {c.themeTag}
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#f8fafc", letterSpacing: -0.5, lineHeight: 1 }}>
              {p.username}
            </div>
            <div style={{ fontSize: 12, color: `${c.cyberAccent}aa`, marginTop: 6, letterSpacing: 2, fontWeight: "bold" }}>
              developer.status.ticket // verified
            </div>
          </div>

          {/* Glowing score badge */}
          <div style={{
            textAlign: "right",
            background: "rgba(0,0,0,0.4)",
            border: `1px solid ${c.accentColor}55`,
            borderRadius: "12px",
            padding: "8px 24px",
            boxShadow: `0 0 20px ${c.accentColor}15`,
          }}>
            <div style={{ fontSize: 72, fontWeight: 900, color: c.accentColor, lineHeight: 1, letterSpacing: -3 }}>
              {p.score}
            </div>
            <div style={{ fontSize: 10, color: "#ffffff44", letterSpacing: 2, marginTop: -2 }}>GITHUB SCORE</div>
          </div>
        </div>

        {/* Tech-Fest badges */}
        <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
          {p.roles.map((r, i) => (
            <span key={r} style={{
              padding: "6px 14px",
              border: `1px solid ${i === 0 ? c.accentColor : c.cyberAccent}44`,
              color: i === 0 ? c.accentColor : c.cyberAccent,
              fontSize: 11,
              fontWeight: "bold",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              background: `${c.accentColor}06`,
              borderRadius: "4px",
            }}>{r}</span>
          ))}
          <span style={{
            padding: "6px 14px",
            background: c.accentColor,
            color: c.bgColor,
            fontSize: 11,
            fontWeight: "extrabold",
            letterSpacing: 2,
            textTransform: "uppercase",
            borderRadius: "4px",
            boxShadow: `0 0 15px ${c.accentColor}33`,
          }}>{p.rank}</span>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            ["CONSISTENCY", p.stats.consistency],
            ["PROFILE_BRANDING", p.stats.profile],
            ["OPEN_SOURCE", p.stats.openSource],
          ].map(([label, val], i) => (
            <div key={label as string} style={{
              borderLeft: i === 0 ? "none" : `1px solid ${c.accentColor}22`,
              paddingLeft: i === 0 ? 0 : 28,
              paddingRight: 28,
            }}>
              <div style={{ fontSize: 10, color: "#ffffff33", letterSpacing: 2, marginBottom: 8, fontWeight: "bold" }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", letterSpacing: -1, marginBottom: 6 }}>{val}%</div>
              <div style={{ fontSize: 11, color: `${c.accentColor}aa`, letterSpacing: 1 }}>{bar(val as number)}</div>
            </div>
          ))}
        </div>

        {/* Footer ticket footer */}
        <div style={{
          position: "absolute", bottom: 36, left: 52, right: 52,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: `1px solid ${c.accentColor}22`, paddingTop: 16,
        }}>
          <div style={{ fontSize: 9, color: "#ffffff22", letterSpacing: 2, fontWeight: "bold" }}>
            AUTHENTICATED · GITHUBXRAY.DEV · BATCH_{p.year}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 9, color: `${c.accentColor}bb`, fontWeight: "bold" }}>SEC_RECON_VERIFIED</span>
            {["◆", "◆", "◆"].map((d, i) => (
              <span key={i} style={{ fontSize: 6, color: i === 0 ? c.accentColor : "#ffffff15" }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CARD 2 — PAPER SYSTEM (Brutalist Tech-Fest Poster)
   High-contrast brutalist zine design, custom graphic stamps,
   bold ink borders, and typeface design accents
═══════════════════════════════════════════════════════ */
function PaperCard({ p, c }: { p: ProfileThemeData; c: CardCustomizations }) {
  return (
    <div style={{
      width: 900, height: 500,
      background: "#f3efe4",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', Courier, monospace",
      flexShrink: 0,
      userSelect: "none",
      border: "4px solid #0a0a0a",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    }}>
      {/* grain paper texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #0000000a 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }} />

      {/* brutalist solid left accent block */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: "#0a0a0a" }} />

      {/* zine ticket header stamp */}
      <div style={{
        position: "absolute", top: 0, left: 12, right: 0, height: 52,
        background: "#0a0a0a",
        display: "flex", alignItems: "center",
        padding: "0 32px",
        gap: 20,
      }}>
        <span style={{ fontSize: 11, color: "#f3efe4", letterSpacing: 3, fontWeight: "extrabold" }}>GITHUB XRAY</span>
        <span style={{ width: 2, height: 14, background: "#f3efe4aa" }} />
        <span style={{ fontSize: 10, color: "#f3efe4aa", letterSpacing: 3, fontWeight: "bold" }}>DEVELOPER REPORT NO_{p.year}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span style={{
            padding: "2px 8px", fontSize: 9,
            background: "#f3efe4", color: "#0a0a0a",
            letterSpacing: 1.5, fontWeight: "extrabold",
            textTransform: "uppercase",
          }}>{c.themeTag}</span>
        </div>
      </div>

      {/* main body */}
      <div style={{ position: "relative", zIndex: 1, padding: "76px 44px 32px 48px" }}>

        {/* big name */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 10, color: "#0a0a0a66", letterSpacing: 3, marginBottom: 6, fontWeight: "bold" }}>
            ↳ AUTHORIZED IDENTITY
          </div>
          <div style={{
            fontSize: 56, fontWeight: 900, color: "#0a0a0a",
            lineHeight: 0.85, letterSpacing: -2,
            textTransform: "uppercase",
          }}>
            {p.name}
          </div>
          <div style={{ fontSize: 13, color: "#0a0a0a66", marginTop: 10, letterSpacing: 1.5, fontWeight: "bold" }}>
            handle: github.com/{p.username}
          </div>
        </div>

        {/* grid segment */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginTop: 24, borderTop: "3px solid #0a0a0a", borderBottom: "3px solid #0a0a0a" }}>
          
          {/* big ink score stamp */}
          <div style={{
            padding: "16px 28px 16px 0", borderRight: "3px solid #0a0a0a",
            display: "flex", flexDirection: "column", justifyContent: "center",
            minWidth: 140,
          }}>
            <div style={{ fontSize: 10, color: "#0a0a0a66", letterSpacing: 2, marginBottom: 2, fontWeight: "bold" }}>OVERALL</div>
            <div style={{ fontSize: 68, fontWeight: 900, color: "#0a0a0a", lineHeight: 1, letterSpacing: -3 }}>{p.score}</div>
            <div style={{ fontSize: 10, color: "#0a0a0a66", marginTop: -4, fontWeight: "bold" }}>OUT OF 100</div>
          </div>

          {/* dynamic subscores mapping */}
          {[["CONSISTENCY", p.stats.consistency], ["BRANDING", p.stats.profile], ["OPEN SOURCE", p.stats.openSource]].map(([label, val], i) => (
            <div key={label as string} style={{
              flex: 1,
              padding: "16px 20px",
              borderRight: i < 2 ? "3px solid #0a0a0a" : "none",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 9, color: "#0a0a0a66", letterSpacing: 2, fontWeight: "bold", textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#0a0a0a", letterSpacing: -2, lineHeight: 1 }}>{val}</div>
              {/* solid black brutalist progress bar */}
              <div style={{ height: 6, background: "rgba(0,0,0,0.06)", border: "1px solid #0a0a0a", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${val}%`, background: "#0a0a0a" }} />
              </div>
            </div>
          ))}

          {/* heavy rank badge */}
          <div style={{
            padding: "16px 20px",
            borderLeft: "3px solid #0a0a0a",
            background: "#0a0a0a",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            minWidth: 130,
          }}>
            <div style={{ fontSize: 9, color: "#f3efe477", letterSpacing: 2, marginBottom: 6, fontWeight: "bold" }}>RANKING</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f3efe4", textAlign: "center", letterSpacing: -0.5 }}>{p.rank}</div>
            <div style={{ fontSize: 9, color: "#f3efe455", marginTop: 4, letterSpacing: 1, fontWeight: "bold" }}>GLOBAL LEVEL</div>
          </div>
        </div>

        {/* footer stamp panel */}
        <div style={{
          marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 10, color: "#0a0a0a44", letterSpacing: 2, fontWeight: "bold" }}>dev.report_spec // git-xray</div>
          <div style={{ fontSize: 10, color: "#0a0a0a44", letterSpacing: 2, fontWeight: "bold" }}>SCAN FREE · NO SIGN-IN · 30S</div>
          {/* dynamic color ink-stamp depending on profile customizations */}
          <div style={{
            border: `3px double ${c.accentColor}`, padding: "4px 14px",
            fontSize: 11, color: c.accentColor, letterSpacing: 4, fontWeight: "extrabold",
            textTransform: "uppercase",
            transform: "rotate(-3deg)",
            borderRadius: "4px",
            boxShadow: `0 0 10px ${c.accentColor}15`,
          }}>
            VERIFIED
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CARD 3 — CYBER-GLOW (Tech-Fest Ticket Special)
   Deep space canvas, glowing dynamic mesh gradient bloom,
   glassmorphic widgets, and glowing neon ring meters
═══════════════════════════════════════════════════════ */
function CyberGlowCard({ p, c }: { p: ProfileThemeData; c: CardCustomizations }) {
  const pct = (v: number) => `${v}%`;
  return (
    <div style={{
      width: 900, height: 500,
      background: "#08060c",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      flexShrink: 0,
      userSelect: "none",
      border: `2px solid ${c.accentColor}33`,
      borderRadius: "16px",
      boxShadow: `0 0 50px ${c.accentColor}11`,
    }}>
      {/* Dynamic Glowing Mesh Gradient Bloom */}
      <div style={{
        position: "absolute", top: -100, left: "20%",
        width: 500, height: 350,
        background: c.gradientBloom,
        pointerEvents: "none",
        filter: "blur(40px)",
      }} />

      {/* Cyber mesh texture grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Glowing horizontal laser boundary */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${c.accentColor}ee 30%, ${c.cyberAccent}ee 70%, transparent)`,
        boxShadow: `0 0 20px ${c.accentColor}`,
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "44px 52px" }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 14px",
              background: `${c.accentColor}12`,
              border: `1px solid ${c.accentColor}44`,
              borderRadius: 20,
              marginBottom: 14,
              boxShadow: `0 0 10px ${c.accentColor}11`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.accentColor, display: "inline-block", boxShadow: `0 0 8px ${c.accentColor}` }} />
              <span style={{ fontSize: 10, color: c.accentColor, letterSpacing: 2, fontWeight: "extrabold" }}>{c.themeTag}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#f8fafc", letterSpacing: -1, lineHeight: 1 }}>
              {p.name}
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 6, letterSpacing: 0.5, fontWeight: "500" }}>
              github.com/{p.username}
            </div>
          </div>

          {/* Neon Circular Ring Gauge */}
          <div style={{
            width: 100, height: 100, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="100" height="100" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#techFestGrad)" strokeWidth="6"
                strokeDasharray={`${(p.score / 100) * 263.8} 263.8`} strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${c.accentColor})` }} />
              <defs>
                <linearGradient id="techFestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={c.accentColor} />
                  <stop offset="100%" stopColor={c.cyberAccent} />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", lineHeight: 1, letterSpacing: -1 }}>{p.score}</div>
              <div style={{ fontSize: 9, color: "#64748b", marginTop: 2, fontWeight: "bold" }}>SCORE</div>
            </div>
          </div>
        </div>

        {/* Dynamic Category Badges */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {p.roles.map((r, i) => (
            <span key={r} style={{
              padding: "6px 16px",
              background: i === 0 ? `${c.accentColor}18` : `${c.cyberAccent}12`,
              border: `1px solid ${i === 0 ? c.accentColor : c.cyberAccent}33`,
              borderRadius: 8,
              color: i === 0 ? c.accentColor : c.cyberAccent,
              fontSize: 12, letterSpacing: 0.5, fontWeight: "bold",
              boxShadow: i === 0 ? `0 0 10px ${c.accentColor}11` : "none",
            }}>{r}</span>
          ))}
          <span style={{
            padding: "6px 16px",
            background: "rgba(234,179,8,0.08)",
            border: "1px solid rgba(234,179,8,0.25)",
            borderRadius: 8,
            color: "#fbbf24",
            fontSize: 12, letterSpacing: 0.5, fontWeight: "bold",
          }}>{p.rank}</span>
        </div>

        {/* Dynamic glassmorphic metrics widgets */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            ["Consistency", p.stats.consistency, c.accentColor, `${c.accentColor}06`],
            ["Profile Branding", p.stats.profile, c.cyberAccent, `${c.cyberAccent}04`],
            ["Open Source Dev", p.stats.openSource, "#eab308", "rgba(234,179,8,0.04)"],
          ].map(([label, val, color, bg]) => (
            <div key={label as string} style={{
              background: bg as string,
              border: `1px solid ${color}1a`,
              borderRadius: 12,
              padding: "16px 20px",
              boxShadow: `inset 0 1px 1px rgba(255,255,255,0.02)`,
            }}>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 0.5, marginBottom: 8, fontWeight: "bold" }}>{label as string}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#f8fafc", letterSpacing: -2, lineHeight: 1, marginBottom: 10 }}>{val}%</div>
              {/* glowing gauge bar */}
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: pct(val as number), background: color as string, borderRadius: 2, boxShadow: `0 0 8px ${color}` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute", bottom: 32, left: 52, right: 52,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 11, color: "#334155", letterSpacing: 1.5, fontWeight: "bold" }}>GITHUBXRAY.DEV</div>
          <div style={{ fontSize: 11, color: "#334155", letterSpacing: 1.5, fontWeight: "bold" }}>TECH_FEST_BADGE_V2</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SHARE CARD WRAPPER
═══════════════════════════════════════════════════════ */
const TABS = [
  { id: "obsidian", label: "Obsidian Terminal", sub: "Monospace Zine" },
  { id: "paper", label: "Paper Brutalist", sub: "Graphic Poster" },
  { id: "cyber", label: "Cyber-Glow", sub: "Tech-Fest Ticket" },
];

export default function ShareCard({ data, username, name }: ShareCardProps) {
  const [activeTab, setActiveTab] = useState<"obsidian" | "paper" | "cyber">("cyber");
  const [showLinkedInAlert, setShowLinkedInAlert] = useState(false);

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

  // Obtain brand customizations dynamically based on tag/archetype
  const customizations = getDynamicCustomizations(data.archetype, data.techIdentity);

  // Prepare highly descriptive recruiter-ready social post copy
  const shareText = `🚀 Just got my GitHub footprint X-rayed! 🔎

📊 Overall Score: ${data.score}/100
🏆 Developer Archetype: ${data.archetype} (${profileData.rank})
💻 Tech Stack: ${data.techIdentity}

Here is the breakdown of my developer health:
🔥 Consistency: ${data.consistencyScore}%
🎨 Profile Branding: ${data.profileScore}%
📦 Open Source Contribution: ${data.openSourceScore}%

GitHub X-Ray gives developers deep, recruiter-ready analysis of their coding identity in under 30 seconds. Scan your profile free and get your customized status card here:
👉 https://githubx-ray.vercel.app/${username}

#github #developer #coding #opensource #softwareengineering #career`;

  const handleShare = (platform: "linkedin" | "x" | "copy") => {
    trackEvent("share_clicked", { platform, username });
    const url = `https://githubx-ray.vercel.app/${username}`;

    if (platform === "linkedin") {
      // 1. Copy marketing post automatically to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        // 2. Open our premium alert notification overlay!
        setShowLinkedInAlert(true);
      }).catch(() => {
        // Fallback if clipboard fails
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
      });
    } else if (platform === "x") {
      const xText = `My GitHub footprint got X-rayed! 👀\nScore: ${data.score}/100\nArchetype: ${data.archetype}\n\nGet your status card free here:`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Recruiter-optimized marketing copy and link copied to clipboard!");
      });
    }
  };

  return (
    <div className="bg-[#101010] border border-[#242424] rounded-[16px] p-6 mb-[10px]">
      
      {/* Dynamic Clipboard Copy Overlay Modal */}
      {showLinkedInAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#101010] border border-[#0F6E56] rounded-2xl max-w-[500px] w-full p-6 shadow-[0_0_30px_rgba(29,158,117,0.15)] animate-scale-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl select-none">📋</span>
              <h4 className="text-[15px] font-extrabold text-[#5DCAA5] tracking-tight font-mono">
                LINKEDIN POST COPIED!
              </h4>
            </div>
            
            <p className="text-[12px] leading-relaxed text-[#b8b8b0] mb-4">
              We pre-generated an engaging, recruiter-optimized post copy with your scores and copied it directly to your clipboard.
            </p>

            {/* Post Preview box */}
            <div className="bg-[#161616] border border-[#242424] rounded-lg p-3 text-[10.5px] font-mono text-[#787672] max-h-[160px] overflow-y-auto mb-5 leading-relaxed whitespace-pre-wrap select-text">
              {shareText}
            </div>

            <div className="bg-[#082a21] border border-[#0F6E56] rounded-lg p-3 flex gap-2 items-start mb-5">
              <span className="text-[12px] mt-[1px]">💡</span>
              <span className="text-[11px] leading-normal text-[#5DCAA5]">
                <strong>To post:</strong> LinkedIn will open next. Simply paste <strong>(Ctrl+V)</strong> your post text and attach your screenshot!
              </span>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowLinkedInAlert(false)}
                className="px-4 h-[38px] rounded-lg border border-[#2e2e2e] bg-transparent text-[#787672] font-mono text-[10px] font-bold cursor-pointer transition-colors hover:border-[#ebebeb] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLinkedInAlert(false);
                  const url = `https://githubx-ray.vercel.app/${username}`;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
                }}
                className="px-5 h-[38px] rounded-lg bg-[#085041] border border-[#1D9E75] text-[#5DCAA5] font-mono text-[10px] font-bold cursor-pointer transition-colors hover:bg-[#0F6E56]"
              >
                Open LinkedIn & Paste!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title & Introduction */}
      <div className="mb-6">
        <div className="text-[10px] text-[#5DCAA5] tracking-[0.18em] uppercase font-bold mb-1">
          ◉ DEV STATUS CARDS
        </div>
        <h3 className="text-[17px] font-extrabold text-[#ebebeb] tracking-tight">
          Tech-Festival Ticket Badges
        </h3>
        <p className="text-[12px] text-[#787672] mt-1">
          Customized aesthetic tags mapped automatically to your coding profile. Screenshot and showcase your developer status!
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as "obsidian" | "paper" | "cyber")}
            className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
              activeTab === t.id
                ? "bg-[#085041] border-[#1D9E75] text-[#5DCAA5]"
                : "bg-transparent border-[#242424] hover:border-[#2e2e2e] text-[#787672]"
            }`}
          >
            <div className="text-[11.5px] font-bold tracking-tight">
              {t.label}
            </div>
            <div className={`text-[8px] mt-[1px] tracking-wide uppercase font-bold ${activeTab === t.id ? "text-[#5DCAA5] opacity-80" : "text-[#4a4a48]"}`}>
              {t.sub}
            </div>
          </button>
        ))}
      </div>

      {/* High-Resolution Poster Card Preview (Scrollable responsive wrapper) */}
      <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-[#242424] bg-[#050505] mb-5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-950 flex justify-start items-center p-1">
        <div style={{ width: 900, height: 500, flexShrink: 0 }} className="mx-auto select-none">
          {activeTab === "obsidian" && <ObsidianCard p={profileData} c={customizations} />}
          {activeTab === "paper" && <PaperCard p={profileData} c={customizations} />}
          {activeTab === "cyber" && <CyberGlowCard p={profileData} c={customizations} />}
        </div>
      </div>

      {/* Helpful Instructions banner */}
      <div className="bg-[#181818] border border-[#242424] rounded-lg p-[14px] flex items-start gap-3 mb-6">
        <span className="text-[14px] leading-none select-none">📸</span>
        <div className="text-[11.5px] leading-relaxed text-[#b8b8b0]">
          <strong className="text-[#ebebeb]">Custom {customizations.themeTag} Branding Applied:</strong> We optimized these themes for your specific code profile. <span className="text-[#5DCAA5] font-semibold">Screenshot this card</span> to attach to your post!
        </div>
      </div>

      <div className="h-px bg-[#1e1e1e] mb-4" />

      {/* Share Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-[10px] text-[#4a4a48] tracking-wide mb-2 sm:mb-0">
          githubxray.dev · Share your developer status card
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            id="share-linkedin-btn"
            onClick={() => handleShare("linkedin")}
            className="flex-1 sm:flex-initial px-4 h-9 rounded-lg border border-[#0F6E56] bg-transparent text-[#5DCAA5] font-mono text-[10px] font-bold cursor-pointer tracking-[0.03em] transition-colors hover:bg-[#085041] whitespace-nowrap"
          >
            💼 Share to LinkedIn
          </button>
          <button
            id="share-x-btn"
            onClick={() => handleShare("x")}
            className="flex-1 sm:flex-initial px-4 h-9 rounded-lg border border-[#2e2e2e] bg-transparent text-[#787672] font-mono text-[10px] font-bold cursor-pointer tracking-[0.03em] transition-colors hover:border-[#1a1a1a] hover:text-[#ebebeb] whitespace-nowrap"
          >
            𝕏 Post on X
          </button>
          <button
            id="share-copy-btn"
            onClick={() => handleShare("copy")}
            className="flex-1 sm:flex-initial px-4 h-9 rounded-lg border border-[#2e2e2e] bg-transparent text-[#787672] font-mono text-[10px] font-bold cursor-pointer tracking-[0.03em] transition-colors hover:border-[#1a1a1a] hover:text-[#ebebeb] whitespace-nowrap"
          >
            📋 Copy Post Copy
          </button>
        </div>
      </div>

    </div>
  );
}
