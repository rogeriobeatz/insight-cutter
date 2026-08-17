import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { mockUser } from "@/mocks";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — INPOINT" },
      { name: "description", content: "Workspace, account and export defaults for INPOINT." },
      { property: "og:title", content: "Settings — INPOINT" },
      { property: "og:description", content: "Workspace and export defaults." },
    ],
  }),
  component: SettingsPage,
});

const rows: Array<{ label: string; value: string }> = [
  { label: "Name", value: mockUser.name },
  { label: "Email", value: mockUser.email },
  { label: "Plan", value: mockUser.plan.toUpperCase() },
  { label: "Default format", value: "9:16" },
  { label: "Default captions", value: "Bold" },
  { label: "Export quality", value: "1080 × 1920 — 30 fps" },
];

function SettingsPage() {
  return (
    <AppShell>
      <TopBar eyebrow="Account" title="Settings" />

      <div className="mx-auto w-full max-w-2xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Settings</h1>

        <dl className="mt-10 divide-y divide-border border border-border bg-card">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-4">
              <dt className="label-mono text-muted-foreground">{row.label}</dt>
              <dd className="font-mono text-sm text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </AppShell>
  );
}
