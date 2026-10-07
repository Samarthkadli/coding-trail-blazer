import { createFileRoute, Link } from "@tanstack/react-router";
import aivoraMark from "@/assets/aivora-mark-round.png";
import aivoraWordmark from "@/assets/aivora-wordmark.png";

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
    <section className="aivora-intro flex min-h-dvh items-center justify-center overflow-hidden bg-intro-background px-3 py-6 sm:px-8">
      <h1 className="sr-only">AIVORA — Discover. Learn. Create with AI.</h1>
      <Link
        to="/journey"
        aria-label="AIVORA — open Your Tech Adventure Starts Here"
        aria-describedby="aivora-intro-hint"
        className="aivora-artwork group flex w-[min(100%,85dvh,640px)] flex-col items-center gap-6 outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-6 focus-visible:outline-intro-foreground/90"
      >
        <img
          src={aivoraMark}
          alt="AIVORA orbital A emblem"
          width={1024}
          height={1024}
          className="aivora-logo-img block aspect-square w-[min(72%,380px)] rounded-full drop-shadow-[0_0_55px_rgba(80,140,255,0.55)] transition-[filter,transform] duration-300 group-hover:drop-shadow-[0_0_85px_rgba(130,100,255,0.7)]"
        />
        <img
          src={aivoraWordmark}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="block w-[min(96%,560px)] drop-shadow-[0_0_28px_rgba(110,160,255,0.45)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_45px_rgba(150,120,255,0.6)]"
        />
        <span className="mt-1 block text-sm font-medium tracking-[0.25em] text-intro-foreground/80 uppercase sm:text-base">
          Discover. Learn. Create with AI.
        </span>
        <span id="aivora-intro-hint" className="sr-only">
          Activating this artwork opens the CodeQuest adventure homepage.
        </span>
      </Link>
    </section>
  );
}
