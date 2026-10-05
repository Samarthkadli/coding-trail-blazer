import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const links = [
  { to: "/journey", label: "Home" },
  { to: "/adventure", label: "Adventure" },
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/coding", label: "Coding" },
  { to: "/projects", label: "Projects" },
  { to: "/quests", label: "Quests" },
  { to: "/career", label: "Career" },
  { to: "/community", label: "Community" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { xp, level, hydrated } = useProgress();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass mx-auto mt-3 flex w-[min(1180px,94vw)] items-center gap-3 rounded-2xl px-4 py-2.5">
        <Link to="/journey" className="font-display text-lg tracking-tight">
          <span className="gradient-text">CodeQuest</span> 🚀
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
               activeOptions={{ exact: l.to === "/journey" }}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-bold shadow-soft sm:flex"
          >
            <Sparkles className="size-4 text-primary" />
            <span className="tabular-nums">{hydrated ? xp : 0} XP</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-full bg-gradient-primary px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-glow"
          >
            <span>{level.emoji}</span>
            <span className="hidden sm:inline">Lv {level.level}</span>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full border border-border bg-card p-2 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass mx-auto mt-2 w-[min(1180px,94vw)] overflow-hidden rounded-2xl transition-all lg:hidden",
          open ? "max-h-[26rem] p-2" : "max-h-0 border-0 p-0 opacity-0",
        )}
      >
        <nav className="grid grid-cols-2 gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-foreground" }}
               activeOptions={{ exact: l.to === "/journey" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="col-span-2 rounded-xl bg-gradient-primary px-3 py-2.5 text-center text-sm font-bold text-primary-foreground"
          >
            My Progress
          </Link>
        </nav>
      </div>
    </header>
  );
}