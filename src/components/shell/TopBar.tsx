import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TopBarProps {
  /** Small mono eyebrow, e.g. a breadcrumb or timecode. */
  eyebrow?: string;
  title?: string;
  actions?: ReactNode;
  className?: string;
}

export function TopBar({ eyebrow, title, actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-6 md:px-10",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="label-mono text-muted-foreground">{eyebrow}</p> : null}
        {title ? (
          <h2 className="truncate text-sm font-medium text-foreground">{title}</h2>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </header>
  );
}
