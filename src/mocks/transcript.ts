import type { TranscriptSegment } from "@/types";

/**
 * A short mock transcript window around a clip's IN point.
 * Timestamps are absolute (relative to the source video).
 */
export function buildMockTranscript(startSec: number): TranscriptSegment[] {
  const lines: Array<[string, string]> = [
    ["Speaker 1", "You eventually realize that getting better at software"],
    ["Speaker 1", "doesn't necessarily make you a better designer."],
    ["Speaker 1", "The tools stop being the bottleneck pretty early."],
    ["Speaker 2", "So what becomes the bottleneck after that?"],
    ["Speaker 1", "Judgement. Knowing which problem is actually worth solving."],
    ["Speaker 1", "That's the part nobody teaches you in a tutorial."],
    ["Speaker 2", "And that's where most people plateau."],
    ["Speaker 1", "Exactly. They keep sharpening a skill that already works."],
    ["Speaker 1", "The growth is in the decisions, not the execution."],
    ["Speaker 2", "That reframes the whole career question."],
  ];

  let cursor = startSec;
  return lines.map(([speaker, text], index) => {
    const duration = 3.2 + (index % 3) * 1.1;
    const segment: TranscriptSegment = {
      id: `seg-${index}`,
      startSec: cursor,
      endSec: cursor + duration,
      speaker,
      text,
    };
    cursor += duration;
    return segment;
  });
}
