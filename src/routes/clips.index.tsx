import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ClipCard } from "@/components/clips/ClipCard";
import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { listClips } from "@/services/inpoint.service";

export const Route = createFileRoute("/clips/")({
  head: () => ({
    meta: [
      { title: "Clips — INPOINT" },
      { name: "description", content: "Every clip INPOINT has cut from your projects." },
      { property: "og:title", content: "Clips — INPOINT" },
      { property: "og:description", content: "Every clip cut from your projects." },
    ],
  }),
  component: ClipsPage,
});

function ClipsPage() {
  const { data: clips = [] } = useQuery({ queryKey: ["clips"], queryFn: () => listClips() });

  return (
    <AppShell>
      <TopBar eyebrow="Library" title="Clips" />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Clips</h1>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {clips.length} clips — sorted by score
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...clips]
            .sort((a, b) => b.score.overall - a.score.overall)
            .map((clip) => (
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
