"use client";

import { useEffect, useState } from "react";

interface ScanningViewProps {
  username: string;
}

const SCAN_STEPS = [
  "Fetching GitHub profile + repos...",
  "Evaluating README quality...",
  "Detecting tech stack + depth signals...",
  "Scoring career dimensions...",
  "Running AI personality engine...",
  "Simulating recruiter impression...",
  "Generating your Xray card...",
];

type StepState = "idle" | "active" | "done";

export default function ScanningView({ username }: ScanningViewProps) {
  const [stepStates, setStepStates] = useState<StepState[]>(
    SCAN_STEPS.map(() => "idle")
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentStep = 0;

    const nextStep = () => {
      if (currentStep >= SCAN_STEPS.length) {
        setProgress(100);
        return;
      }

      setStepStates((prev) => {
        const next = [...prev];
        if (currentStep > 0) next[currentStep - 1] = "done";
        next[currentStep] = "active";
        return next;
      });
      setProgress(Math.round(((currentStep + 1) / SCAN_STEPS.length) * 100));
      currentStep++;

      const delay = 400 + Math.random() * 300;
      setTimeout(nextStep, delay);
    };

    nextStep();
  }, []);

  return (
    <section className="py-14">
      <div className="bg-[#101010] border border-[#2e2e2e] rounded-[12px] p-7 max-w-[430px]">
        {/* Header */}
        <div className="flex items-center gap-[9px] text-[9px] text-[#1D9E75] tracking-[0.15em] uppercase mb-6">
          <span className="w-[7px] h-[7px] rounded-full bg-[#1D9E75] animate-pulse-dot" />
          Analyzing profile
        </div>

        {/* Steps */}
        <div className="space-y-[10px]">
          {SCAN_STEPS.map((step, i) => {
            const state = stepStates[i];
            return (
              <div
                key={i}
                className={`text-[11.5px] flex items-center gap-2 min-h-5 transition-all duration-300 ${
                  state === "idle"
                    ? "opacity-0 text-[#4a4a48]"
                    : state === "active"
                    ? "opacity-100 text-[#5DCAA5]"
                    : "opacity-40 text-[#4a4a48]"
                }`}
              >
                <span className="text-[9px] flex-shrink-0 w-3">
                  {state === "idle" && "○"}
                  {state === "active" && "▶"}
                  {state === "done" && "✓"}
                </span>
                {step}
                {state === "active" && (
                  <span className="inline-block w-2 h-[15px] bg-[#1D9E75] animate-blink ml-[3px] align-[-3px]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Username display */}
        <div className="mt-[1.1rem] text-[11px] text-[#4a4a48]">
          <span className="text-[#5DCAA5]">{username}</span>
          <span className="inline-block w-2 h-[15px] bg-[#1D9E75] animate-blink ml-[3px] align-[-3px]" />
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-[#242424] rounded-[2px] overflow-hidden mt-5">
          <div
            className="h-full bg-[#1D9E75] rounded-[2px] transition-[width] duration-400 ease-[ease]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
