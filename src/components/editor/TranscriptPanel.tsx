import { formatClockTime } from "@/lib/timecode";
import { cn } from "@/lib/utils";
import type { TranscriptSegment } from "@/types";

interface TranscriptPanelProps {
  segments: TranscriptSegment[];
  playheadSec: number;
  onSelectSegment: (segment: TranscriptSegment) => void;
}

export function TranscriptPanel({ segments, playheadSec, onSelectSegment }: TranscriptPanelProps) {
  return (
    <div className="space-y-1">
      <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
        Select a line to move the playhead. Trimming from the transcript is coming next.
      </p>
      {segments.map((segment) => {
        const active = playheadSec >= segment.startSec && playheadSec < segment.endSec;
        return (
          <button
            key={segment.id}
            type="button"
            onClick={() => onSelectSegment(segment)}
            className={cn(
              "flex w-full gap-3 rounded-sm px-2 py-2 text-left transition-colors",
              active ? "bg-signal-muted" : "hover:bg-secondary/60",
            )}
          >
            <span
              className={cn(
                "shrink-0 pt-0.5 font-mono text-[0.65rem] tabular",
                active ? "text-signal" : "text-muted-foreground",
              )}
            >
              {formatClockTime(segment.startSec)}
            </span>
            <span className="min-w-0">
              {segment.speaker ? (
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground">
                  {segment.speaker}
                </span>
              ) : null}
              <span
                className={cn(
                  "block text-[0.8rem] leading-relaxed",
                  active ? "text-foreground" : "text-secondary-foreground",
                )}
              >
                {segment.text}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
