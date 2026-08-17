import { OptionRow } from "@/components/editor/OptionRow";
import { Slider } from "@/components/ui/slider";
import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";
import type { CaptionSettings, CaptionStyle } from "@/types";

interface CaptionControlsProps {
  captions: CaptionSettings;
  onChange: (patch: Partial<CaptionSettings>) => void;
}

const STYLES: Array<{ value: CaptionStyle; labelKey: TranslationKey }> = [
  { value: "minimal", labelKey: "captions.style.minimal" },
  { value: "bold", labelKey: "captions.style.bold" },
  { value: "karaoke", labelKey: "captions.style.karaoke" },
];

const POSITIONS: Array<{ value: CaptionSettings["position"]; labelKey: TranslationKey }> = [
  { value: "top", labelKey: "captions.position.top" },
  { value: "center", labelKey: "captions.position.center" },
  { value: "bottom", labelKey: "captions.position.bottom" },
];

const HIGHLIGHTS: Array<{ value: string; labelKey: TranslationKey; className: string }> = [
  { value: "signal", labelKey: "captions.highlight.signal", className: "bg-signal" },
  { value: "white", labelKey: "captions.highlight.white", className: "bg-foreground" },
  {
    value: "graphite",
    labelKey: "captions.highlight.graphite",
    className: "bg-elevated border border-border-strong",
  },
];

export function CaptionControls({ captions, onChange }: CaptionControlsProps) {
  const t = useT();

  return (
    <div className="space-y-6">
      <OptionRow label={t("captions.style")}>
        <div className="grid grid-cols-3 gap-1">
          {STYLES.map((style) => (
            <SegmentButton
              key={style.value}
              active={captions.style === style.value}
              onClick={() => onChange({ style: style.value })}
            >
              {t(style.labelKey)}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <OptionRow label={t("captions.fontSize")} value={`${captions.fontSize}px`}>
        <Slider
          value={[captions.fontSize]}
          min={24}
          max={64}
          step={2}
          onValueChange={([value]) => onChange({ fontSize: value ?? captions.fontSize })}
        />
      </OptionRow>

      <OptionRow label={t("captions.position")}>
        <div className="grid grid-cols-3 gap-1">
          {POSITIONS.map((position) => (
            <SegmentButton
              key={position.value}
              active={captions.position === position.value}
              onClick={() => onChange({ position: position.value })}
            >
              {t(position.labelKey)}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <OptionRow label={t("captions.highlight")}>
        <div className="flex gap-2">
          {HIGHLIGHTS.map((color) => (
            <button
              key={color.value}
              type="button"
              aria-label={t(color.labelKey)}
              onClick={() => onChange({ highlightColor: color.value })}
              className={cn(
                "h-7 w-7 rounded-sm ring-offset-2 ring-offset-background transition-shadow",
                color.className,
                captions.highlightColor === color.value && "ring-1 ring-signal",
              )}
            />
          ))}
        </div>
      </OptionRow>
    </div>
  );
}

export function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm border px-2 py-1.5 text-xs transition-colors",
        active
          ? "border-signal/50 bg-signal-muted text-foreground"
          : "border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
