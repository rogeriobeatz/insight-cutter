import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ClipCard } from "@/components/clips/ClipCard";
import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { useT } from "@/i18n";
import { listClips } from "@/services/inpoint.service";

export const Route = createFileRoute("/clips/")({
  head: () => ({
    meta: [
      { title: "Cortes — INPOINT" },
      {
        name: "description",
        content: "Todos os cortes que o INPOINT extraiu dos seus vídeos longos.",
      },
      { property: "og:title", content: "Cortes — INPOINT" },
      { property: "og:description", content: "Todos os cortes extraídos dos seus projetos." },
    ],
  }),
  component: ClipsPage,
});

function ClipsPage() {
  const t = useT();
  const { data: clips = [] } = useQuery({ queryKey: ["clips"], queryFn: () => listClips() });

  return (
    <AppShell>
      <TopBar eyebrow={t("common.library")} title={t("clips.title")} />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">{t("clips.title")}</h1>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {t("clips.subtitle", { count: clips.length })}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...clips]
            .sort((a, b) => b.score.overall - a.score.overall)
            .map((clip) => (
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
