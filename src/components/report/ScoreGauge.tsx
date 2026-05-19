"use client";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  // Circumference of r=58 circle: 2π×58 ≈ 364.4
  const circumference = 364.4;
  // We want to fill ~270° of the 360° circle (leaving a 90° gap at bottom)
  const maxArc = (270 / 360) * circumference; // ≈ 273.3
  const gap = circumference - maxArc; // ≈ 91.1
  const filled = (score / 100) * maxArc;
  const dashOffset = circumference - filled;

  const scoreColor =
    score >= 75 ? "#5DCAA5" : score >= 50 ? "#EF9F27" : "#E24B4A";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        className="overflow-visible"
        width="140"
        height="140"
        viewBox="0 0 140 140"
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF9F27" />
            <stop offset="50%" stopColor="#1D9E75" />
            <stop offset="100%" stopColor="#5DCAA5" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="#1f1f1f"
          strokeWidth="10"
        />
        {/* Score arc */}
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-225 70 70)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {/* Score number */}
        <text
          x="70"
          y="64"
          textAnchor="middle"
          fontFamily="'Syne', sans-serif"
          fontSize="28"
          fontWeight="800"
          fill={scoreColor}
        >
          {score}
        </text>
        <text
          x="70"
          y="82"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="9"
          fill="#4a4a48"
          letterSpacing="0.06em"
        >
          /100
        </text>
        <text
          x="70"
          y="97"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="8"
          fill="#1D9E75"
          letterSpacing="0.1em"
        >
          XRAY SCORE
        </text>
      </svg>
    </div>
  );
}
