import { useState } from "react";
import { quiz } from "@/data/content";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { CTAButton, XpTag } from "@/components/site";

export function QuizCard() {
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const { addXp } = useProgress();
  const q = quiz[i]!;
  const answered = choice !== null;
  const correct = choice === q.answer;

  const pick = (idx: number) => {
    if (answered) return;
    setChoice(idx);
    if (idx === q.answer) {
      setScore((s) => s + 1);
      addXp(q.xp);
    }
  };

  const next = () => {
    setChoice(null);
    setI((v) => (v + 1) % quiz.length);
  };

  return (
    <div className="glass rounded-[2rem] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black tracking-widest text-muted-foreground uppercase">
          Quiz {i + 1} / {quiz.length}
        </span>
        <span className="text-xs font-black text-primary">Score {score}</span>
      </div>
      <h3 className="mt-3 font-display text-xl sm:text-2xl">{q.q}</h3>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o, idx) => {
          const isRight = idx === q.answer;
          return (
            <button
              key={o}
              onClick={() => pick(idx)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all",
                !answered && "border-border bg-card hover:-translate-y-0.5 hover:shadow-soft",
                answered && isRight && "border-success bg-success/15",
                answered && !isRight && idx === choice && "border-destructive bg-destructive/10",
                answered && !isRight && idx !== choice && "border-border bg-card opacity-60",
              )}
            >
              <span className="mr-2 font-black text-muted-foreground">{"ABCD"[idx]}.</span>
              {o}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="animate-pop mt-5 rounded-2xl bg-secondary p-4">
          <p className="font-display text-lg">{correct ? "Correct! 🎉" : "Not quite — and that's fine 🌱"}</p>
          <p className="mt-1 text-sm text-muted-foreground">{q.why}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {correct && <XpTag xp={q.xp} />}
            <CTAButton onClick={next} variant="ghost" className="px-4 py-2">
              Next question →
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
