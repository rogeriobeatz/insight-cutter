import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { UsageIndicator } from "@/components/shell/UsageIndicator";
import { Button } from "@/components/ui/button";
import { intlLocale, useI18n } from "@/i18n";
import { mockProjects, mockUsage } from "@/mocks";
import { formatDuration, formatRelativeDate } from "@/lib/timecode";

export const Route = createFileRoute("/usage")({
  head: () => ({
    meta: [
      { title: "Consumo — INPOINT" },
      {
        name: "description",
        content: "Minutos de vídeo processados no mês e histórico recente de análises.",
      },
      { property: "og:title", content: "Consumo — INPOINT" },
      { property: "og:description", content: "Minutos processados neste mês." },
    ],
  }),
  component: UsagePage,
});

function UsagePage() {
  const { t, locale } = useI18n();

  return (
    <AppShell>
      <TopBar
        eyebrow={t("common.account")}
        title={t("usage.title")}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/pricing">{t("common.upgrade")}</Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">{t("usage.title")}</h1>
        <UsageIndicator usage={mockUsage} className="mt-8" />

        <h2 className="label-mono mt-14 text-muted-foreground">{t("usage.recent")}</h2>
        <ul className="mt-4 divide-y divide-border border border-border bg-card">
          {mockProjects.map((project) => (
            <li key={project.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <span className="min-w-0">
                <span className="block truncate text-sm text-foreground">{project.title}</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {formatRelativeDate(project.createdAt, { t, intl: intlLocale(locale) })}
                </span>
              </span>
              <span className="font-mono text-xs tabular text-muted-foreground">
                {formatDuration(project.video.durationSec)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
