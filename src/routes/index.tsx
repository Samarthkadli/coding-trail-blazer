import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Flame, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-adventure.jpg";
import { Section, Card, Chip, CTAButton, Reveal, XpTag } from "@/components/site";
import { AdventureMap } from "@/components/AdventureMap";
import { StarterPicker } from "@/components/StarterPicker";
import { QuizCard } from "@/components/QuizCard";
import { aiTools, badges, platforms, projects, quests, showcase } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeQuest — Your Adventure Into AI, Coding & the Future" },
      {
        name: "description",
        content:
          "CodeQuest turns AI, coding, GitHub and tech careers into a friendly adventure for total beginners. Explore worlds, earn XP, unlock badges and build real projects.",
      },
      { property: "og:title", content: "CodeQuest — Your Adventure Into AI, Coding & the Future" },
      {
        property: "og:description",
        content: "From 'I don't know where to start' to 'I can build things'. A gamified beginner path through AI, coding, tools and careers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-[min(1180px,92vw)] items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
          <div className="animate-rise">
            <Chip tone="orange">🎮 Learning, but make it an adventure</Chip>
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-6xl">
              Your Tech Adventure <span className="gradient-text">Starts Here</span> 🚀
            </h1>
            <p className="text-halo mt-5 max-w-xl text-lg font-semibold text-muted-foreground">
              AI, coding, GitHub, tools, projects... Technology can feel overwhelming. We'll help you discover it one
              step at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton to="/adventure">
                Start My Adventure <ArrowRight className="size-4" />
              </CTAButton>
              <CTAButton to="/ai-tools" variant="ghost">
                <Compass className="size-4" /> Explore Tech World
              </CTAButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-sm font-bold">
              <span className="glass rounded-full px-3 py-1.5">6 worlds to explore</span>
              <span className="glass rounded-full px-3 py-1.5">11 AI tools explained</span>
              <span className="glass rounded-full px-3 py-1.5">13 buildable projects</span>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float glass overflow-hidden rounded-[2.5rem] p-2">
              <img
                src={heroImage}
                alt="A student explorer stepping through a glowing portal into a digital world of AI, Python, GitHub and cloud islands"
                width={1280}
                height={1024}
                className="w-full rounded-[2rem]"
              />
            </div>
            <div className="glass animate-float absolute -bottom-5 -left-3 rounded-2xl px-4 py-3 [animation-delay:1.4s] sm:left-6">
              <p className="text-xs font-black text-muted-foreground">LEVEL UP</p>
              <p className="font-display text-lg">Level 3 — AI Adventurer 🤖</p>
            </div>
            <div className="glass animate-float absolute -top-4 right-2 rounded-2xl px-4 py-3 [animation-delay:0.7s]">
              <XpTag xp={100} />
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="The Journey"
        title={<>The Tech Adventure Map 🗺️</>}
        subtitle="Six worlds. Each one unlocks the next. No syllabus, no lectures — just checkpoints you can actually finish."
      >
        <AdventureMap compact />
        <div className="mt-8">
          <CTAButton to="/adventure">
            Open the full map <ArrowRight className="size-4" />
          </CTAButton>
        </div>
      </Section>

      <Section
        eyebrow="Start here"
        title="I don't know where to start 🤷"
        subtitle="The most honest sentence in tech. Pick an interest and get a path in one click."
      >
        <StarterPicker />
      </Section>

      <Section
        eyebrow="AI Toolbox"
        title="Your AI Toolbox 🧰"
        subtitle="Popular AI tools explained in plain language — what they are, what they're good at, and one tip to start."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiTools.slice(0, 6).map((t, i) => (
            <Reveal key={t.name} delay={i * 50}>
              <Card className="h-full">
                <p className="font-display text-xl">
                  {t.name} <span>{t.emoji}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{t.what}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.bestFor.slice(0, 3).map((b) => (
                    <Chip key={b} tone="cyan">{b}</Chip>
                  ))}
                </div>
                <p className="mt-3 rounded-2xl bg-secondary/70 p-3 text-sm">
                  <span className="font-black">Beginner tip: </span>
                  {t.tip}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <CTAButton to="/ai-tools">See all 11 tools →</CTAButton>
        </div>
      </Section>

      <Section
        eyebrow="Playground"
        title="Discover Your Coding Playground 🎮"
        subtitle="The platforms real developers live on — and the very first thing to try on each."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.slice(0, 6).map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <Card className="h-full">
                <p className="font-display text-xl">
                  {p.name} <span>{p.emoji}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{p.what}</p>
                <p className="mt-3 text-sm"><span className="font-black">First thing to try: </span>{p.firstTry}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <CTAButton to="/coding" variant="ghost">Explore all platforms →</CTAButton>
        </div>
      </Section>

      <Section eyebrow="Gamification" title="Learning that actually rewards you 🏆" subtitle="XP for every step, badges you can collect, missions every day.">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <Trophy className="size-8 text-orange" />
              <p className="mt-3 font-display text-xl">Badges to collect</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span key={b.id} className="rounded-2xl bg-secondary px-3 py-2 text-sm font-bold">
                    {b.emoji} {b.name}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="h-full">
              <Flame className="size-8 text-orange" />
              <p className="mt-3 font-display text-xl">Today's Mission 🎯</p>
              <p className="mt-1 text-sm font-black text-muted-foreground">{quests[0]!.no}</p>
              <p className="mt-2 text-lg font-bold">{quests[0]!.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{quests[0]!.detail}</p>
              <div className="mt-4 flex items-center gap-3">
                <XpTag xp={quests[0]!.xp} />
                <Link to="/quests" className="text-sm font-black text-primary">Start Mission →</Link>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={160}>
            <QuizCard />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Build" title="Build Something Cool 🚀" subtitle="Pick a project, learn only what it needs, ship it, show it.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl">{p.emoji} {p.name}</p>
                  <XpTag xp={p.xp} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip tone="primary">{p.category}</Chip>
                  <Chip>{p.time}</Chip>
                  {p.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8"><CTAButton to="/projects">Browse all projects →</CTAButton></div>
      </Section>

      <Section eyebrow="Community" title="Look What Others Are Building 🌎" subtitle="Real projects from explorers who started exactly where you are.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.slice(0, 3).map((s, i) => (
            <Reveal key={s.project} delay={i * 60}>
              <Card className="h-full">
                <p className="font-display text-xl">{s.emoji} {s.project}</p>
                <p className="text-sm font-bold text-primary">{s.creator}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{s.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}</div>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8"><CTAButton to="/community" variant="ghost">Showcase My Project →</CTAButton></div>
      </Section>

      <section className="mx-auto w-[min(1180px,92vw)] pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-8 text-primary-foreground sm:p-14">
            <div className="pointer-events-none absolute -top-10 -right-10 size-64 rounded-full bg-white/20 blur-3xl" />
            <h2 className="max-w-2xl text-3xl sm:text-5xl">You don't need to know everything about technology.</h2>
            <p className="mt-4 max-w-xl text-lg opacity-90">You just need to start your adventure. 🚀</p>
            <div className="mt-8">
              <CTAButton to="/adventure" variant="ghost" className="bg-card/90">
                Start My Adventure <ArrowRight className="size-4" />
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
