import { Link } from "@tanstack/react-router";

import { StatusBadge } from "@/components/projects/StatusBadge";
import { formatDuration, formatRelativeDate } from "@/lib/timecode";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isProcessing = project.status === "processing";
  const to = isProcessing ? "/projects/$projectId/processing" : "/projects/$projectId";

  return (
    <Link
      to={to}
      params={{ projectId: project.id }}
      className="group flex items-center gap-5 border border-border bg-card px-4 py-4 transition-colors hover:border-border-strong hover:bg-elevated/60"
    >
      <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-sm bg-surface">
        <img
          src={project.video.thumbnailUrl}
          alt=""
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded-[2px] bg-background/85 px-1.5 py-0.5 font-mono text-[0.65rem] tabular text-foreground">
          {formatDuration(project.video.durationSec)}
        </span>
        {isProcessing ? (
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-border">
            <span
              className="block h-full bg-signal transition-[width] duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-foreground">{project.title}</h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] tabular text-muted-foreground">
          <span>{formatDuration(project.video.durationSec)}</span>
          <span className="text-border-strong">/</span>
          <span>{isProcessing ? "Analyzing" : `${project.clipCount} clips`}</span>
          <span className="text-border-strong">/</span>
          <span>{formatRelativeDate(project.createdAt)}</span>
        </p>
      </div>

      <StatusBadge status={project.status} progress={project.progress} className="shrink-0" />
    </Link>
  );
}
