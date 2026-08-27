import { useState } from "react";
import { Lock, Check, Sparkles } from "lucide-react";
import { worlds } from "@/data/content";
import { worldLabs } from "@/data/mini-labs";
import { useProgress } from "@/lib/progress";
import { Reveal, Chip, XpTag, CTAButton } from "@/components/site";
import { CodeLab } from "@/components/CodeLab";
import { cn } from "@/lib/utils";

export function AdventureMap({ compact = false }: { compact?: boolean }) {
  const { isDone, complete, hydrated } = useProgress();
  const [open, setOpen] = useState<string | null>(null);


  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-6 bottom-6 left-6 hidden w-1 rounded-full bg-gradient-hero opacity-30 sm:block" />
      <div className="grid gap-6">
        {worlds.map((w, i) => {
          const done = hydrated && isDone(w.id);
          const prevDone = i === 0 || (hydrated && isDone(worlds[i - 1]!.id));
          const locked = !done && !prevDone;
          return (
            <Reveal key={w.id} delay={i * 60}>
              <article
                className={cn(
                  "glass relative overflow-hidden rounded-[2rem] p-5 transition-all duration-300 sm:ml-16 sm:p-7",
                  !locked && "hover:-translate-y-1.5 hover:shadow-lift",
                  locked && "opacity-70",
                )}
              >
                <div
                  className={cn(
                    "absolute top-8 -left-[4.6rem] hidden size-14 items-center justify-center rounded-2xl text-2xl shadow-glow sm:flex",
                    w.gradient,
                  )}
                >
                  {w.emoji}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-xl sm:text-2xl">
                    <span className="sm:hidden">{w.emoji} </span>
                    {w.order} — {w.name}
                  </span>
                  {done ? (
                    <Chip tone="success">
                      <span className="inline-flex items-center gap-1">
                        <Check className="size-3" /> Completed
                      </span>
                    </Chip>
                  ) : locked ? (
                    <Chip>
                      <span className="inline-flex items-center gap-1">
                        <Lock className="size-3" /> Locked
                      </span>
                    </Chip>
                  ) : (
                    <Chip tone="primary">
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="size-3" /> Unlocked
                      </span>
                    </Chip>
                  )}
                  <XpTag xp={w.xp} />
                </div>

                <p className="mt-1.5 text-muted-foreground">{w.tagline}</p>

                {!compact && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {w.items.map((it) => (
                      <li key={it.title} className="rounded-2xl bg-card/80 px-4 py-3 shadow-soft">
                        <p className="text-sm font-black">{it.title}</p>
                        <p className="text-sm text-muted-foreground">{it.plain}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {!compact && lab && !locked && (
                    <CTAButton
                      onClick={() => setOpen(isOpen ? null : w.id)}
                      variant={isOpen ? "ghost" : "primary"}
                      className="px-5 py-2.5"
                    >
                      {isOpen ? "Hide code" : "Start world →"}
                    </CTAButton>
                  )}
                  {done ? (
                    <span className="self-center text-sm font-bold text-success-foreground">Checkpoint cleared 🎉</span>
                  ) : (
                    <CTAButton
                      onClick={() => !locked && complete(w.id, w.xp)}
                      variant={locked || (lab && !compact) ? "ghost" : "primary"}
                      className={cn("px-5 py-2.5", locked && "cursor-not-allowed opacity-60")}
                    >
                      {locked ? "Finish the previous world first" : `Complete ${w.name} →`}
                    </CTAButton>
                  )}
                </div>

                {!compact && lab && isOpen && !locked && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-black tracking-widest uppercase text-muted-foreground">{lab.title}</p>
                    <CodeLab
                      files={lab.files}
                      runnable={lab.runnable}
                      output={lab.output}
                      path={`worlds/${w.id}`}
                      previewTitle={`${w.name} preview`}
                    />
                  </div>
                )}

              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
