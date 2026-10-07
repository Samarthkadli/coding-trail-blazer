import { createFileRoute, Link } from "@tanstack/react-router";
import aivoraArtwork from "@/assets/aivora-reference.png.asset.json";

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
        className="aivora-artwork group block w-[min(100%,85dvh,640px)] outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-6 focus-visible:outline-intro-foreground/90"
      >
        <img
          src={aivoraArtwork.url}
          alt="AIVORA — Discover. Learn. Create with AI."
          width={1024}
          height={1024}
          className="aivora-logo-img block w-full drop-shadow-[0_0_55px_rgba(80,140,255,0.5)] transition-[filter,transform] duration-300 group-hover:drop-shadow-[0_0_85px_rgba(130,100,255,0.7)]"
        />
        <span id="aivora-intro-hint" className="sr-only">
          Activating this artwork opens the CodeQuest adventure homepage.
        </span>
      </Link>
    </section>
  );
}
