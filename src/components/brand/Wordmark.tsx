import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Renders the bracketed lockup: [ IN ] POINT */
  variant?: "plain" | "bracket";
  compact?: boolean;
}

export function Wordmark({ className, variant = "plain", compact = false }: WordmarkProps) {
  if (compact) {
    return (
      <span
        className={cn(
          "font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-foreground",
          className,
        )}
      >
        IN
      </span>
    );
  }

  if (variant === "bracket") {
    return (
      <span
        className={cn(
          "font-mono text-sm font-medium tracking-[0.22em] text-foreground",
          className,
        )}
      >
        <span className="text-signal">[</span> IN <span className="text-signal">]</span> POINT
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-[0.9375rem] font-semibold tracking-[0.2em] text-foreground",
        className,
      )}
    >
      INPOINT
    </span>
  );
}
