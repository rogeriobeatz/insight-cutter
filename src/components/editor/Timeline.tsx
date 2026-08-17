import { useMemo, type MouseEvent } from "react";

import { formatTimecode } from "@/lib/timecode";
import { cn } from "@/lib/utils";

interface TimelineProps {
  /** Source window shown on the timeline. */
  windowStartSec: number;
  windowEndSec: number;
  inSec: number;
  outSec: number;
  playheadSec: number;
  fps?: number;
  onSeek: (seconds: number) => void;
}

/** Deterministic pseudo-waveform so SSR and client render identically. */
function waveform(bars: number, seed: number): number[] {
  return Array.from({ length: bars }, (_, index) => {
    const value = Math.sin((index + seed) * 0.7) + Math.sin((index + seed) * 0.19) * 1.4;
    return 0.25 + Math.abs(value) / 3.2;
  });
}

export function Timeline({
  windowStartSec,
  windowEndSec,
  inSec,
  outSec,
  playheadSec,
  fps = 24,
  onSeek,
}: TimelineProps) {
  const span = Math.max(1, windowEndSec - windowStartSec);
  const bars = useMemo(() => waveform(160, Math.round(windowStartSec)), [windowStartSec]);

  const pct = (seconds: number) => ((seconds - windowStartSec) / span) * 100;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    onSeek(windowStartSec + ratio * span);
  };

  const ticks = Array.from({ length: 9 }, (_, index) => windowStartSec + (span / 8) * index);

  return (
    <section className="border-t border-border bg-sidebar px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 font-mono text-[0.7rem] tabular">
          <span className="text-signal">IN {formatTimecode(inSec, fps)}</span>
          <span className="text-muted-foreground">OUT {formatTimecode(outSec, fps)}</span>
        </div>
        <span className="font-mono text-sm tabular text-foreground">
          {formatTimecode(playheadSec, fps)}
        </span>
      </div>

      <div
        role="presentation"
        onClick={handleClick}
        className="relative mt-4 h-24 cursor-crosshair select-none overflow-hidden rounded-sm border border-border bg-background"
      >
        {/* out-of-selection dimming */}
        <span
          className="absolute inset-y-0 left-0 bg-background/70"
          style={{ width: `${Math.max(0, pct(inSec))}%` }}
        />
        <span
          className="absolute inset-y-0 right-0 bg-background/70"
          style={{ width: `${Math.max(0, 100 - pct(outSec))}%` }}
        />

        {/* waveform */}
        <div className="absolute inset-0 flex items-center gap-px px-px">
          {bars.map((height, index) => {
            const position = (index / bars.length) * 100;
            const inside = position >= pct(inSec) && position <= pct(outSec);
            return (
              <span
                key={index}
                className={cn("w-full rounded-[1px]", inside ? "bg-signal/70" : "bg-border-strong")}
                style={{ height: `${height * 70}%` }}
              />
            );
          })}
        </div>

        {/* in / out markers */}
        <span
          className="absolute inset-y-0 w-[2px] bg-signal"
          style={{ left: `${pct(inSec)}%` }}
        >
          <span className="absolute -top-px left-0 h-2 w-2 bg-signal" />
        </span>
        <span
          className="absolute inset-y-0 w-[2px] bg-signal"
          style={{ left: `${pct(outSec)}%` }}
        >
          <span className="absolute -top-px right-0 h-2 w-2 bg-signal" />
        </span>

        {/* playhead */}
        <span
          className="pointer-events-none absolute inset-y-0 w-px bg-foreground"
          style={{ left: `${pct(playheadSec)}%` }}
        >
          <span className="absolute -top-0.5 left-1/2 h-1.5 w-2.5 -translate-x-1/2 bg-foreground" />
        </span>
      </div>

      <div className="mt-2 flex justify-between font-mono text-[0.6rem] tabular text-muted-foreground">
        {ticks.map((tick, index) => (
          <span key={index}>{formatTimecode(tick, fps)}</span>
        ))}
      </div>
    </section>
  );
}
