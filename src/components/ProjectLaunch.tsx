import { useState } from "react";
import { Check, Copy, ExternalLink, Rocket, Target } from "lucide-react";
import type { ProjectGuide } from "@/data/project-code";
import { externalLinkProps } from "@/lib/external";

type Site = { name: string; url: string; emoji: string; note: string };

function sitesFor(guide: ProjectGuide): Site[] {
  const langs = new Set(guide.files.map((f) => f.lang));
  if (langs.has("python"))
    return [
      { name: "Replit", emoji: "🌀", url: "https://replit.com/languages/python3", note: "Paste the code into main.py and press Run" },
      { name: "Google Colab", emoji: "📓", url: "https://colab.research.google.com/#create=true", note: "New notebook → paste into a cell → Shift+Enter" },
      { name: "Programiz", emoji: "🐍", url: "https://www.programiz.com/python-programming/online-compiler/", note: "Instant Python compiler, no sign-up" },
    ];
  if (langs.has("jsx"))
    return [
      { name: "StackBlitz", emoji: "⚡", url: "https://stackblitz.com/fork/react", note: "Replace App.jsx with the code and it runs live" },
      { name: "CodeSandbox", emoji: "📦", url: "https://codesandbox.io/s/new", note: "React template → paste into App.js" },
    ];
  if (langs.has("sql"))
    return [{ name: "DB Fiddle", emoji: "🗄️", url: "https://www.db-fiddle.com/", note: "Paste schema on the left, queries on the right" }];
  return [
    { name: "StackBlitz", emoji: "⚡", url: "https://stackblitz.com/fork/node", note: "Create files with the same names and paste" },
    { name: "Replit", emoji: "🌀", url: "https://replit.com/languages/nodejs", note: "Paste the code into index.js and press Run" },
  ];
}

function isWeb(guide: ProjectGuide) {
  return guide.files.some((f) => f.lang === "html");
}

export function ProjectLaunch({ guide, name }: { guide: ProjectGuide; name: string }) {
  const [copied, setCopied] = useState(false);
  const pick = (lang: string) => guide.files.find((f) => f.lang === lang)?.code ?? "";
  const codepenData = JSON.stringify({
    title: `${name} — CodeQuest`,
    html: pick("html").replace(/<link[^>]*style\.css[^>]*>/g, "").replace(/<script[^>]*script\.js[^>]*><\/script>/g, ""),
    css: pick("css"),
    js: pick("js"),
  });
  const allCode = guide.files.map((f) => `// ===== ${f.name} =====\n${f.code}`).join("\n\n");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(allCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <Rocket className="size-6 text-primary" /> Run it on a real platform
        </h2>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-bold transition-all active:scale-95"
        >
          {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
          {copied ? "Code copied!" : "Copy all code"}
        </button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Open this project in a professional online editor — the same tools real developers use.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {isWeb(guide) && (
          <form action="https://codepen.io/pen/define" method="POST" target="_blank" className="contents">
            <input type="hidden" name="data" value={codepenData} />
            <button
              type="submit"
              className="flex flex-col items-start rounded-2xl bg-gradient-primary p-4 text-left text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5"
            >
              <span className="flex w-full items-center font-black">
                🖊️ Open in CodePen <ExternalLink className="ml-auto size-4" />
              </span>
              <span className="mt-1 text-xs opacity-90">Code loads automatically and runs instantly</span>
            </button>
          </form>
        )}
        {sitesFor(guide).map((s) => (
          <a
            key={s.name}
            {...externalLinkProps(s.url)}
            onClick={copy}
            className="flex flex-col rounded-2xl bg-secondary/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex items-center font-black">
              {s.emoji} Open in {s.name} <ExternalLink className="ml-auto size-4 text-muted-foreground" />
            </span>
            <span className="mt-1 text-xs text-muted-foreground">{s.note} (code is copied for you)</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function PracticeZone({ guide, name }: { guide: ProjectGuide; name: string }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const steps = [
    { t: "Read before you type", d: `Open each file above and say out loud what every block of ${name} does.` },
    { t: "Type it yourself", d: "Open an online editor, but don't paste — type the code line by line. Typing builds memory." },
    { t: "Run and break it", d: "Run it, then change one value (a colour, a number, a word) and predict what happens before running again." },
    { t: "Fix your own bugs", d: "Got an error? Read the message, check spelling and brackets, then ask QuestBot if stuck." },
    ...guide.stretch.map((s) => ({ t: "Challenge", d: s })),
    { t: "Rebuild from memory", d: "Close the guide and rebuild the core feature from scratch. Peek only when truly stuck." },
  ];
  const count = Object.values(done).filter(Boolean).length;

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <Target className="size-6 text-orange" /> Practice Zone
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-sm font-black">
          {count}/{steps.length} done
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Want to really learn it? Follow these steps in order and tick them off.</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-gradient-primary transition-all" style={{ width: `${(count / steps.length) * 100}%` }} />
      </div>
      <ol className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className="flex w-full items-start gap-3 rounded-2xl bg-secondary/70 p-3 text-left transition-all hover:shadow-soft"
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-black ${
                  done[i] ? "bg-success text-primary-foreground" : "bg-gradient-primary text-primary-foreground"
                }`}
              >
                {done[i] ? <Check className="size-4" /> : i + 1}
              </span>
              <span>
                <span className={`block text-sm font-black ${done[i] ? "line-through opacity-60" : ""}`}>{s.t}</span>
                <span className="block text-sm text-muted-foreground">{s.d}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
