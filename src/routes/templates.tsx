import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — INPOINT" },
      {
        name: "description",
        content: "Presets de legenda e enquadramento aplicados a cada novo corte.",
      },
      { property: "og:title", content: "Templates — INPOINT" },
      { property: "og:description", content: "Presets de legenda e layout para seus cortes." },
    ],
  }),
  component: TemplatesPage,
});

const templates: Array<{
  nameKey: TranslationKey;
  detailKey: TranslationKey;
  ratio: string;
  featured?: boolean;
}> = [
  { nameKey: "templates.minimal", detailKey: "templates.minimal.detail", ratio: "9:16" },
  {
    nameKey: "templates.bold",
    detailKey: "templates.bold.detail",
    ratio: "9:16",
    featured: true,
  },
  { nameKey: "templates.karaoke", detailKey: "templates.karaoke.detail", ratio: "9:16" },
  { nameKey: "templates.split", detailKey: "templates.split.detail", ratio: "9:16" },
  { nameKey: "templates.square", detailKey: "templates.square.detail", ratio: "1:1" },
];

function TemplatesPage() {
  const t = useT();

  return (
    <AppShell>
      <TopBar eyebrow={t("common.library")} title={t("templates.title")} />

      <div className="mx-auto w-full max-w-4xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          {t("templates.title")}
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t("templates.subtitle")}
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {templates.map((template) => (
            <li
              key={template.nameKey}
              className="flex items-center gap-4 border border-border bg-card p-4"
            >
              <span
                className={cn(
                  "flex h-16 w-11 shrink-0 items-center justify-center rounded-sm border",
                  template.featured
                    ? "border-signal/40 bg-signal-muted"
                    : "border-border bg-surface",
                )}
              >
                <span className="h-1.5 w-6 bg-foreground/60" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-foreground">{t(template.nameKey)}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {t(template.detailKey)}
                </span>
                <span className="mt-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                  {template.ratio}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
