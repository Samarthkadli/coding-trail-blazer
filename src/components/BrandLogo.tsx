import { useState } from "react";
import { cn } from "@/lib/utils";

import chatgpt from "@/assets/logos/chatgpt.webp.asset.json";
import claude from "@/assets/logos/claude.jpg.asset.json";
import gemini from "@/assets/logos/gemini.jpeg.asset.json";
import copilot from "@/assets/logos/copilot.jpeg.asset.json";
import cursor from "@/assets/logos/cursor.png.asset.json";
import replit from "@/assets/logos/replit.png.asset.json";
import perplexity from "@/assets/logos/perplexity.jpeg.asset.json";
import notebooklm from "@/assets/logos/notebooklm.png.asset.json";
import canva from "@/assets/logos/canva.jpeg.asset.json";
import github from "@/assets/logos/github.png.asset.json";

const LOGOS: Record<string, string> = {
  "ChatGPT": chatgpt.url,
  "Claude": claude.url,
  "Gemini": gemini.url,
  "Microsoft Copilot": copilot.url,
  "Cursor": cursor.url,
  "Replit": replit.url,
  "Perplexity": perplexity.url,
  "NotebookLM": notebooklm.url,
  "Canva AI": canva.url,
  "GitHub": github.url,
  "GitHub Copilot": github.url,
};

export function BrandLogo({
  name,
  emoji,
  className,
}: {
  name: string;
  emoji?: string;
  className?: string;
}) {
  const src = LOGOS[name];
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className={cn("inline-flex h-10 items-center text-2xl", className)} aria-hidden>
        {emoji}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-10 w-auto max-w-[140px] items-center justify-center overflow-hidden rounded-xl bg-white/95 px-2 py-1 shadow-sm ring-1 ring-border/60",
        className,
      )}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-auto object-contain"
      />
    </span>
  );
}
