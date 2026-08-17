import type { ClipScore } from "@/types";

export const SCORE_DIMENSIONS: Array<{ key: keyof ClipScore; label: string }> = [
  { key: "hook", label: "Hook" },
  { key: "clarity", label: "Clarity" },
  { key: "retention", label: "Retention" },
  { key: "emotion", label: "Emotion" },
  { key: "shareability", label: "Shareability" },
];

export const SCORE_EXPLANATION =
  "INPOINT scores each moment based on how effectively it can work as standalone short-form content.";

/** Scores at or above this threshold get a restrained visual emphasis. */
export const HIGH_SCORE_THRESHOLD = 90;

export function isHighScore(score: number): boolean {
  return score >= HIGH_SCORE_THRESHOLD;
}

export function scoreLabel(score: number): string {
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Solid";
  return "Moderate";
}
