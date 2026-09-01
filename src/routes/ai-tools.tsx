import { createFileRoute } from "@tanstack/react-router";
import { aiTools } from "@/data/content";
import { Card, Chip, CTAButton, Reveal, Section } from "@/components/site";
import { BrandLogo } from "@/components/BrandLogo";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/ai-tools")({
  head: () => ({
    meta: [
      { title: "Your AI Toolbox — CodeQuest" },
      { name: "description", content: "ChatGPT, Gemini, Claude, Copilot, Perplexity and more — explained in simple language with beginner tips and what each tool is best for." },
      { property: "og:title", content: "Your AI Toolbox — CodeQuest" },
      { property: "og:description", content: "11 popular AI tools explained for total beginners, with a first tip for each." },
    ],
  }),
  component: AiToolsPage,
});

function AiToolsPage() {
  const { complete, isDone, hydrated } = useProgress();
  return (
    <Section
      eyebrow="AI Toolbox"
      title="Your AI Toolbox 🧰"
      subtitle="No jargon. Just what each tool does, who it helps, and one tip that makes it click."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((t, i) => {
          const id = `tool-${t.name}`;
          const explored = hydrated && isDone(id);
          return (
            <Reveal key={t.name} delay={i * 40}>
              <Card className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <BrandLogo name={t.name} emoji={t.emoji} className="h-12 max-w-[160px]" />
                  <Chip tone={t.difficulty === "Beginner" ? "success" : t.difficulty === "Medium" ? "orange" : "cyan"}>
                    {t.difficulty}
                  </Chip>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.what}</p>
                <p className="mt-4 text-xs font-black tracking-widest text-muted-foreground uppercase">Best for</p>
                <ul className="mt-2 grid gap-1 text-sm">
                  {t.bestFor.map((b) => (
                    <li key={b} className="flex items-center gap-2"><span className="text-primary">◆</span>{b}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-2xl bg-secondary/70 p-3 text-sm">
                  <span className="font-black">Beginner tip: </span>“{t.tip}”
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <CTAButton href={t.url} className="px-5 py-2.5">Explore Tool →</CTAButton>
                  <CTAButton
                    variant="ghost"
                    onClick={() => complete(id, 25, "ai-explorer")}
                    className="px-4 py-2.5"
                  >
                    {explored ? "Explored ✓" : "+25 XP, mark explored"}
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
