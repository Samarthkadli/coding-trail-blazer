import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { startingPaths } from "@/data/content";
import { Reveal } from "@/components/site";
import { cn } from "@/lib/utils";

export function StarterPicker() {
  const [picked, setPicked] = useState<string | null>(null);
  const path = picked ? startingPaths[picked] : null;

  return (
    <Reveal>
      <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-gradient-aqua opacity-30 blur-3xl" />
        <h3 className="font-display text-2xl sm:text-3xl">🤔 Not Sure Where To Start?</h3>
        <p className="mt-2 max-w-xl text-muted-foreground">
          That's completely okay. Tell us what you're interested in and we'll create your starting path.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {Object.entries(startingPaths).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setPicked(key)}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-bold transition-all active:scale-95",
                picked === key
                  ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card hover:-translate-y-0.5 hover:shadow-soft",
              )}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        {path && (
          <div key={picked} className="animate-pop mt-8 rounded-3xl bg-card p-5 shadow-soft sm:p-6">
            <p className="font-display text-xl">
              Your Adventure Path {path.emoji} <span className="text-muted-foreground">— {path.label}</span>
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {path.steps.map((s, i) => (
                <li
                  key={s}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="animate-rise flex items-center gap-3 rounded-2xl bg-secondary/70 px-4 py-3"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-black text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold">{s}</span>
                  {i === 0 && <Check className="ml-auto size-4 text-success" />}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-primary">
              Step one is always the smallest one <ArrowRight className="size-4" />
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );
}
