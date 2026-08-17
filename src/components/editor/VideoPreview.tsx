import clipSpeaker from "@/assets/clip-speaker.jpg";
import { cn } from "@/lib/utils";
import type { CaptionSettings, ClipLayoutSettings } from "@/types";

interface VideoPreviewProps {
  captionText: string;
  captions: CaptionSettings;
  layout: ClipLayoutSettings;
  className?: string;
}

const ASPECT_CLASS: Record<ClipLayoutSettings["aspectRatio"], string> = {
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
};

const POSITION_CLASS: Record<CaptionSettings["position"], string> = {
  top: "top-[12%]",
  center: "top-1/2 -translate-y-1/2",
  bottom: "bottom-[14%]",
};

export function VideoPreview({ captionText, captions, layout, className }: VideoPreviewProps) {
  const lines = captionText.split("\n");

  return (
    <div className={cn("relative h-full", ASPECT_CLASS[layout.aspectRatio], className)}>
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-surface">
        <img
          src={clipSpeaker}
          alt="Clip preview frame"
          width={720}
          height={1280}
          className={cn(
            "h-full w-full object-cover",
            layout.framing === "speaker" && "object-right",
            layout.framing === "center" && "object-center",
          )}
        />

        {/* safe-area / crop guides */}
        <span className="pointer-events-none absolute inset-0">
          <span className="absolute inset-x-0 top-[10%] h-px bg-foreground/10" />
          <span className="absolute inset-x-0 bottom-[10%] h-px bg-foreground/10" />
          <span className="absolute inset-y-0 left-[8%] w-px bg-foreground/10" />
          <span className="absolute inset-y-0 right-[8%] w-px bg-foreground/10" />
        </span>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-[8%] flex flex-col items-center gap-1 text-center",
            POSITION_CLASS[captions.position],
          )}
        >
          {lines.map((line, index) => (
            <CaptionLine
              key={index}
              text={line}
              settings={captions}
              highlighted={captions.style === "karaoke" && index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CaptionLine({
  text,
  settings,
  highlighted,
}: {
  text: string;
  settings: CaptionSettings;
  highlighted: boolean;
}) {
  const style = { fontSize: `${settings.fontSize / 16}rem`, lineHeight: 1.1 } as const;

  if (settings.style === "minimal") {
    return (
      <span
        style={style}
        className="font-medium tracking-tight text-foreground [text-shadow:0_1px_12px_rgb(0_0_0/0.7)]"
      >
        {text}
      </span>
    );
  }

  if (settings.style === "karaoke") {
    return (
      <span
        style={style}
        className={cn(
          "px-1.5 font-semibold uppercase tracking-tight",
          highlighted ? "bg-signal text-signal-foreground" : "text-foreground",
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      style={style}
      className="font-bold uppercase tracking-tight text-foreground [text-shadow:0_2px_0_rgb(0_0_0/0.85),0_0_18px_rgb(0_0_0/0.6)]"
    >
      {text}
    </span>
  );
}
