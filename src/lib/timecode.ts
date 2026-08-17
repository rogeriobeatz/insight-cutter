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

/**
 * Relative date, localized through the translate function so no copy lives here.
 */
export function formatRelativeDate(
  iso: string,
  options: {
    t: (key: "date.today" | "date.yesterday" | "date.daysAgo", vars?: Record<string, string | number>) => string;
    intl: string;
    now?: Date;
  },
): string {
  const { t, intl, now = new Date() } = options;
  const date = new Date(iso);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return t("date.today");
  if (diffDays === 1) return t("date.yesterday");
  if (diffDays < 7) return t("date.daysAgo", { count: diffDays });
  return date.toLocaleDateString(intl, { month: "short", day: "numeric" });
}

export type GreetingKey =
  | "dashboard.greeting.morning"
  | "dashboard.greeting.afternoon"
  | "dashboard.greeting.evening";

export function greetingKeyForHour(hour: number): GreetingKey {
  if (hour < 12) return "dashboard.greeting.morning";
  if (hour < 18) return "dashboard.greeting.afternoon";
  return "dashboard.greeting.evening";
}
