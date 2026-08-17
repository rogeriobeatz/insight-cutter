import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ClipCard } from "@/components/clips/ClipCard";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";
import { formatDuration } from "@/lib/timecode";
import { getProject, listClips } from "@/services/inpoint.service";

export const Route = createFileRoute("/projects/$projectId/")({
  head: () => ({
    meta: [
      { title: "Momentos encontrados — INPOINT" },
      {
        name: "description",
        content: "Os momentos com maior potencial para Reels, TikTok e Shorts no seu vídeo.",
      },
      { property: "og:title", content: "Momentos encontrados — INPOINT" },
      {
        property: "og:description",
        content: "Cortes selecionados por potencial, prontos para editar.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const t = useT();
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
        <TopBar eyebrow={t("results.eyebrow")} title={t("common.loading")} />
        <div className="flex-1" />
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell>
        <TopBar eyebrow={t("results.eyebrow")} title={t("common.notFound")} />
        <div className="mx-auto w-full max-w-3xl px-6 py-20">
          <EmptyState
            title={t("projects.gone.title")}
            action={
              <Button variant="signal" size="sm" asChild>
                <Link to="/projects">{t("projects.gone.action")}</Link>
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
        eyebrow={t("results.eyebrow")}
        title={project.title}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects/$projectId/processing" params={{ projectId }}>
              {t("projects.analysisLog")}
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            {t("results.momentsFound", { count: clips.length })}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("results.analyzedPrefix")}{" "}
            <span className="font-mono tabular text-foreground">
              {formatDuration(project.video.durationSec)}
            </span>{" "}
            {t("results.analyzedSuffix")}
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clips.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onPreview={(item) => toast(t("clips.previewOf", { title: item.title }))}
              onDownload={(item) => toast.success(t("clips.queued", { title: item.title }))}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
