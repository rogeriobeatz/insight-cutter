import { SegmentButton } from "@/components/editor/CaptionControls";
import { OptionRow } from "@/components/editor/OptionRow";
import { useT, type TranslationKey } from "@/i18n";
import type { ClipAspectRatio, ClipFraming, ClipLayoutSettings } from "@/types";

interface LayoutControlsProps {
  layout: ClipLayoutSettings;
  onChange: (patch: Partial<ClipLayoutSettings>) => void;
}

const RATIOS: ClipAspectRatio[] = ["9:16", "1:1", "16:9"];
const FRAMINGS: Array<{ value: ClipFraming; labelKey: TranslationKey }> = [
  { value: "auto", labelKey: "layout.framing.auto" },
  { value: "center", labelKey: "layout.framing.center" },
  { value: "speaker", labelKey: "layout.framing.speaker" },
];

export function LayoutControls({ layout, onChange }: LayoutControlsProps) {
  const t = useT();

  return (
    <div className="space-y-6">
      <OptionRow label={t("layout.format")}>
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

      <OptionRow label={t("layout.framing")}>
        <div className="grid grid-cols-3 gap-1">
          {FRAMINGS.map((framing) => (
            <SegmentButton
              key={framing.value}
              active={layout.framing === framing.value}
              onClick={() => onChange({ framing: framing.value })}
            >
              {t(framing.labelKey)}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {t("layout.hint")}
      </p>
    </div>
  );
}
