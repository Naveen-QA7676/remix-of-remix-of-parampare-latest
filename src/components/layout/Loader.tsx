import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [opacity, setOpacity] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Stage 1: Invisible (Initial state)
    // Stage 2: Low opacity
    const t1 = setTimeout(() => setOpacity(0.1), 500);
    // Stage 3: Moderate opacity
    const t2 = setTimeout(() => setOpacity(0.5), 1500);
    // Stage 4: Full opacity
    const t3 = setTimeout(() => setOpacity(1), 2500);
    
    // Start exit transition
    const t4 = setTimeout(() => {
      setIsExiting(true);
    }, 4500);

    // Unmount and notify parent
    const t5 = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#faf8f5] transition-opacity duration-500 ease-in-out",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div
        className="text-center transition-opacity duration-1000 ease-in-out select-none flex flex-col items-center px-4"
        style={{ opacity }}
      >
        {/* Kannada Branding - Image based for consistent style */}
        <div className="mb-4">
          <img 
            src="/kannada-logo.png" 
            alt="Parampare" 
            className="h-10 md:h-14 lg:h-18 w-auto object-contain"
          />
        </div>
        
        <div className="w-12 h-[1px] bg-black/10 mb-4" />
        
        {/* Hashtag Branding - Reduced tracking and margin */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-black tracking-[0.1em] animate-pulse-subtle">
          #ParampareForLife
        </h1>
      </div>
    </div>
  );
};

export default Loader;
