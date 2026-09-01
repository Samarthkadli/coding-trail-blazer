import { createFileRoute } from "@tanstack/react-router";
import { platforms } from "@/data/content";
import { Card, Chip, CTAButton, Reveal, Section } from "@/components/site";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title: "Coding Playground — CodeQuest" },
      { name: "description", content: "GitHub, VS Code, Replit, LeetCode, HackerRank, Kaggle and more, explained simply: what it is, why use it, who it's for and the first thing to try." },
      { property: "og:title", content: "Coding Playground — CodeQuest" },
      { property: "og:description", content: "The developer platforms every beginner should meet, with a first step for each." },
    ],
  }),
  component: CodingPage,
});

function CodingPage() {
  return (
    <Section
      eyebrow="Playground"
      title="Discover Your Coding Playground 🎮"
      subtitle="Nine places where code actually happens. Pick one, try the first step, come back for the next."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p, i) => (
          <Reveal key={p.name} delay={i * 40}>
            <Card className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-2xl">{p.name} {p.emoji}</p>
                <Chip tone={p.difficulty === "Beginner" ? "success" : p.difficulty === "Easy" ? "cyan" : "orange"}>
                  {p.difficulty}
                </Chip>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.what}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="rounded-2xl bg-secondary/70 p-3">
                  <dt className="text-xs font-black tracking-widest uppercase">Why use it</dt>
                  <dd className="text-muted-foreground">{p.why}</dd>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-3">
                  <dt className="text-xs font-black tracking-widest uppercase">Who it's for</dt>
                  <dd className="text-muted-foreground">{p.who}</dd>
                </div>
                <div className="rounded-2xl bg-cyan/15 p-3">
                  <dt className="text-xs font-black tracking-widest uppercase">First thing to try</dt>
                  <dd className="text-muted-foreground">{p.firstTry}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-5">
                <CTAButton href={p.url} className="px-5 py-2.5">Explore →</CTAButton>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
