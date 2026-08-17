import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { ProcessingStepRow } from "@/components/projects/ProcessingStepRow";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { useProcessingSimulation } from "@/hooks/useProcessingSimulation";
import { formatDuration, formatTimecode } from "@/lib/timecode";
import { completeProject, getProject } from "@/services/inpoint.service";

export const Route = createFileRoute("/projects/$projectId/processing")({
  head: () => ({
    meta: [
      { title: "Analyzing — INPOINT" },
      { name: "description", content: "INPOINT is analyzing your video and finding key moments." },
      { property: "og:title", content: "Analyzing — INPOINT" },
      { property: "og:description", content: "Finding the strongest moments in your video." },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const { data: project, isPending } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  });

  const [done, setDone] = useState(false);
  const { job, headline, detail } = useProcessingSimulation({
    projectId,
    startAt: project?.progress ?? 0,
    onComplete: () => setDone(true),
  });

  useEffect(() => {
    if (done) void completeProject(projectId, 8);
  }, [done, projectId]);

  if (isPending) {
    return (
      <AppShell>
        <TopBar eyebrow="Projects" title="Analyzing" />
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
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-signal tabular">
            {job.progress}%
          </span>
        }
      />

      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="relative aspect-video w-full max-w-[280px] shrink-0 overflow-hidden rounded-sm border border-border bg-surface">
            <img
              src={project.video.thumbnailUrl}
              alt=""
              width={1280}
              height={720}
              className="h-full w-full object-cover opacity-80"
            />
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-border">
              <span
                className="block h-full bg-signal transition-[width] duration-200"
                style={{ width: `${job.progress}%` }}
              />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-medium tracking-tight text-foreground">{project.title}</h1>
            <p className="mt-2 truncate font-mono text-xs text-muted-foreground">
              {project.video.fileName}
            </p>
            <p className="mt-1 font-mono text-xs tabular text-muted-foreground">
              {formatDuration(project.video.durationSec)}
              <span className="ml-3 text-border-strong">
                {formatTimecode(project.video.durationSec, project.video.fps)}
              </span>
            </p>

            <div className="mt-8">
              <p className="font-mono text-4xl tabular text-foreground">{job.progress}%</p>
              <p className="mt-3 text-sm text-foreground">{headline}</p>
              <p key={detail} className="mt-1.5 animate-in fade-in text-xs text-muted-foreground duration-700">
                {detail}
              </p>
            </div>
          </div>
        </div>

        <ol className="mt-16 border-t border-border pt-10">
          {job.steps.map((step, index) => (
            <ProcessingStepRow
              key={step.id}
              step={step}
              isLast={index === job.steps.length - 1}
            />
          ))}
        </ol>

        <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
          <Button
            variant="signal"
            disabled={!done}
            onClick={() =>
              navigate({ to: "/projects/$projectId", params: { projectId: project.id } })
            }
          >
            View results
            <ArrowRight className="h-4 w-4" />
          </Button>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
            {done ? "8 moments found" : "You can leave this page — we'll keep working"}
          </span>
        </div>
      </div>
    </AppShell>
  );
}
