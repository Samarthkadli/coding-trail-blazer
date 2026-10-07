import { createFileRoute, Link } from "@tanstack/react-router";
import aivoraLogo from "@/assets/aivora-logo.png.asset.json";

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
        className="aivora-artwork group flex w-[min(100%,85dvh,700px)] flex-col items-center gap-4 outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-6 focus-visible:outline-intro-foreground/90"
      >
        <img
          src={aivoraLogo.url}
          alt="AIVORA orbital A logo"
          width={1024}
          height={1024}
          className="aivora-logo-img block w-[min(78%,420px)] drop-shadow-[0_0_45px_rgba(80,140,255,0.45)] transition-[filter,transform] duration-300 group-hover:drop-shadow-[0_0_70px_rgba(120,90,255,0.65)]"
        />
        <span className="text-center">
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-5xl font-extrabold tracking-[0.35em] text-transparent drop-shadow-[0_0_25px_rgba(90,150,255,0.5)] sm:text-6xl">
            AIVORA
          </span>
          <span className="mt-3 block text-sm font-medium tracking-[0.25em] text-intro-foreground/80 uppercase sm:text-base">
            Discover. Learn. Create with AI.
          </span>
        </span>
        <span id="aivora-intro-hint" className="sr-only">
          Activating this artwork opens the CodeQuest adventure homepage.
        </span>
      </Link>
    </section>
  );
}
