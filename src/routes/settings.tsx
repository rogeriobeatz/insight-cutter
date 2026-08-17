import { createFileRoute } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/components/shell/LanguageSwitcher";
import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { useT, type TranslationKey } from "@/i18n";
import { mockUser } from "@/mocks";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — INPOINT" },
      {
        name: "description",
        content: "Workspace, conta e padrões de export do seu INPOINT.",
      },
      { property: "og:title", content: "Configurações — INPOINT" },
      { property: "og:description", content: "Workspace e padrões de export." },
    ],
  }),
  component: SettingsPage,
});

const rows: Array<{ labelKey: TranslationKey; value: string }> = [
  { labelKey: "settings.name", value: mockUser.name },
  { labelKey: "settings.email", value: mockUser.email },
  { labelKey: "settings.plan", value: mockUser.plan.toUpperCase() },
  { labelKey: "settings.defaultFormat", value: "9:16" },
  { labelKey: "settings.defaultCaptions", value: "Bold Impact" },
  { labelKey: "settings.exportQuality", value: "1080 × 1920 — 30 fps" },
];

function SettingsPage() {
  const t = useT();

  return (
    <AppShell>
      <TopBar eyebrow={t("common.account")} title={t("settings.title")} />

      <div className="mx-auto w-full max-w-2xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          {t("settings.title")}
        </h1>

        <dl className="mt-10 divide-y divide-border border border-border bg-card">
          {rows.map((row) => (
            <div key={row.labelKey} className="flex items-center justify-between gap-4 px-4 py-4">
              <dt className="label-mono text-muted-foreground">{t(row.labelKey)}</dt>
              <dd className="font-mono text-sm text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-10 border border-border bg-card px-4 py-5">
          <p className="label-mono text-muted-foreground">{t("settings.language")}</p>
          <div className="mt-4 max-w-[200px]">
            <LanguageSwitcher />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
