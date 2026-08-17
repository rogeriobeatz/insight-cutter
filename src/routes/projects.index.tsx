import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { listProjects } from "@/services/inpoint.service";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — INPOINT" },
      { name: "description", content: "Every long-form video you've analyzed with INPOINT." },
      { property: "og:title", content: "Projects — INPOINT" },
      { property: "og:description", content: "Every long-form video you've analyzed." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: listProjects });

  return (
    <AppShell>
      <TopBar
        eyebrow="Workspace"
        title="Projects"
        actions={
          <Button variant="signal" size="sm" asChild>
            <Link to="/projects/new">
              <Plus className="h-4 w-4" />
              New project
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Projects</h1>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {projects.length} total
        </p>

        <div className="mt-8 space-y-2">
          {projects.length === 0 ? (
            <EmptyState title="No projects yet" description="Start by uploading a video." />
          ) : (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      </div>
    </AppShell>
  );
}
