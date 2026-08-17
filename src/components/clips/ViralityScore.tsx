import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { isHighScore, SCORE_DIMENSIONS, SCORE_EXPLANATION, scoreLabel } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import type { ClipScore } from "@/types";

interface ViralityScoreProps {
  score: ClipScore;
  size?: "sm" | "lg";
  className?: string;
}

export function ViralityScore({ score, size = "lg", className }: ViralityScoreProps) {
  const high = isHighScore(score.overall);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Virality score ${score.overall}. Open breakdown.`}
          className={cn(
            "group inline-flex items-baseline gap-1.5 rounded-sm border px-2 py-1 transition-colors",
            high
              ? "border-signal/40 bg-signal-muted text-signal hover:border-signal/70"
              : "border-border bg-background/70 text-foreground hover:border-border-strong",
            className,
          )}
        >
          <span
            className={cn(
              "font-mono font-medium tabular leading-none",
              size === "lg" ? "text-2xl" : "text-base",
            )}
          >
            {score.overall}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
            score
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-72 rounded-sm border-border bg-popover p-5">
        <div className="flex items-baseline justify-between">
          <span className="label-mono text-muted-foreground">Virality score</span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-signal">
            {scoreLabel(score.overall)}
          </span>
        </div>

        <ul className="mt-4 space-y-2.5">
          {SCORE_DIMENSIONS.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
              <span className="h-[3px] flex-1 bg-border">
                <span
                  className={cn("block h-full", isHighScore(score[key]) ? "bg-signal" : "bg-muted-foreground")}
                  style={{ width: `${score[key]}%` }}
                />
              </span>
              <span className="w-7 shrink-0 text-right font-mono text-xs tabular text-foreground">
                {score[key]}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs font-medium text-foreground">Overall</span>
          <span className="font-mono text-sm tabular text-signal">{score.overall}</span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{SCORE_EXPLANATION}</p>
      </PopoverContent>
    </Popover>
  );
}
