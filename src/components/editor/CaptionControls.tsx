import { OptionRow } from "@/components/editor/OptionRow";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { CaptionSettings, CaptionStyle } from "@/types";

interface CaptionControlsProps {
  captions: CaptionSettings;
  onChange: (patch: Partial<CaptionSettings>) => void;
}

const STYLES: Array<{ value: CaptionStyle; label: string }> = [
  { value: "minimal", label: "Minimal" },
  { value: "bold", label: "Bold" },
  { value: "karaoke", label: "Karaoke" },
];

const POSITIONS: Array<{ value: CaptionSettings["position"]; label: string }> = [
  { value: "top", label: "Top" },
  { value: "center", label: "Center" },
  { value: "bottom", label: "Bottom" },
];

const HIGHLIGHTS: Array<{ value: string; label: string; className: string }> = [
  { value: "signal", label: "Signal", className: "bg-signal" },
  { value: "white", label: "White", className: "bg-foreground" },
  { value: "graphite", label: "Graphite", className: "bg-elevated border border-border-strong" },
];

export function CaptionControls({ captions, onChange }: CaptionControlsProps) {
  return (
    <div className="space-y-6">
      <OptionRow label="Style">
        <div className="grid grid-cols-3 gap-1">
          {STYLES.map((style) => (
            <SegmentButton
              key={style.value}
              active={captions.style === style.value}
              onClick={() => onChange({ style: style.value })}
            >
              {style.label}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <OptionRow label="Font size" value={`${captions.fontSize}px`}>
        <Slider
          value={[captions.fontSize]}
          min={24}
          max={64}
          step={2}
          onValueChange={([value]) => onChange({ fontSize: value ?? captions.fontSize })}
        />
      </OptionRow>

      <OptionRow label="Position">
        <div className="grid grid-cols-3 gap-1">
          {POSITIONS.map((position) => (
            <SegmentButton
              key={position.value}
              active={captions.position === position.value}
              onClick={() => onChange({ position: position.value })}
            >
              {position.label}
            </SegmentButton>
          ))}
        </div>
      </OptionRow>

      <OptionRow label="Highlight color">
        <div className="flex gap-2">
          {HIGHLIGHTS.map((color) => (
            <button
              key={color.value}
              type="button"
              aria-label={color.label}
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
