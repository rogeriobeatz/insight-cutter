import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  progress?: number;
  className?: string;
}

const LABEL_KEYS: Record<ProjectStatus, TranslationKey> = {
  queued: "projects.status.queued",
  processing: "projects.status.processing",
  completed: "projects.status.completed",
  failed: "projects.status.failed",
};

export function StatusBadge({ status, progress = 0, className }: StatusBadgeProps) {
  const t = useT();
  const isProcessing = status === "processing";
  const label = t(LABEL_KEYS[status]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em]",
        isProcessing ? "text-signal" : "text-muted-foreground",
        status === "failed" && "text-destructive",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isProcessing && "animate-pulse bg-signal",
          status === "completed" && "bg-success",
          status === "queued" && "bg-muted-foreground",
          status === "failed" && "bg-destructive",
        )}
      />
      {isProcessing ? `${label} — ${Math.round(progress)}%` : label}
    </span>
  );
}
