import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/content";
import { Card, Chip, CTAButton, Reveal, Section, XpTag } from "@/components/site";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Build Something Cool — Projects — CodeQuest" },
      { name: "description", content: "Beginner, intermediate and AI project ideas with difficulty, tech stack, estimated time, skills learned and XP rewards." },
      { property: "og:title", content: "Build Something Cool — CodeQuest Projects" },
      { property: "og:description", content: "13 buildable projects, from a calculator to an AI study assistant." },
    ],
  }),
  component: ProjectsPage,
});

const cats = ["All", "Beginner", "Intermediate", "AI Projects"] as const;

function ProjectsPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const { complete, isDone, hydrated } = useProgress();
  const list = projects.filter((p) => cat === "All" || p.category === cat);

  return (
    <Section
      eyebrow="Project Planet"
      title="Build Something Cool 🚀"
      subtitle="Tutorials teach. Projects prove. Pick one that fits your week."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-all active:scale-95",
              cat === c ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card hover:shadow-soft",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const id = `project-${p.name}`;
          const started = hydrated && isDone(id);
          return (
            <Reveal key={p.name} delay={i * 40}>
              <Card className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-xl">{p.emoji} {p.name}</p>
                  <XpTag xp={p.xp} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip tone="primary">{p.category}</Chip>
                  <Chip tone="orange">⏱ {p.time}</Chip>
                  {p.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}
                </div>
                <p className="mt-3 text-sm"><span className="font-black">You'll learn: </span>{p.skills.join(", ")}</p>
                <div className="mt-auto pt-5">
                  <CTAButton
                    onClick={() => complete(id, p.xp, "project-builder")}
                    variant={started ? "ghost" : "primary"}
                    className="px-5 py-2.5"
                  >
                    {started ? "Started ✓" : "Start Project →"}
                  </CTAButton>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
