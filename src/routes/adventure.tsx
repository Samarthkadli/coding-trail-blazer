import { createFileRoute } from "@tanstack/react-router";
import { AdventureMap } from "@/components/AdventureMap";
import { Section } from "@/components/site";
import { StarterPicker } from "@/components/StarterPicker";

export const Route = createFileRoute("/adventure")({
  head: () => ({
    meta: [
      { title: "Tech Adventure Map — CodeQuest" },
      { name: "description", content: "Travel six technology worlds: Tech Explorer, Coding Valley, AI Galaxy, Developer City, Project Planet and Career Launch. Unlock levels and earn XP." },
      { property: "og:title", content: "Tech Adventure Map — CodeQuest" },
      { property: "og:description", content: "Six worlds, locked levels, checkpoints and XP rewards — a beginner path through AI and coding." },
    ],
  }),
  component: AdventurePage,
});

function AdventurePage() {
  return (
    <>
      <Section
        eyebrow="The Journey"
        title={<>Tech Adventure Map 🗺️</>}
        subtitle="Each world unlocks the next. Complete a world to clear its checkpoint, bank the XP and open the next destination."
      >
        <AdventureMap />
      </Section>
      <Section eyebrow="Lost?" title="Pick a direction and we'll draw the path 🧭">
        <StarterPicker />
      </Section>
    </>
  );
}
