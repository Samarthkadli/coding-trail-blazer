import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/data/content";
import { getGuide, slugify, type CodeFile } from "@/data/project-code";
import { Chip, CTAButton, XpTag } from "@/components/site";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => slugify(p.name) === params.slug);
    const guide = getGuide(params.slug);
    if (!project || !guide) throw notFound();
    return { project, guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — CodeQuest" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — Code & Build Guide — CodeQuest`;
    return {
      meta: [
        { title },
        { name: "description", content: `${project.description} Full starter code, step-by-step build guide and a live playground for the ${project.name} project.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `${project.description} Copy the code, run it and ship it.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="mx-auto w-[min(1180px,92vw)] py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 font-display text-3xl">That project isn't on the map yet</h1>
      <div className="mt-6 flex justify-center">
        <CTAButton to="/projects">← Back to all projects</CTAButton>
      </div>
    </div>
  );
}

const langLabel: Record<CodeFile["lang"], string> = {
  html: "HTML", css: "CSS", js: "JavaScript", jsx: "React", python: "Python", sql: "SQL",
};

function buildPreview(files: CodeFile[]) {
  const html = files.find((f) => f.lang === "html")?.code ?? "";
  const css = files.find((f) => f.lang === "css")?.code ?? "";
  const js = files.find((f) => f.lang === "js")?.code ?? "";
  return html
    .replace(/<link[^>]*rel="stylesheet"[^>]*>/g, `<style>${css}</style>`)
    .replace(/<script src="[^"]*"><\/script>/g, `<script>${js}<\/script>`);
}

function ProjectDetail() {
  const { project, guide } = Route.useLoaderData();
  const { complete, isDone, hydrated } = useProgress();
  const doneId = `project-${project.name}`;
  const finished = hydrated && isDone(doneId);

  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);

  const file = guide.files[active] ?? guide.files[0]!;
  const preview = useMemo(() => buildPreview(guide.files), [guide.files]);
  const consoleText = guide.output ?? "";

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    setRunning(true);
    setRan(false);
    setTyped("");
    if (guide.runnable) {
      timers.current.push(window.setTimeout(() => { setRunning(false); setRan(true); }, 500));
      return;
    }
    timers.current.push(window.setTimeout(() => {
      setRunning(false);
      setRan(true);
      let i = 0;
      const tick = () => {
        i += 2;
        setTyped(consoleText.slice(0, i));
        if (i < consoleText.length) timers.current.push(window.setTimeout(tick, 12));
      };
      tick();
    }, 600));
  }

  function copy() {
    navigator.clipboard?.writeText(file.code);
    setCopied(true);
    timers.current.push(window.setTimeout(() => setCopied(false), 1500));
  }

  return (
    <div className="mx-auto w-[min(1180px,92vw)] py-10">
      <Link to="/projects" className="text-sm font-bold text-muted-foreground hover:text-foreground">
        ← All projects
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">
            {project.emoji} {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{guide.intro}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="primary">{project.category}</Chip>
            <Chip tone="orange">⏱ {project.time}</Chip>
            {project.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}
          </div>
        </div>
        <XpTag xp={project.xp} />
      </header>

      {/* ==== Online compiler ==== */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-[#0f172a] shadow-lift">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <p className="ml-3 truncate font-mono text-xs text-white/50">
            codequest ~ /{guide.slug}
          </p>
          <button
            onClick={run}
            className="ml-auto rounded-md bg-[#28c840] px-3 py-1.5 text-xs font-black text-[#052e12] transition hover:brightness-110 active:scale-95"
          >
            {running ? "Running…" : "▶ Run"}
          </button>
        </div>

        <div className="grid lg:grid-cols-[170px_1fr]">
          {/* file tree */}
          <aside className="border-b border-white/10 p-2 lg:border-b-0 lg:border-r">
            <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/35">Files</p>
            <div className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
              {guide.files.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full whitespace-nowrap rounded-md px-2 py-1.5 text-left font-mono text-xs transition",
                    i === active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5",
                  )}
                >
                  <span className="mr-1.5">📄</span>{f.name}
                </button>
              ))}
            </div>
          </aside>

          {/* editor */}
          <div>
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2">
              <p className="font-mono text-xs text-white/70">{file.name}</p>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                {langLabel[file.lang]}
              </span>
              <button
                onClick={copy}
                className="ml-auto rounded-md border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/60 transition hover:bg-white/10"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <div className="max-h-[460px] overflow-auto">
              <pre className="flex min-w-full text-[12.5px] leading-6">
                <code className="select-none border-r border-white/10 px-3 py-4 text-right font-mono text-white/25">
                  {file.code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                </code>
                <code className="flex-1 px-4 py-4 font-mono text-[#e2e8f0]">{file.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* output */}
        <div className="border-t border-white/10">
          <p className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
            {guide.runnable ? "Live preview" : "Console output"}
          </p>
          {!ran && !running && (
            <p className="px-4 pb-5 font-mono text-xs text-white/40">
              Press ▶ Run to {guide.runnable ? "see this project come alive" : "see what this prints"}.
            </p>
          )}
          {running && <p className="px-4 pb-5 font-mono text-xs text-white/60">Compiling…</p>}
          {ran && guide.runnable && (
            <iframe
              title={`${project.name} live preview`}
              srcDoc={preview}
              sandbox="allow-scripts allow-modals"
              className="h-[380px] w-full border-0 bg-white"
            />
          )}
          {ran && !guide.runnable && (
            <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap px-4 pb-5 font-mono text-xs text-[#8ef2a4]">
              {typed}
              <span className="animate-pulse">▌</span>
            </pre>
          )}
        </div>
      </div>

      {/* ==== Build guide ==== */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">How to build it 🛠️</h2>
          <ol className="mt-4 space-y-3">
            {guide.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-black text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">You'll learn</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.skills.map((s) => <Chip key={s} tone="success">{s}</Chip>)}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Level it up 🚀</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {guide.stretch.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton
          onClick={() => complete(doneId, project.xp, "project-builder")}
          variant={finished ? "ghost" : "primary"}
        >
          {finished ? "Completed ✓" : `Mark complete · +${project.xp} XP`}
        </CTAButton>
        <CTAButton to="/projects" variant="ghost">Pick another project</CTAButton>
      </div>
    </div>
  );
}
