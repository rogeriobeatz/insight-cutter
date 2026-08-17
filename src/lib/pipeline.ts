import type { ProcessingStep, ProcessingStepId } from "@/types";

export const PIPELINE_STEPS: Array<{ id: ProcessingStepId; label: string; weight: number }> = [
  { id: "upload", label: "Uploading", weight: 12 },
  { id: "transcribe", label: "Transcribing", weight: 24 },
  { id: "understand", label: "Understanding content", weight: 22 },
  { id: "moments", label: "Finding key moments", weight: 28 },
  { id: "clips", label: "Creating clips", weight: 14 },
];

export const ANALYSIS_MESSAGES = [
  "Analyzing hooks...",
  "Identifying self-contained stories...",
  "Scoring audience retention potential...",
  "Finding strong conclusions...",
];

export const HEADLINE_BY_STEP: Record<ProcessingStepId, string> = {
  upload: "Preparing your video...",
  transcribe: "Turning speech into text...",
  understand: "Reading through the conversation...",
  moments: "Finding the strongest moments in your video...",
  clips: "Cutting and framing your clips...",
};

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
      label: step.label,
      status,
      progress: Math.max(0, Math.min(100, Math.round(local))),
    };
  });
}

export function activeStep(steps: ProcessingStep[]): ProcessingStep | undefined {
  return steps.find((step) => step.status === "processing") ?? steps[steps.length - 1];
}
