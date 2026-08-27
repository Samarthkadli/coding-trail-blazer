import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { badges, quests } from "@/data/content";
import { questLabs } from "@/data/mini-labs";
import { Card, Chip, CTAButton, Reveal, Section, XpTag } from "@/components/site";
import { CodeLab } from "@/components/CodeLab";
import { QuizCard } from "@/components/QuizCard";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "Daily Quests & Quizzes — CodeQuest" },
      { name: "description", content: "Today's mission, daily tech quests and quick quizzes with simple explanations. Earn XP, unlock badges and keep your learning streak alive." },
      { property: "og:title", content: "Daily Quests & Quizzes — CodeQuest" },
      { property: "og:description", content: "Small daily missions that turn learning into a streak you don't want to break." },
    ],
  }),
  component: QuestsPage,
});

function QuestsPage() {
  const { complete, isDone, hydrated, badges: owned } = useProgress();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <Section
        eyebrow="Missions"
        title="Today's Mission 🎯"
        subtitle="One small, finishable thing per day. Open the mission, read the code, press ▶ Run."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {quests.map((q, i) => {
            const done = hydrated && isDone(q.id);
            const lab = questLabs[q.id];
            const isOpen = open === q.id;
            return (
              <Reveal key={q.id} delay={i * 50}>
                <Card className={cn("h-full", done && "ring-2 ring-success/60")}>
                  <div className="flex items-center gap-2">
                    <Chip tone="primary">{q.no}</Chip>
                    <Chip>{q.tag}</Chip>
                    <XpTag xp={q.xp} />
                  </div>
                  <p className="mt-3 font-display text-xl">{q.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{q.detail}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {lab && (
                      <CTAButton
                        onClick={() => setOpen(isOpen ? null : q.id)}
                        variant={isOpen ? "ghost" : "primary"}
                        className="px-5 py-2.5"
                      >
                        {isOpen ? "Hide code" : "Start Mission →"}
                      </CTAButton>
                    )}
                    {done ? (
                      <p className="animate-pop self-center font-display text-lg text-success-foreground">Mission Completed! 🎉</p>
                    ) : (
                      <CTAButton onClick={() => complete(q.id, q.xp)} variant={lab ? "ghost" : "primary"} className="px-5 py-2.5">
                        Mark complete · +{q.xp} XP
                      </CTAButton>
                    )}
                  </div>

                  {lab && isOpen && (
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-black tracking-widest uppercase text-muted-foreground">{lab.title}</p>
                      <CodeLab
                        files={lab.files}
                        runnable={lab.runnable}
                        output={lab.output}
                        path={`quests/${q.id}`}
                        previewTitle={`${q.title} preview`}
                      />
                    </div>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Quiz Area" title="Quick check, zero pressure 🧠" subtitle="Answer, learn why, collect XP.">
        <div className="max-w-2xl"><QuizCard /></div>
      </Section>

      <Section eyebrow="Collection" title="Badges 🏅" subtitle="Proof that you showed up.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => {
            const unlocked = hydrated && owned.includes(b.id);
            return (
              <Reveal key={b.id} delay={i * 40}>
                <Card className={cn("h-full text-center", !unlocked && "opacity-60")}>
                  <div className={cn("mx-auto flex size-16 items-center justify-center rounded-2xl text-3xl", unlocked ? "bg-gradient-sunrise shadow-glow animate-pop" : "bg-secondary grayscale")}>
                    {b.emoji}
                  </div>
                  <p className="mt-3 font-display text-lg">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.how}</p>
                  <p className="mt-2 text-xs font-black tracking-widest uppercase">{unlocked ? "Unlocked ✓" : "Locked"}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
