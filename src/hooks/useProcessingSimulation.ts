import { useEffect, useMemo, useState } from "react";

import type { TranslationKey } from "@/i18n";
import { activeStep, buildSteps, DETAIL_MESSAGE_COUNT } from "@/lib/pipeline";
import type { ProcessingJob } from "@/types";

interface Options {
  projectId: string;
  /** Approximate wall-clock duration of the simulated pipeline, in ms. */
  durationMs?: number;
  startAt?: number;
  onComplete?: () => void;
}

interface Result {
  job: ProcessingJob;
  /** Translation key for the current pipeline headline. */
  headlineKey: TranslationKey;
  /** Translation key for the rotating analysis microcopy. */
  detailKey: TranslationKey;
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
}: Options): Result {
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
      setMessageIndex((index) => (index + 1) % DETAIL_MESSAGE_COUNT);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const headlineKey = useMemo<TranslationKey>(() => {
    const current = activeStep(buildSteps(progress));
    return (
      current && progress < 100
        ? (`processing.headline.${current.id}` as TranslationKey)
        : "processing.headline.done"
    );
  }, [progress]);

  const job = useMemo<ProcessingJob>(
    () => ({
      id: `job-${projectId}`,
      projectId,
      status: progress >= 100 ? "completed" : "running",
      progress: Math.round(progress),
      steps: buildSteps(progress),
      /** Translation key — the UI resolves it. */
      message: headlineKey,
      startedAt,
      finishedAt: progress >= 100 ? new Date().toISOString() : undefined,
    }),
    [progress, projectId, startedAt, headlineKey],
  );

  return {
    job,
    headlineKey,
    detailKey: `processing.detail.${messageIndex}` as TranslationKey,
  };
}
