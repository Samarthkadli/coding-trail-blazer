import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/data/content";
import { getGuide, slugify } from "@/data/project-code";
import { Chip, CTAButton, XpTag } from "@/components/site";
import { CodeLab } from "@/components/CodeLab";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => slugify(p.name) === params.slug);
    const guide = getGuide(params.slug);
    if (!project || !guide) throw notFound();
    return { project, guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — CodeQuest" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — Code & Build Guide — CodeQuest`;
    return {
      meta: [
        { title },
        { name: "description", content: `${project.description} Full starter code, step-by-step build guide and a live playground for the ${project.name} project.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `${project.description} Copy the code, run it and ship it.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="mx-auto w-[min(1180px,92vw)] py-24 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 font-display text-3xl">That project isn't on the map yet</h1>
      <div className="mt-6 flex justify-center">
        <CTAButton to="/projects">← Back to all projects</CTAButton>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { project, guide } = Route.useLoaderData();
  const { complete, isDone, hydrated } = useProgress();
  const doneId = `project-${project.name}`;
  const finished = hydrated && isDone(doneId);

  return (
    <div className="mx-auto w-[min(1180px,92vw)] py-10">
      <Link to="/projects" className="text-sm font-bold text-muted-foreground hover:text-foreground">
        ← All projects
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">
            {project.emoji} {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{guide.intro}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="primary">{project.category}</Chip>
            <Chip tone="orange">⏱ {project.time}</Chip>
            {project.tech.map((t) => <Chip key={t} tone="cyan">{t}</Chip>)}
          </div>
        </div>
        <XpTag xp={project.xp} />
      </header>

      {/* ==== Online compiler ==== */}
      <CodeLab
        className="mt-8"
        files={guide.files}
        runnable={guide.runnable}
        output={guide.output}
        path={guide.slug}
        previewTitle={`${project.name} live preview`}
      />

      {/* ==== Build guide ==== */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl">How to build it 🛠️</h2>
          <ol className="mt-4 space-y-3">
            {guide.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-black text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">You'll learn</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.skills.map((s) => <Chip key={s} tone="success">{s}</Chip>)}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Level it up 🚀</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {guide.stretch.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton
          onClick={() => complete(doneId, project.xp, "project-builder")}
          variant={finished ? "ghost" : "primary"}
        >
          {finished ? "Completed ✓" : `Mark complete · +${project.xp} XP`}
        </CTAButton>
        <CTAButton to="/projects" variant="ghost">Pick another project</CTAButton>
      </div>
    </div>
  );
}
