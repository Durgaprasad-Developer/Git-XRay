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
  accentColor: string;       // X-Ray neon green, neural violet, systems rust, etc.
  secondaryColor: string;    // complimentary vector accent
  vibeTitle: string;         // e.g. "Neural X-Rayed", "OSS Footprint"
  stickerText: string;       // laptop sticker tag
  bracketsColor: string;     // vector brackets outline color
  arrowColor: string;        // vector arrow color
  bracketLabel: string;      // geeky string like "diagnostics: 'neural_net'"
  starColor: string;         // sparkle ornament color
}

/**
 * Custom developer merit badges generated dynamically based on actual stats.
 */
function getDeveloperStatsBadges(data: ShareCardData): string[] {
  const badges: string[] = [];
  
  // 1. Core Archetype (e.g. "AI / ML Explorer")
  badges.push(data.archetype);

  // 2. Tech Stack Identity
  if (data.techIdentity) {
    badges.push(data.techIdentity);
  }

  // 3. Overall capability metric tag
  if (data.score >= 80) {
    badges.push("ELITE BUILDER");
  } else if (data.score >= 60) {
    badges.push("HIGH CALIBER");
  } else {
    badges.push("DEV CORE");
  }

  return badges.slice(0, 3);
}

/**
 * Dynamic aesthetic customizations engine based on their tag / archetype.
 * Maps exact colors, labels, stickers, and shapes to the GitHub X-Ray zine style.
 */
function getXRayDevCustomizations(archetype: string, techIdentity: string, score: number): CardCustomizations {
  const arch = archetype || "";
  const archLower = arch.toLowerCase();

  // 1. AI / ML Guy (🤖)
  if (archLower.includes("ai") || archLower.includes("ml") || archLower.includes("machine") || archLower.includes("learning")) {
    return {
      accentColor: "#a855f7", // Neural Violet
      secondaryColor: "#1a73e8", // Cyber Blue
      vibeTitle: "Neural X-Rayed",
      stickerText: "AI RECON",
      bracketsColor: "#5DCAA5", // Signature X-Ray Green
      arrowColor: "#1e8e3e", // Google Green
      bracketLabel: `diagnostics: "neural_net"`,
      starColor: "#a855f7",
    };
  }

  // 2. Open Source Explorer (🌐)
  if (archLower.includes("open source") || archLower.includes("oss") || archLower.includes("explorer")) {
    return {
      accentColor: "#1e8e3e", // Dev Green
      secondaryColor: "#5DCAA5", // Signature X-Ray Green
      vibeTitle: "OSS Footprint",
      stickerText: "OSS COLLAB",
      bracketsColor: "#1a73e8", // Cyber Blue
      arrowColor: "#d93025", // Cyber Red
      bracketLabel: `diagnostics: "oss_mesh"`,
      starColor: "#5DCAA5",
    };
  }

  // 3. Hackathon Builder (⚡)
  if (archLower.includes("hackathon") || archLower.includes("builder")) {
    return {
      accentColor: "#f9ab00", // Volt Yellow
      secondaryColor: "#ea4335", // Cyber Red
      vibeTitle: "Voltage Builder",
      stickerText: "SPEED RUN",
      bracketsColor: "#5DCAA5", // Signature X-Ray Green
      arrowColor: "#1a73e8", // Cyber Blue
      bracketLabel: `diagnostics: "speed_run"`,
      starColor: "#fbbf24",
    };
  }

  // 4. Frontend Craftsman (🎨)
  if (archLower.includes("frontend") || archLower.includes("craftsman")) {
    return {
      accentColor: "#1a73e8", // Cyber Blue
      secondaryColor: "#ff00a0", // Coral Pink
      vibeTitle: "Pixel Crafted",
      stickerText: "UI SPECIMEN",
      bracketsColor: "#5DCAA5", // Signature X-Ray Green
      arrowColor: "#f9ab00", // Volt Yellow
      bracketLabel: `diagnostics: "ui_specimen"`,
      starColor: "#06b6d4",
    };
  }

  // 5. Systems / Backend Specialist (⚙️ / 🧱)
  if (archLower.includes("systems") || archLower.includes("backend") || archLower.includes("architect")) {
    return {
      accentColor: "#d93025", // Console Crimson
      secondaryColor: "#f9ab00", // Volt Yellow
      vibeTitle: "Console Core",
      stickerText: "SYS MONOLITH",
      bracketsColor: "#5DCAA5", // Signature X-Ray Green
      arrowColor: "#1e8e3e", // Dev Green
      bracketLabel: `diagnostics: "sys_core"`,
      starColor: "#ea4335",
    };
  }

  // 6. Default / Full Stack (🏆)
  return {
    accentColor: "#5DCAA5", // Signature X-Ray Green
    secondaryColor: "#1a73e8", // Cyber Blue
    vibeTitle: "Full Flow Active",
    stickerText: "FULL STACK",
    bracketsColor: "#f9ab00", // Volt Yellow
    arrowColor: "#ea4335", // Cyber Red
    bracketLabel: `diagnostics: "full_stack"`,
    starColor: "#5DCAA5",
  };
}

/* ═══════════════════════════════════════════════════════
   PREMIUM GITHUB X-RAY PLAYFUL TICKET BADGE
═══════════════════════════════════════════════════════ */
function XRayDevCard({ p, c }: { p: ProfileThemeData; c: CardCustomizations }) {
  const barColor = (val: number) => {
    if (val >= 75) return "#1e8e3e"; // Google green
    if (val >= 50) return "#1a73e8"; // Google blue
    return "#f9ab00"; // Google yellow
  };

  return (
    <div style={{
      width: 900, height: 500,
      background: "#f8f9fa", // crisp light paper
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Outfit', 'Inter', 'SF Pro Display', sans-serif",
      flexShrink: 0,
      userSelect: "none",
      border: "4px solid #1a1a1a",
      borderRadius: "24px",
      boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
      display: "flex",
    }}>
      
      {/* Playful side notches (brutalist ticket style) */}
      <div style={{
        position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)",
        width: 28, height: 28, borderRadius: "50%", background: "#101010",
        border: "4px solid #1a1a1a", zIndex: 10,
      }} />
      <div style={{
        position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)",
        width: 28, height: 28, borderRadius: "50%", background: "#101010",
        border: "4px solid #1a1a1a", zIndex: 10,
      }} />

      {/* Decorative vector background dots */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(#1a1a1a12 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }} />

      {/* ════════════════════════════════
         LEFT IDENTITY & STICKERS COLUMN (60%)
         ════════════════════════════════ */}
      <div style={{
        width: "60%",
        padding: "44px 36px 44px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}>
        {/* Top title line */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{
              fontSize: 10, fontWeight: 900, color: "#1a1a1a",
              letterSpacing: 2, textTransform: "uppercase",
              fontFamily: "monospace",
              background: "#1a1a1a12",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1.5px solid #1a1a1a",
            }}>
              ◉ VERIFIED SPECIMEN
            </span>
          </div>

          {/* Big heavy GitHub X-Ray graphic heading */}
          <div style={{ position: "relative" }}>
            <div style={{
              fontSize: 48, fontWeight: 900, color: "#1a1a1a",
              lineHeight: 1.05, letterSpacing: -1.5,
              textTransform: "capitalize",
            }}>
              {c.vibeTitle}
            </div>
            
            {/* Small dynamic star decoration */}
            <svg style={{ position: "absolute", right: 20, top: -10, fill: c.starColor }} width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </div>
        </div>

        {/* Playful vector ornaments / brackets containing candidate identity */}
        <div style={{
          display: "flex", alignItems: "center", gap: 20,
          background: "#ffffff",
          border: "3px solid #1a1a1a",
          borderRadius: "16px",
          padding: "16px 20px",
          boxShadow: "4px 4px 0px #1a1a1a",
          margin: "24px 0",
        }}>
          {/* Thick curly bracket */}
          <div style={{
            fontSize: 44, fontWeight: 500, color: c.bracketsColor,
            lineHeight: 1, marginTop: -6, fontFamily: "monospace",
          }}>
            {`{`}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 22, fontWeight: 900, color: "#1a1a1a",
              letterSpacing: -0.5, textTransform: "uppercase",
            }}>
              {p.name}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700, color: "#5f6368",
              fontFamily: "monospace", marginTop: 2,
            }}>
              {c.bracketLabel}
            </div>
          </div>

          <div style={{
            fontSize: 44, fontWeight: 500, color: c.bracketsColor,
            lineHeight: 1, marginTop: -6, fontFamily: "monospace",
          }}>
            {`}`}
          </div>
        </div>

        {/* Scattered "laptop stickers" matching google aesthetic */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          
          {/* Yellow pill sticker */}
          <div style={{
            background: "#f9ab00",
            color: "#1a1a1a",
            border: "2px solid #1a1a1a",
            borderRadius: "50px",
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 800,
            boxShadow: "2px 2px 0px #1a1a1a",
            letterSpacing: 0.5,
          }}>
            {c.stickerText}
          </div>

          {/* Sparkle emblem sticker */}
          <div style={{
            background: "#1a73e8",
            color: "#ffffff",
            border: "2px solid #1a1a1a",
            borderRadius: "8px",
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "2px 2px 0px #1a1a1a",
            transform: "rotate(-6deg)",
          }} className="justify-center">
            <span style={{ fontSize: 16, fontWeight: 900, marginTop: -2 }}>✦</span>
          </div>

          {/* Dynamic Green/Red indicator arrow sticker */}
          <div style={{
            background: c.arrowColor,
            color: "#ffffff",
            border: "2px solid #1a1a1a",
            borderRadius: "50px",
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 800,
            boxShadow: "2px 2px 0px #1a1a1a",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>X-RAY RECON</span>
            <span style={{ fontSize: 13, lineHeight: 1 }}>➔</span>
          </div>

          {/* Starburst ornament */}
          <div style={{
            border: "2px dashed #1a1a1a",
            borderRadius: "50%",
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: "rotate(15deg)",
          }}>
            <span style={{ fontSize: 14, color: "#1a1a1a88", fontWeight: "bold" }}>✳</span>
          </div>
        </div>

        {/* Username link footer */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a1a55", fontFamily: "monospace", marginTop: 24 }}>
          githubxray.dev · git-identity: {p.username}
        </div>
      </div>

      {/* ════════════════════════════════
         RIGHT RECRUITER STATS COLUMN (40%)
         ════════════════════════════════ */}
      <div style={{
        width: "40%",
        borderLeft: "3.5px dashed #1a1a1a", // perforated brutalist border
        padding: "44px 44px 44px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff", // clean pure white backing
      }}>
        
        {/* Giant Playful Vector X-Ray Score Stamp */}
        <div style={{
          background: "#f9ab00", // bright yellow
          border: "4px solid #1a1a1a",
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "5px 5px 0px #1a1a1a",
          position: "relative",
        }}>
          {/* absolute decorative curly bracket badge */}
          <div style={{
            position: "absolute", left: -12, top: -14,
            width: 24, height: 24, borderRadius: "50%",
            background: "#ea4335", border: "2px solid #1a1a1a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, color: "#ffffff", fontWeight: 900,
          }}>
            {`{`}
          </div>

          <div style={{ fontSize: 72, fontWeight: 900, color: "#1a1a1a", lineHeight: 0.9, letterSpacing: -4 }}>
            {p.score}
          </div>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#1a1a1a", letterSpacing: 2, marginTop: 4 }}>
            X-RAY SCORE
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#1a1a1a88", letterSpacing: 0.5, marginTop: 2 }}>
            {p.rank} GLOBAL
          </div>
        </div>

        {/* Dynamic clean geometric subscore bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "24px 0" }}>
          {[
            ["CONSISTENCY", p.stats.consistency],
            ["BRANDING", p.stats.profile],
            ["OPEN_SOURCE", p.stats.openSource],
          ].map(([label, val]) => (
            <div key={label as string}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 800, color: "#1a1a1a", marginBottom: 5 }}>
                <span>{label}</span>
                <span>{val}%</span>
              </div>
              
              {/* Playful vector progress bar with thick outline */}
              <div style={{
                height: 12,
                background: "#f8f9fa",
                border: "2px solid #1a1a1a",
                borderRadius: "50px",
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{
                  height: "100%",
                  width: `${val}%`,
                  background: barColor(val as number),
                  borderRadius: "50px",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* GitHub X-Ray branding tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#1a1a1a", letterSpacing: 1.5 }}>
            GITHUB X-RAY
          </div>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#1a1a1a44", fontFamily: "monospace" }}>
            RECON_NO_{p.year}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SHARE CARD WRAPPER
═══════════════════════════════════════════════════════ */
export default function ShareCard({ data, username, name }: ShareCardProps) {
  const [showLinkedInAlert, setShowLinkedInAlert] = useState(false);

  // Prepare profile fields dynamically mapped from API response
  const profileData: ProfileThemeData = {
    username: username,
    name: name || username,
    score: data.score,
    roles: getDeveloperStatsBadges(data), // Custom stats merit badges!
    rank: `TOP ${data.percentile}%`,
    stats: {
      consistency: data.consistencyScore,
      profile: data.profileScore,
      openSource: data.openSourceScore,
    },
    year: new Date().getFullYear(),
  };

  // Obtain brand customizations dynamically based on tag/archetype
  const customizations = getXRayDevCustomizations(data.archetype, data.techIdentity, data.score);

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
      try {
        navigator.clipboard.writeText(shareText);
      } catch (err) {
        console.warn("Clipboard access blocked:", err);
      }
      // 2. ALWAYS display our beautiful instructions alert overlay!
      setShowLinkedInAlert(true);
    } else if (platform === "x") {
      const xText = `My GitHub footprint got X-rayed! 👀\nScore: ${data.score}/100\nArchetype: ${data.archetype}\n\nGet your status card free here:`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else {
      try {
        navigator.clipboard.writeText(shareText).then(() => {
          alert("📋 Recruiter-ready stats copy copied to clipboard!");
        });
      } catch (err) {
        alert("Clipboard blocked. You can manually copy the post copy!");
      }
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
          ◉ DEV STATUS CARD
        </div>
        <h3 className="text-[17px] font-extrabold text-[#ebebeb] tracking-tight">
          Personalized GitHub X-Ray Badge
        </h3>
        <p className="text-[12px] text-[#787672] mt-1">
          A completely custom, visual developer spec ticket dynamically optimized for your GitHub stack and stats footprint. Screenshot and share your status!
        </p>
      </div>

      {/* High-Resolution Poster Card Preview */}
      <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-[#242424] bg-[#050505] mb-5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-950 flex justify-start items-center p-1">
        <div style={{ width: 900, height: 500, flexShrink: 0 }} className="mx-auto select-none">
          <XRayDevCard p={profileData} c={customizations} />
        </div>
      </div>

      {/* Dynamic Vibe Tag specific helpful banner */}
      <div className="bg-[#181818] border border-[#242424] rounded-lg p-[14px] flex items-start gap-3 mb-6">
        <span className="text-[14px] leading-none select-none">🎯</span>
        <div className="text-[11.5px] leading-relaxed text-[#b8b8b0]">
          <strong className="text-[#ebebeb]">GitHub X-Ray {customizations.stickerText} Theme Applied:</strong> We detected your primary identity tags and dynamically calibrated these vector stars, stickers, and color presets to fit your developer brand perfectly. <span className="text-[#5DCAA5] font-semibold">Screenshot this card</span> to attach to your post!
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
