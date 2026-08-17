import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — INPOINT" },
      { name: "description", content: "Caption and layout presets applied to every new clip." },
      { property: "og:title", content: "Templates — INPOINT" },
      { property: "og:description", content: "Caption and layout presets for your clips." },
    ],
  }),
  component: TemplatesPage,
});

const templates = [
  { name: "Minimal", detail: "Single line, warm white, bottom safe area", ratio: "9:16" },
  { name: "Bold", detail: "Two-line uppercase, heavy weight", ratio: "9:16" },
  { name: "Karaoke", detail: "Word highlight in signal orange", ratio: "9:16" },
  { name: "Square feed", detail: "Center framing, caption block top", ratio: "1:1" },
];

function TemplatesPage() {
  return (
    <AppShell>
      <TopBar eyebrow="Library" title="Templates" />

      <div className="mx-auto w-full max-w-4xl px-6 py-14 md:px-10">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Templates</h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Presets for captions and framing. Applied automatically when clips are created.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {templates.map((template, index) => (
            <li
              key={template.name}
              className="flex items-center gap-4 border border-border bg-card p-4"
            >
              <span
                className={cn(
                  "flex h-16 w-11 shrink-0 items-center justify-center rounded-sm border",
                  index === 1 ? "border-signal/40 bg-signal-muted" : "border-border bg-surface",
                )}
              >
                <span className="h-1.5 w-6 bg-foreground/60" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-foreground">{template.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{template.detail}</span>
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
