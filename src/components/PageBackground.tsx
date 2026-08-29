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
const backgrounds: { match: string; src: string; veil: string }[] = [
  { match: "/adventure", src: bgAdventure, veil: "bg-background/84" },
  { match: "/ai-tools", src: bgAiTools, veil: "bg-background/86" },
  { match: "/coding", src: bgCoding, veil: "bg-background/86" },
  { match: "/projects", src: bgProjects, veil: "bg-background/85" },
  { match: "/quests", src: bgQuests, veil: "bg-background/85" },
  { match: "/career", src: bgCareer, veil: "bg-background/85" },
  { match: "/community", src: bgCommunity, veil: "bg-background/86" },
  { match: "/dashboard", src: bgDashboard, veil: "bg-background/85" },
];

export function PageBackground() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = backgrounds.find((b) => pathname.startsWith(b.match));
  const src = current?.src ?? aiBg;
  const veil = current?.veil ?? "bg-background/82";

  return (
    <>
      <div
        key={src}
        aria-hidden
        className="animate-rise pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div aria-hidden className={`pointer-events-none fixed inset-0 -z-10 backdrop-blur-[2px] ${veil}`} />
    </>
  );
}
