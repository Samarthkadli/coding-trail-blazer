import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { aiTools, platforms, projects, startingPaths } from "@/data/content";
import { slugify } from "@/data/project-code";
import { BrandLogo } from "@/components/BrandLogo";
import { Chip, Reveal } from "@/components/site";
import { cn } from "@/lib/utils";

export function StarterPicker() {
  const [picked, setPicked] = useState<string | null>(null);
  const path = picked ? startingPaths[picked] : null;
  const showAllTools = picked === "tools";

  const pathTools = showAllTools
    ? aiTools
    : (path?.tools ?? [])
        .map((n) => aiTools.find((t) => t.name === n))
        .filter((t): t is (typeof aiTools)[number] => Boolean(t));

  const pathPlatforms = (path?.platforms ?? [])
    .map((n) => platforms.find((p) => p.name === n))
    .filter((p): p is (typeof platforms)[number] => Boolean(p));

  const pathProjects = (path?.projects ?? [])
    .map((n) => projects.find((p) => p.name === n))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  return (
    <Reveal>
      <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-gradient-aqua opacity-30 blur-3xl" />
        <h3 className="font-display text-2xl sm:text-3xl">🤔 Not Sure Where To Start?</h3>
        <p className="mt-2 max-w-xl text-muted-foreground">
          That's completely okay. Tell us what you're interested in and we'll show you exactly the steps, tools and
          projects for that path.
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
              {showAllTools ? "All AI Tools" : "Your Adventure Path"} {path.emoji}{" "}
              <span className="text-muted-foreground">— {path.label}</span>
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

            {pathTools.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                  {showAllTools ? "Every tool in your toolbox" : "Tools for this path"}
                </p>
                <div className={cn("mt-3 grid gap-3", showAllTools ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
                  {pathTools.map((t, i) => (
                    <a
                      key={t.name}
                      href={t.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ animationDelay: `${i * 50}ms` }}
                      className="animate-rise group flex items-center gap-3 rounded-2xl bg-secondary/70 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <BrandLogo name={t.name} emoji={t.emoji} className="h-9 max-w-[110px] shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black">{t.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{t.what}</span>
                      </span>
                      <ExternalLink className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {pathPlatforms.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                  Platforms to use
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pathPlatforms.map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noreferrer">
                      <Chip tone="cyan">
                        <span className="inline-flex items-center gap-1.5">
                          {p.emoji} {p.name} <ExternalLink className="size-3" />
                        </span>
                      </Chip>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {pathProjects.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                  Projects to build
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {pathProjects.map((p) => (
                    <Link
                      key={p.name}
                      to="/projects/$slug"
                      params={{ slug: slugify(p.name) }}
                      className="group flex items-center gap-3 rounded-2xl bg-secondary/70 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <span className="text-xl">{p.emoji}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black">{p.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{p.description}</span>
                      </span>
                      <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
              Step one is always the smallest one <ArrowRight className="size-4" />
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );
}
