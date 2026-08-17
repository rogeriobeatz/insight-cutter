import { cn } from "@/lib/utils";
import type { UsageSummary } from "@/types";

interface UsageIndicatorProps {
  usage: UsageSummary;
  variant?: "inline" | "panel";
  className?: string;
}

export function UsageIndicator({ usage, variant = "panel", className }: UsageIndicatorProps) {
  const ratio = Math.min(1, usage.minutesUsed / usage.minutesIncluded);
  const segments = 40;
  const filled = Math.round(ratio * segments);

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
          <div className="h-full bg-signal" style={{ width: `${ratio * 100}%` }} />
        </div>
        <span className="font-mono text-xs tabular text-muted-foreground">
          {usage.minutesUsed}/{usage.minutesIncluded} min
        </span>
      </div>
    );
  }

  return (
    <div className={cn("border border-border bg-card p-6", className)}>
      <div className="flex items-baseline justify-between">
        <span className="label-mono text-muted-foreground">{usage.periodLabel}</span>
        <span className="label-mono text-muted-foreground">
          {Math.round(ratio * 100)}% used
        </span>
      </div>

      <p className="mt-4 font-mono text-2xl tabular text-foreground">
        {usage.minutesUsed}
        <span className="text-muted-foreground"> / {usage.minutesIncluded} minutes processed</span>
      </p>

      <div className="mt-5 flex items-end gap-[3px]" aria-hidden="true">
        {Array.from({ length: segments }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "w-full transition-colors",
              index < filled ? "bg-signal" : "bg-border",
              index % 5 === 0 ? "h-4" : "h-2.5",
            )}
          />
        ))}
      </div>
    </div>
  );
}
