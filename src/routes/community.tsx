import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";
import { showcase } from "@/data/content";
import { Card, Chip, CTAButton, Reveal, Section } from "@/components/site";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Creator Showcase — CodeQuest Community" },
      { name: "description", content: "See what other student explorers are building: AI study tools, campus apps, trackers and more — with the tech behind each project." },
      { property: "og:title", content: "Creator Showcase — CodeQuest Community" },
      { property: "og:description", content: "Real beginner-built projects to steal ideas from, plus a place to show yours." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <Section
      eyebrow="Community"
      title="Look What Others Are Building 🌎"
      subtitle="Every one of these started as someone's first messy repo."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {showcase.map((s, i) => (
          <Reveal key={s.project} delay={i * 40}>
            <Card className="flex h-full flex-col">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-sunrise text-2xl shadow-glow">{s.emoji}</div>
              <p className="mt-3 font-display text-xl">{s.project}</p>
              <p className="text-sm font-bold text-primary">by {s.creator}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{s.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}</div>
              <div className="mt-auto flex gap-2 pt-5 text-sm font-black">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2"><Github className="size-4" /> GitHub</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2"><ExternalLink className="size-4" /> Live Demo</span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-8"><CTAButton to="/projects">Showcase My Project →</CTAButton></div>
    </Section>
  );
}
