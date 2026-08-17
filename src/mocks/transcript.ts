import type { TranscriptSegment } from "@/types";

/**
 * A short mock transcript window around a clip's IN point.
 * Timestamps are absolute (relative to the source video).
 */
export function buildMockTranscript(startSec: number): TranscriptSegment[] {
  const lines: Array<[string, string]> = [
    ["Convidado", "Uma hora você percebe que dominar a ferramenta"],
    ["Convidado", "não te torna, necessariamente, um criador melhor."],
    ["Convidado", "As ferramentas param de ser o gargalo bem cedo."],
    ["Apresentador", "E o que passa a ser o gargalo depois disso?"],
    ["Convidado", "Julgamento. Saber qual problema vale a pena resolver."],
    ["Convidado", "Essa é a parte que nenhum tutorial ensina."],
    ["Apresentador", "E é aí que a maioria estaciona."],
    ["Convidado", "Exato. Continuam afiando uma habilidade que já funciona."],
    ["Convidado", "O crescimento está nas decisões, não na execução."],
    ["Apresentador", "Isso muda toda a conversa sobre carreira."],
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
