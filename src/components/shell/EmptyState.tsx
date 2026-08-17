import type { ReactNode } from "react";

import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  const t = useT();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-border px-8 py-20 text-center",
        className,
      )}
    >
      <span className="label-mono text-muted-foreground">{t("common.nothingHere")}</span>
      <h3 className="mt-4 text-lg font-medium text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
