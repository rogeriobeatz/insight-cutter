import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ClipCard } from "@/components/clips/ClipCard";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/timecode";
import { getProject, listClips } from "@/services/inpoint.service";

export const Route = createFileRoute("/projects/$projectId/")({
  head: () => ({
    meta: [
      { title: "Moments found — INPOINT" },
      {
        name: "description",
        content: "The moments with the highest short-form potential from your video.",
      },
      { property: "og:title", content: "Moments found — INPOINT" },
      { property: "og:description", content: "Clips selected by potential, ready to edit." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { projectId } = Route.useParams();
  const { data: project, isPending } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });
  const { data: clips = [] } = useQuery({
    queryKey: ["clips", projectId],
    queryFn: () => listClips(projectId),
  });

  if (isPending) {
    return (
      <AppShell>
        <TopBar eyebrow="Projects" title="Loading" />
        <div className="flex-1" />
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell>
        <TopBar eyebrow="Projects" title="Not found" />
        <div className="mx-auto w-full max-w-3xl px-6 py-20">
          <EmptyState
            title="This project no longer exists"
            action={
              <Button variant="signal" size="sm" asChild>
                <Link to="/projects">Back to projects</Link>
              </Button>
            }
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar
        eyebrow="Projects"
        title={project.title}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects/$projectId/processing" params={{ projectId }}>
              Analysis log
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            {clips.length} moments found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We analyzed{" "}
            <span className="font-mono tabular text-foreground">
              {formatDuration(project.video.durationSec)}
            </span>{" "}
            of content and selected the moments with the highest potential.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onPreview={(item) => toast(`Preview — ${item.title}`)}
              onDownload={(item) => toast.success(`Queued for export — ${item.title}`)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
