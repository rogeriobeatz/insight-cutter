import { useEffect, useMemo, useState } from "react";

import { ANALYSIS_MESSAGES, activeStep, buildSteps, HEADLINE_BY_STEP } from "@/lib/pipeline";
import type { ProcessingJob } from "@/types";

interface Options {
  projectId: string;
  /** Approximate wall-clock duration of the simulated pipeline, in ms. */
  durationMs?: number;
  startAt?: number;
  onComplete?: () => void;
}

/**
 * Simulates the analysis pipeline. Replace with a subscription to a real
 * ProcessingJob record without touching the UI.
 */
export function useProcessingSimulation({
  projectId,
  durationMs = 14_000,
  startAt = 0,
  onComplete,
}: Options): { job: ProcessingJob; headline: string; detail: string } {
  const [progress, setProgress] = useState(startAt);
  const [messageIndex, setMessageIndex] = useState(0);
  const [startedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    if (progress >= 100) {
      onComplete?.();
      return;
    }
    const tickMs = 90;
    const increment = (100 - startAt) / (durationMs / tickMs);
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + increment));
    }, tickMs);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress >= 100, durationMs, startAt]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % ANALYSIS_MESSAGES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const job = useMemo<ProcessingJob>(() => {
    const steps = buildSteps(progress);
    const current = activeStep(steps);
    return {
      id: `job-${projectId}`,
      projectId,
      status: progress >= 100 ? "completed" : "running",
      progress: Math.round(progress),
      steps,
      message: current ? HEADLINE_BY_STEP[current.id] : "Done.",
      startedAt,
      finishedAt: progress >= 100 ? new Date().toISOString() : undefined,
    };
  }, [progress, projectId, startedAt]);

  return {
    job,
    headline: job.message,
    detail: ANALYSIS_MESSAGES[messageIndex]!,
  };
}
