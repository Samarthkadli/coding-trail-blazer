import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import aivoraLogo from "@/assets/aivora-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIVORA — Discover. Learn. Create with AI." },
      { name: "description", content: "Discover. Learn. Create with AI. Enter AIVORA and begin your tech adventure." },
      { property: "og:title", content: "AIVORA — Discover. Learn. Create with AI." },
      { property: "og:description", content: "Enter AIVORA and begin your adventure into AI, coding, and creation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Intro,
});

function Intro() {
  return (
    <section className="aivora-intro relative isolate flex min-h-dvh flex-col overflow-hidden bg-intro-background text-intro-foreground">
      <div className="aivora-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto flex w-[min(1280px,90vw)] items-center justify-between border-b border-intro-border/40 py-6 sm:py-8">
        <span className="aivora-label text-xs font-semibold uppercase text-intro-muted">AIVORA / 001</span>
        <span className="aivora-label text-xs font-semibold uppercase text-intro-muted">Discover the future</span>
      </div>

      <div className="mx-auto flex w-[min(900px,90vw)] flex-1 flex-col items-center justify-center pb-8 pt-10 text-center sm:pb-16">
        <Link
          to="/journey"
          aria-label="Enter AIVORA and open Your Tech Adventure Starts Here"
          className="aivora-logo-link group relative inline-flex size-[min(58vw,260px)] shrink-0 items-center justify-center rounded-full border border-intro-border bg-intro-background/80 transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-intro-foreground active:scale-[0.98] sm:size-[300px]"
        >
          <img src={aivoraLogo} alt="AIVORA logo" width={1024} height={1024} className="h-[88%] w-[88%] object-contain transition-transform duration-500 group-hover:rotate-3" />
          <span className="aivora-logo-ring pointer-events-none absolute inset-3 rounded-full border border-intro-border/50" aria-hidden="true" />
        </Link>
        <p className="aivora-label mt-9 text-xs font-semibold uppercase text-intro-muted">A new world of possibility</p>
        <h1 className="aivora-title mt-3 text-5xl font-semibold leading-tight sm:text-7xl">AIV<span className="aivora-o">O</span>RA</h1>
        <p className="mt-4 text-base text-intro-muted sm:text-lg">Discover. Learn. Create with AI.</p>
        <Link to="/journey" className="aivora-enter group mt-9 inline-flex items-center gap-3 border-b border-intro-border pb-2 text-sm font-semibold text-intro-foreground transition-colors hover:text-intro-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-intro-foreground">
          Enter the adventure <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
      <div className="mx-auto flex w-[min(1280px,90vw)] justify-between border-t border-intro-border/40 py-6">
        <span className="aivora-label text-xs text-intro-muted">AI · CODE · CREATE</span>
        <span className="aivora-label text-xs text-intro-muted">EXPLORE MORE ↑</span>
      </div>
    </section>
  );
}