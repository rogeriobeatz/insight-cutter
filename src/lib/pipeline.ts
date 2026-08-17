import type { ProcessingStep, ProcessingStepId } from "@/types";

/**
 * Pipeline definition. Labels are not stored here — the UI resolves
 * `processing.step.<id>` through the translation layer.
 */
export const PIPELINE_STEPS: Array<{ id: ProcessingStepId; weight: number }> = [
  { id: "upload", weight: 12 },
  { id: "transcribe", weight: 24 },
  { id: "understand", weight: 22 },
  { id: "moments", weight: 28 },
  { id: "clips", weight: 14 },
];

/** Number of rotating analysis messages (`processing.detail.0..n`). */
export const DETAIL_MESSAGE_COUNT = 4;

/**
 * Derives per-step state from a single overall progress value (0–100).
 * Keeps the simulation logic out of the UI layer.
 */
export function buildSteps(progress: number): ProcessingStep[] {
  let consumed = 0;
  return PIPELINE_STEPS.map((step) => {
    const start = consumed;
    consumed += step.weight;
    const local = ((progress - start) / step.weight) * 100;
    const status: ProcessingStep["status"] =
      local >= 100 ? "completed" : local > 0 ? "processing" : "waiting";
    return {
      id: step.id,
      status,
      progress: Math.max(0, Math.min(100, Math.round(local))),
    };
  });
}

export function activeStep(steps: ProcessingStep[]): ProcessingStep | undefined {
  return steps.find((step) => step.status === "processing") ?? steps[steps.length - 1];
}
