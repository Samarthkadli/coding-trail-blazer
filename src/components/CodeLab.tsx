import { useEffect, useMemo, useRef, useState } from "react";
import type { CodeFile } from "@/data/project-code";
import { cn } from "@/lib/utils";

const langLabel: Record<CodeFile["lang"], string> = {
  html: "HTML", css: "CSS", js: "JavaScript", jsx: "React", python: "Python", sql: "SQL",
};

export function buildPreview(files: CodeFile[]) {
  const html = files.find((f) => f.lang === "html")?.code ?? "";
  const css = files.find((f) => f.lang === "css")?.code ?? "";
  const js = files.find((f) => f.lang === "js")?.code ?? "";
  return html
    .replace(/<link[^>]*rel="stylesheet"[^>]*>/g, `<style>${css}</style>`)
    .replace(/<script src="[^"]*"><\/script>/g, `<script>${js}<\/script>`);
}

export type CodeLabProps = {
  files: CodeFile[];
  runnable: boolean;
  output?: string | undefined;
  path?: string;
  previewTitle?: string;
  className?: string;
};

export function CodeLab({ files, runnable, output = "", path = "lab", previewTitle = "Live preview", className }: CodeLabProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);

  const file = files[active] ?? files[0]!;
  const preview = useMemo(() => buildPreview(files), [files]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    setRunning(true);
    setRan(false);
    setTyped("");
    if (runnable) {
      timers.current.push(window.setTimeout(() => { setRunning(false); setRan(true); }, 500));
      return;
    }
    timers.current.push(window.setTimeout(() => {
      setRunning(false);
      setRan(true);
      let i = 0;
      const tick = () => {
        i += 2;
        setTyped(output.slice(0, i));
        if (i < output.length) timers.current.push(window.setTimeout(tick, 12));
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
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-[#0f172a] shadow-lift", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <p className="ml-3 truncate font-mono text-xs text-white/50">codequest ~ /{path}</p>
        <button
          onClick={run}
          className="ml-auto rounded-md bg-[#28c840] px-3 py-1.5 text-xs font-black text-[#052e12] transition hover:brightness-110 active:scale-95"
        >
          {running ? "Running…" : "▶ Run"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[170px_1fr]">
        <aside className="border-b border-white/10 p-2 lg:border-b-0 lg:border-r">
          <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/35">Files</p>
          <div className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
            {files.map((f, i) => (
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

      <div className="border-t border-white/10">
        <p className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
          {runnable ? "Live preview" : "Console output"}
        </p>
        {!ran && !running && (
          <p className="px-4 pb-5 font-mono text-xs text-white/40">
            Press ▶ Run to {runnable ? "see this come alive" : "see what this prints"}.
          </p>
        )}
        {running && <p className="px-4 pb-5 font-mono text-xs text-white/60">Compiling…</p>}
        {ran && runnable && (
          <iframe
            title={previewTitle}
            srcDoc={preview}
            sandbox="allow-scripts allow-modals"
            className="h-[380px] w-full border-0 bg-white"
          />
        )}
        {ran && !runnable && (
          <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap px-4 pb-5 font-mono text-xs text-[#8ef2a4]">
            {typed}
            <span className="animate-pulse">▌</span>
          </pre>
        )}
      </div>
    </div>
  );
}
