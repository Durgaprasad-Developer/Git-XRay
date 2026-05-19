"use client";

import { ShareCardData } from "@/types/report.types";
import { trackEvent } from "@/utils/analytics";

interface ShareCardProps {
  data: ShareCardData;
  username: string;
}

export default function ShareCard({ data, username }: ShareCardProps) {
  const handleShare = (platform: "linkedin" | "x" | "copy") => {
    trackEvent("share_clicked", { platform, username });
    const url = `https://githubxray.dev/${username}`;
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
    <div className="bg-[#0a0a0a] border-2 border-[#1D9E75] rounded-[14px] p-6 mb-[10px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-[9px] text-[#5DCAA5] tracking-[0.18em] uppercase font-bold">
            GitHub Xray
          </div>
          <div className="text-[10px] text-[#4a4a48] mt-[2px]">
            github/<span className="text-[#5DCAA5]">{username}</span>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-[50px] font-extrabold text-[#5DCAA5] leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {data.score}
          </div>
          <div className="text-[13px] text-[#787672]">/100</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-[5px] mb-4">
        <span className="text-[9px] px-[10px] py-1 rounded bg-[#085041] text-[#5DCAA5] font-bold tracking-[0.05em]">
          ◆ {data.archetype}
        </span>
        <span className="text-[9px] px-[10px] py-1 rounded bg-[#1a1540] text-[#AFA9EC] font-bold">
          {data.techIdentity}
        </span>
        <span className="text-[9px] px-[10px] py-1 rounded bg-[#1a0d00] text-[#EF9F27] tracking-[0.04em]">
          Top {data.percentile}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-[7px] mb-4">
        {[
          { v: data.consistencyScore, l: "Consistency", c: "#EF9F27" },
          { v: data.profileScore, l: "Profile", c: "#5DCAA5" },
          { v: data.openSourceScore, l: "Open Source", c: data.openSourceScore < 50 ? "#E24B4A" : "#5DCAA5" },
        ].map(({ v, l, c }) => (
          <div
            key={l}
            className="text-center py-[10px] bg-[#0f0f0f] rounded-lg"
          >
            <div
              className="text-[21px] font-extrabold"
              style={{ fontFamily: "Syne, sans-serif", color: c }}
            >
              {v}
            </div>
            <div className="text-[8px] text-[#4a4a48] uppercase tracking-[0.08em] mt-[2px]">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#1a1a1a] mb-[0.8rem]" />
      <div className="text-[9px] text-[#4a4a48]">
        githubxray.dev · Scan your profile free — 30 seconds, no login
      </div>

      <div className="flex gap-[7px] mt-[0.9rem]">
        {(["linkedin", "x", "copy"] as const).map((p) => (
          <button
            key={p}
            id={`share-${p}-btn`}
            onClick={() => handleShare(p)}
            className="flex-1 h-9 rounded-lg border border-[#0F6E56] bg-transparent text-[#5DCAA5] font-mono text-[10px] font-bold cursor-pointer tracking-[0.03em] transition-colors hover:bg-[#085041]"
          >
            {p === "linkedin" ? "LinkedIn" : p === "x" ? "Post on X" : "Copy link"}
          </button>
        ))}
      </div>
    </div>
  );
}
