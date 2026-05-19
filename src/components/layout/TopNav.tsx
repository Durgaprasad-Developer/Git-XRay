"use client";

interface TopNavProps {
  onNewScan: () => void;
  showNewScan: boolean;
}

export default function TopNav({ onNewScan, showNewScan }: TopNavProps) {
  return (
    <nav className="flex items-center justify-between py-[18px] border-b border-[#242424] mb-0">
      <div
        className="font-display text-[15px] font-extrabold text-[#5DCAA5] tracking-tight cursor-pointer"
        onClick={onNewScan}
      >
        GitHub<span className="text-[#787672] font-display">Xray</span>
      </div>
      <div className="flex items-center gap-[10px]">
        {showNewScan && (
          <button
            onClick={onNewScan}
            className="text-[10px] text-[#787672] hover:text-[#ebebeb] transition-colors cursor-pointer bg-transparent border-none font-mono"
          >
            ← New scan
          </button>
        )}
        <span className="text-[9px] bg-[#085041] text-[#5DCAA5] px-[9px] py-[3px] rounded-full tracking-[0.1em] border border-[#0F6E56]">
          v2 · Free
        </span>
      </div>
    </nav>
  );
}
