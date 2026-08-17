import { Link } from "@tanstack/react-router";
import { Download, Play, Scissors } from "lucide-react";

import { ViralityScore } from "@/components/clips/ViralityScore";
import { Button } from "@/components/ui/button";
import { isHighScore } from "@/lib/scoring";
import { formatRange, formatShortDuration } from "@/lib/timecode";
import { cn } from "@/lib/utils";
import type { Clip } from "@/types";

interface ClipCardProps {
  clip: Clip;
  onPreview?: (clip: Clip) => void;
  onDownload?: (clip: Clip) => void;
}

export function ClipCard({ clip, onPreview, onDownload }: ClipCardProps) {
  const high = isHighScore(clip.score.overall);

  return (
    <article
      className={cn(
        "group flex flex-col border bg-card transition-colors",
        high ? "border-signal/25 hover:border-signal/50" : "border-border hover:border-border-strong",
      )}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-surface">
        <img
          src={clip.thumbnailUrl}
          alt=""
          loading="lazy"
          width={720}
          height={1280}
          className="h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* selection brackets */}
        <span className="pointer-events-none absolute inset-2 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-signal" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-signal" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-signal" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-signal" />
        </span>

        <div className="absolute left-3 top-3">
          <ViralityScore score={clip.score} />
        </div>

        <span className="absolute bottom-3 right-3 rounded-[2px] bg-background/85 px-1.5 py-0.5 font-mono text-[0.65rem] tabular text-foreground">
          {formatShortDuration(clip.outSec - clip.inSec)}
        </span>

        <button
          type="button"
          onClick={() => onPreview?.(clip)}
          aria-label={`Preview ${clip.title}`}
          className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-signal bg-background/80 text-signal">
            <Play className="h-4 w-4" />
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[0.65rem] tabular text-muted-foreground">
          {formatRange(clip.inSec, clip.outSec)}
        </p>

        <h3 className="mt-2 text-[0.9rem] font-medium uppercase leading-snug tracking-[0.01em] text-foreground">
          {clip.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          “{clip.excerpt}”
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {clip.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[2px] border border-border px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3">
          <Button variant="ghost" size="sm" onClick={() => onPreview?.(clip)}>
            <Play className="h-3.5 w-3.5" />
            Preview
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/clips/$clipId" params={{ clipId: clip.id }}>
              <Scissors className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            aria-label="Download clip"
            onClick={() => onDownload?.(clip)}
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
