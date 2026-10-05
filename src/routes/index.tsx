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
        aria-label="Open Your Tech Adventure Starts Here"
        className="aivora-artwork block aspect-square w-[min(100%,85dvh,850px)] overflow-hidden rounded-full outline-none transition-transform duration-300 hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-intro-foreground active:scale-[0.99]"
      >
        <img src={aivoraReference.url} alt="AIVORA orbital A logo, name and Discover. Learn. Create with AI tagline" width={1254} height={1254} className="block h-full w-full object-cover" />
      </Link>
    </section>
  );
}