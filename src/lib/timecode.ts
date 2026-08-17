/**
 * Timecode + duration formatting.
 *
 * Timecodes are part of INPOINT's visual identity, so all formatting lives in
 * one place and never inside components.
 */

const pad = (value: number, size = 2) => String(Math.floor(value)).padStart(size, "0");

/** `01:42:18:08` — broadcast style HH:MM:SS:FF. */
export function formatTimecode(totalSeconds: number, fps = 24): string {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = Math.floor(safe % 60);
  const frames = Math.floor((safe % 1) * fps);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/** `01:42:18` for long form, `58:23` when under an hour. */
export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

/** `00:14:32` — always hours:minutes:seconds, used for in/out points. */
export function formatClockTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  return `${pad(Math.floor(safe / 3600))}:${pad(Math.floor((safe % 3600) / 60))}:${pad(safe % 60)}`;
}

/** `00:47` — short clip length. */
export function formatShortDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  return `${pad(Math.floor(safe / 60))}:${pad(safe % 60)}`;
}

export function formatRange(inSec: number, outSec: number): string {
  return `${formatClockTime(inSec)} → ${formatClockTime(outSec)}`;
}

export function formatMinutes(totalSeconds: number): number {
  return Math.round(totalSeconds / 60);
}

export function formatRelativeDate(iso: string, now = new Date()): string {
  const date = new Date(iso);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}
