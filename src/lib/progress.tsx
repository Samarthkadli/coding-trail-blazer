import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { levels } from "@/data/content";

type ProgressState = {
  xp: number;
  done: string[];
  badges: string[];
  streak: number;
};

const DEFAULT: ProgressState = {
  xp: 720,
  done: ["tech-explorer", "coding-valley", "q8"],
  badges: ["first-code", "ai-explorer", "github-starter"],
  streak: 5,
};

const KEY = "codequest-progress-v1";

type Ctx = ProgressState & {
  hydrated: boolean;
  isDone: (id: string) => boolean;
  complete: (id: string, xp: number, badge?: string) => void;
  addXp: (xp: number) => void;
  reset: () => void;
  level: (typeof levels)[number];
  next: (typeof levels)[number] | null;
  levelProgress: number;
  lastGain: { id: number; xp: number } | null;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);
  const [lastGain, setLastGain] = useState<{ id: number; xp: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const addXp = useCallback((xp: number) => {
    setState((s) => ({ ...s, xp: s.xp + xp }));
    setLastGain({ id: Date.now(), xp });
  }, []);

  const complete = useCallback((id: string, xp: number, badge?: string) => {
    setState((s) => {
      if (s.done.includes(id)) return s;
      return {
        ...s,
        xp: s.xp + xp,
        done: [...s.done, id],
        badges: badge && !s.badges.includes(badge) ? [...s.badges, badge] : s.badges,
      };
    });
    setLastGain({ id: Date.now(), xp });
  }, []);

  const value = useMemo<Ctx>(() => {
    const current = ([...levels].reverse().find((l) => state.xp >= l.min) ?? levels[0])!;
    const next = levels.find((l) => l.min > current.min) ?? null;
    const span = next ? next.min - current.min : 1;
    const levelProgress = next ? Math.min(100, Math.round(((state.xp - current.min) / span) * 100)) : 100;
    return {
      ...state,
      hydrated,
      lastGain,
      isDone: (id: string) => state.done.includes(id),
      complete,
      addXp,
      reset: () => setState(DEFAULT),
      level: current,
      next,
      levelProgress,
    };
  }, [state, hydrated, lastGain, complete, addXp]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}