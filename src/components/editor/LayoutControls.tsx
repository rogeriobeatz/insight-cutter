import { SegmentButton } from "@/components/editor/CaptionControls";
import { OptionRow } from "@/components/editor/OptionRow";
import type { ClipAspectRatio, ClipFraming, ClipLayoutSettings } from "@/types";

interface LayoutControlsProps {
  layout: ClipLayoutSettings;
  onChange: (patch: Partial<ClipLayoutSettings>) => void;
}

const RATIOS: ClipAspectRatio[] = ["9:16", "1:1", "16:9"];
const FRAMINGS: Array<{ value: ClipFraming; label: string }> = [
  { value: "auto", label: "Auto" },
  { value: "center", label: "Center" },
  { value: "speaker", label: "Speaker" },
];

export function LayoutControls({ layout, onChange }: LayoutControlsProps) {
  return (
    <div className="space-y-6">
      <OptionRow label="Format">
        <div className="grid grid-cols-3 gap-1">
          {RATIOS.map((ratio) => (
            <SegmentButton
              key={ratio}
              active={layout.aspectRatio === ratio}
              onClick={() => onChange({ aspectRatio: ratio })}
            >
              <span className="font-mono">{ratio}</span>
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <OptionRow label="Framing">
        <div className="grid grid-cols-3 gap-1">
          {FRAMINGS.map((framing) => (
            <SegmentButton
              key={framing.value}
              active={layout.framing === framing.value}
              onClick={() => onChange({ framing: framing.value })}
            >
              {framing.label}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Auto framing keeps the active speaker centered and follows cuts across the clip.
      </p>
    </div>
  );
}
