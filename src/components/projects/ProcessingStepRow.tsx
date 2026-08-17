import { Check, Loader2 } from "lucide-react";

import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";
import type { ProcessingStep } from "@/types";

interface ProcessingStepRowProps {
  step: ProcessingStep;
  isLast?: boolean;
}

const STATUS_KEY: Record<ProcessingStep["status"], TranslationKey> = {
  waiting: "processing.status.waiting",
  processing: "processing.status.processing",
  completed: "processing.status.completed",
  failed: "processing.status.failed",
};

export function ProcessingStepRow({ step, isLast = false }: ProcessingStepRowProps) {
  const t = useT();
  const isActive = step.status === "processing";
  const isDone = step.status === "completed";

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast ? (
        <span
          className={cn(
            "absolute left-[11px] top-6 h-[calc(100%-1rem)] w-px",
            isDone ? "bg-border-strong" : "bg-border",
          )}
        />
      ) : null}

      <span
        className={cn(
          "relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border",
          isDone && "border-border-strong bg-elevated text-foreground",
          isActive && "border-signal bg-signal-muted text-signal",
          step.status === "waiting" && "border-border bg-background text-muted-foreground",
        )}
      >
        {isDone ? (
          <Check className="h-3 w-3" />
        ) : isActive ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <span className="h-1 w-1 rounded-full bg-current" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-4">
          <span
            className={cn(
              "text-sm transition-colors",
              isActive || isDone ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {t(`processing.step.${step.id}` as TranslationKey)}
          </span>
          <span
            className={cn(
              "font-mono text-[0.7rem] uppercase tracking-[0.08em] tabular",
              isActive ? "text-signal" : "text-muted-foreground",
            )}
          >
            {isActive ? `${step.progress}%` : t(STATUS_KEY[step.status])}
          </span>
        </span>

        {isActive ? (
          <span className="mt-2 block h-[2px] w-full overflow-hidden bg-border">
            <span
              className="block h-full bg-signal transition-[width] duration-200"
              style={{ width: `${step.progress}%` }}
            />
          </span>
        ) : null}
      </span>
    </li>
  );
}
