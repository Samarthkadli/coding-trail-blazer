import { createFileRoute, Link } from "@tanstack/react-router";
import aivoraReference from "@/assets/aivora-reference.png.asset.json";

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
        className="aivora-artwork group block aspect-square w-[min(100%,85dvh,850px)] overflow-hidden outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-offset-6 focus-visible:outline-intro-foreground/90"
      >
        <img
          src={aivoraReference.url}
          alt="AIVORA orbital A logo, name and Discover. Learn. Create with AI tagline"
          width={1254}
          height={1254}
          className="block h-full w-full object-cover"
        />
        <span id="aivora-intro-hint" className="sr-only">
          Activating this artwork opens the CodeQuest adventure homepage.
        </span>
      </Link>
    </section>
  );
}