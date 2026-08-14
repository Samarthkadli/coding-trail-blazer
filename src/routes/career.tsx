import { createFileRoute } from "@tanstack/react-router";
import { careerTracks } from "@/data/content";
import { Card, CTAButton, Reveal, Section } from "@/components/site";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career Zone — Turn Skills Into Opportunities — CodeQuest" },
      { name: "description", content: "Resume building, GitHub portfolio, LinkedIn, internships, interviews, freelancing and open source — the final destination of your tech adventure." },
      { property: "og:title", content: "Career Zone — CodeQuest" },
      { property: "og:description", content: "Turn projects into internships, freelance work and your first tech role." },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  return (
    <>
      <Section
        eyebrow="Final destination"
        title="Turn Skills Into Opportunities 🚀"
        subtitle="You've explored, you've built. Now make it visible to the people who hire."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careerTracks.map((c, i) => (
            <Reveal key={c.title} delay={i * 40}>
              <Card className="h-full">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-aqua text-2xl shadow-glow">{c.emoji}</div>
                <p className="mt-3 font-display text-xl">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="mx-auto w-[min(1180px,92vw)] pb-20">
        <Reveal>
          <div className="rounded-[2.5rem] bg-gradient-hero p-8 text-primary-foreground sm:p-12">
            <h2 className="max-w-2xl text-3xl sm:text-4xl">Your 30-day launch plan 🗓️</h2>
            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Week 1 — Polish two projects and write real READMEs",
                "Week 2 — Rebuild your resume around what you built",
                "Week 3 — Rewrite LinkedIn, connect with 20 people in your field",
                "Week 4 — Apply to 15 internships and practise 10 interview answers",
              ].map((s) => (
                <li key={s} className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">{s}</li>
              ))}
            </ol>
            <div className="mt-7"><CTAButton to="/projects" variant="ghost" className="bg-card/90">Pick a project to polish →</CTAButton></div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
