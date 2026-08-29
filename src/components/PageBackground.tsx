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

export function PageBackground() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = backgrounds.find((b) => pathname.startsWith(b.match));
  const src = current?.src ?? aiBg;

  return (
    <>
      <div
        key={src}
        aria-hidden
        className="animate-rise pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* Light veil — keeps the artwork clearly visible while preserving contrast */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background/45" />
      {/* Soft vignette so edges & text zones stay readable */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 55%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklab, var(--background) 70%, transparent) 100%)",
        }}
      />
    </>
  );
}
