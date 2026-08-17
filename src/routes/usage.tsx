import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { UsageIndicator } from "@/components/shell/UsageIndicator";
import { mockProjects, mockUsage } from "@/mocks";
import { formatDuration, formatRelativeDate } from "@/lib/timecode";

export const Route = createFileRoute("/usage")({
  head: () => ({
    meta: [
      { title: "Usage — INPOINT" },
      { name: "description", content: "Minutes processed this month and recent activity." },
      { property: "og:title", content: "Usage — INPOINT" },
      { property: "og:description", content: "Minutes processed this month." },
    ],
  }),
  component: UsagePage,
});

function UsagePage() {
  return (
    <AppShell>
      <TopBar eyebrow="Account" title="Usage" />

      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Usage</h1>
        <UsageIndicator usage={mockUsage} className="mt-8" />

        <h2 className="label-mono mt-14 text-muted-foreground">Recent activity</h2>
        <ul className="mt-4 divide-y divide-border border border-border bg-card">
          {mockProjects.map((project) => (
            <li key={project.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <span className="min-w-0">
                <span className="block truncate text-sm text-foreground">{project.title}</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  {formatRelativeDate(project.createdAt)}
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
