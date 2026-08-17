import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Plus } from "lucide-react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { TopBar } from "@/components/shell/TopBar";
import { UsageIndicator } from "@/components/shell/UsageIndicator";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";
import { greetingKeyForHour } from "@/lib/timecode";
import { mockUsage } from "@/mocks";
import { listProjects } from "@/services/inpoint.service";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INPOINT — Encontre o momento. Faça o corte." },
      {
        name: "description",
        content:
          "Transforme podcasts, entrevistas e vídeos longos em cortes prontos para Reels, TikTok e Shorts.",
      },
      { property: "og:title", content: "INPOINT" },
      {
        property: "og:description",
        content: "Transforme seu conteúdo longo em momentos que merecem ser assistidos.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const t = useT();
  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: listProjects });

  // Resolved after hydration so the server and client render the same greeting.
  const [greetingKey, setGreetingKey] = useState(greetingKeyForHour(9));
  useEffect(() => {
    setGreetingKey(greetingKeyForHour(new Date().getHours()));
  }, []);

  return (
    <AppShell>
      <TopBar
        eyebrow={t("common.workspace")}
        title={t("common.overview")}
        actions={
          <Button variant="signal" size="sm" asChild>
            <Link to="/projects/new">
              <Plus className="h-4 w-4" />
              {t("common.newProject")}
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10">
        <header>
          <h1 className="text-4xl font-medium tracking-tight text-foreground">
            {t(greetingKey)}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("dashboard.subtitle")}
          </p>
          <div className="mt-8">
            <Button variant="signal" asChild>
              <Link to="/projects/new">
                <Plus className="h-4 w-4" />
                {t("common.newProject")}
              </Link>
            </Button>
          </div>
        </header>

        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="label-mono text-muted-foreground">{t("dashboard.recent")}</h2>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("dashboard.allProjects")}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-5 space-y-2">
            {projects.length === 0 ? (
              <EmptyState
                title={t("dashboard.empty.title")}
                description={t("dashboard.empty.description")}
                action={
                  <Button variant="signal" size="sm" asChild>
                    <Link to="/projects/new">{t("common.newProject")}</Link>
                  </Button>
                }
              />
            ) : (
              projects.slice(0, 4).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="label-mono text-muted-foreground">{t("dashboard.usage")}</h2>
          <UsageIndicator usage={mockUsage} className="mt-5" />
        </section>
      </div>
    </AppShell>
  );
}
