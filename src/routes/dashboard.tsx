import { createFileRoute } from "@tanstack/react-router";
import { Flame, Target } from "lucide-react";
import { badges, quests, worlds } from "@/data/content";
import { Card, Chip, CTAButton, Reveal, Section, XpTag } from "@/components/site";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Progress — CodeQuest Dashboard" },
      { name: "description", content: "Your level, XP, learning streak, badges, completed quests and the next recommended step in your tech adventure." },
      { property: "og:title", content: "My Progress — CodeQuest Dashboard" },
      { property: "og:description", content: "Track XP, levels, streaks and badges as you learn AI and coding." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { xp, level, next, levelProgress, streak, badges: owned, done, isDone, hydrated, reset } = useProgress();
  const nextWorld = worlds.find((w) => !isDone(w.id));
  const nextQuest = quests.find((q) => !isDone(q.id));

  return (
    <>
      <Section
        eyebrow="Dashboard"
        title={<>Welcome back, Explorer 👋</>}
        subtitle="Ready for your next mission?"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card className="h-full">
              <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">Your Adventure</p>
              <p className="mt-2 font-display text-3xl">
                Level {level.level} — {level.name} {level.emoji}
              </p>
              <div className="mt-5 h-4 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-hero transition-all duration-1000"
                  style={{ width: `${hydrated ? levelProgress : 0}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm font-bold text-muted-foreground">
                <span>{hydrated ? xp : 0} XP</span>
                <span>{next ? `${next.min} XP → ${next.name} ${next.emoji}` : "Max level reached 🚀"}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {next
                  ? `${next.min - xp} XP remaining to unlock the next level.`
                  : "You've mastered the map. Time to mentor someone else."}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <p className="flex items-center gap-2 text-xs font-black uppercase"><Flame className="size-4 text-orange" /> Streak</p>
                  <p className="font-display text-2xl">{streak} days</p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <p className="text-xs font-black uppercase">Completed</p>
                  <p className="font-display text-2xl">{hydrated ? done.length : 0} quests</p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <p className="text-xs font-black uppercase">Badges</p>
                  <p className="font-display text-2xl">{hydrated ? owned.length : 0} / {badges.length}</p>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card className="h-full">
              <p className="flex items-center gap-2 text-xs font-black tracking-widest uppercase"><Target className="size-4 text-primary" /> Next Mission</p>
              <p className="mt-3 font-display text-xl">{nextWorld ? `Explore ${nextWorld.name} ${nextWorld.emoji}` : "Mentor a new explorer 🌟"}</p>
              <p className="mt-1 text-sm text-muted-foreground">{nextWorld?.tagline ?? "You've cleared every world on the map."}</p>
              {nextQuest && (
                <div className="mt-4 rounded-2xl bg-secondary/70 p-4">
                  <Chip tone="primary">{nextQuest.no}</Chip>
                  <p className="mt-2 text-sm font-bold">{nextQuest.title}</p>
                  <div className="mt-2"><XpTag xp={nextQuest.xp} /></div>
                </div>
              )}
              <div className="mt-5 flex flex-col gap-2">
                <CTAButton to="/adventure" className="px-5 py-2.5">Continue Adventure →</CTAButton>
                <CTAButton to="/quests" variant="ghost" className="px-5 py-2.5">See all missions</CTAButton>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Collection" title="Your badges 🏅">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => {
            const unlocked = hydrated && owned.includes(b.id);
            return (
              <Reveal key={b.id} delay={i * 40}>
                <Card className={cn("h-full text-center", !unlocked && "opacity-60")}>
                  <div className={cn("mx-auto flex size-16 items-center justify-center rounded-2xl text-3xl", unlocked ? "animate-pop bg-gradient-sunrise shadow-glow" : "bg-secondary grayscale")}>{b.emoji}</div>
                  <p className="mt-3 font-display text-lg">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.how}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <button onClick={reset} className="mt-8 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary">
          Reset my adventure
        </button>
      </Section>
    </>
  );
}
