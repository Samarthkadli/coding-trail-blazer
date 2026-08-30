import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import aiBg from "@/assets/ai-bg.jpg";
import bgAdventure from "@/assets/bg-adventure.jpg";
import bgAiTools from "@/assets/bg-aitools.jpg";
import bgCoding from "@/assets/bg-coding.jpg";
import bgProjects from "@/assets/bg-projects.jpg";
import bgQuests from "@/assets/bg-quests.jpg";
import bgCareer from "@/assets/bg-career.jpg";
import bgCommunity from "@/assets/bg-community.jpg";
import bgDashboard from "@/assets/bg-dashboard.jpg";

/** Each route gets its own realistic AI/tech backdrop. */
const backgrounds: { match: string; src: string }[] = [
  { match: "/adventure", src: bgAdventure },
  { match: "/ai-tools", src: bgAiTools },
  { match: "/coding", src: bgCoding },
  { match: "/projects", src: bgProjects },
  { match: "/quests", src: bgQuests },
  { match: "/career", src: bgCareer },
  { match: "/community", src: bgCommunity },
  { match: "/dashboard", src: bgDashboard },
];

const allSources = [aiBg, ...backgrounds.map((b) => b.src)];

export function PageBackground() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = backgrounds.find((b) => pathname.startsWith(b.match));
  const activeSrc = current?.src ?? aiBg;

  // Preload every backdrop once so route changes never flash blank.
  useEffect(() => {
    for (const src of allSources) {
      const img = new Image();
      img.src = src;
    }
  }, []);

  return (
    <>
      {/* Stacked layers cross-fade — the previous image stays until the next is visible */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {allSources.map((src) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url(${src})`, opacity: src === activeSrc ? 1 : 0 }}
          />
        ))}
      </div>
      {/* Barely-there veil — artwork stays vivid and eye-catching */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background/10" />
      {/* Gentle vignette only at top (navbar) and bottom (footer) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 40%, transparent) 0%, transparent 12%, transparent 88%, color-mix(in oklab, var(--background) 45%, transparent) 100%)",
        }}
      />
    </>
  );
}
