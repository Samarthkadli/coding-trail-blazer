import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";

export function XpToast() {
  const { lastGain } = useProgress();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!lastGain) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, [lastGain]);

  if (!lastGain || !show) return null;

  return (
    <div
      key={lastGain.id}
      className="animate-pop pointer-events-none fixed top-24 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-gradient-sunrise px-6 py-3 font-display text-lg text-primary-foreground shadow-lift"
    >
      +{lastGain.xp} XP 🎉
    </div>
  );
}
