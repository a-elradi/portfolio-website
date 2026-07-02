"use client";

import { useEffect, useState } from "react";
import { ParticleTextEffect } from "./particle-text-effect";

const INTRO_WORDS = ["WELCOME", "TO", "ABDALLA'S PORTFOLIO"];

export function IntroScreen({ onFinish }) {
  const [isFading, setIsFading] = useState(false);

  const finish = () => {
    setIsFading(true);
    window.setTimeout(() => {
      onFinish();
    }, 600);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = () => finish();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030014] transition-opacity duration-500 ease-out cursor-pointer ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <ParticleTextEffect words={INTRO_WORDS} playOnce frameInterval={130} onComplete={finish} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
        Click anywhere to skip
      </div>
    </div>
  );
}
