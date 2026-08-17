import { useRef, useState, type DragEvent } from "react";
import { FileVideo, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPT = ".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm";

export function UploadDropzone({ file, onFileChange }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onFileChange(dropped);
  };

  if (file) {
    return (
      <div className="flex items-center gap-4 border border-border bg-card px-5 py-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-signal-muted text-signal">
          <FileVideo className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm text-foreground">{file.name}</span>
          <span className="mt-1 block font-mono text-[0.7rem] tabular text-muted-foreground">
            {(file.size / 1_048_576).toFixed(1)} MB — ready to analyze
          </span>
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Remove file"
          onClick={() => onFileChange(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center border border-dashed px-8 py-20 text-center transition-colors",
        isOver ? "border-signal bg-signal-muted/40" : "border-border-strong bg-card/40",
      )}
    >
      {/* crop guides */}
      <span className="pointer-events-none absolute inset-4">
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-border" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-border" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-border" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-border" />
      </span>

      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors",
          isOver && "border-signal text-signal",
        )}
      >
        <Upload className="h-5 w-5" />
      </span>

      <p className="mt-6 text-base font-medium text-foreground">Drop your video here</p>
      <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
        MP4, MOV or WEBM
      </p>

      <Button variant="outline" size="sm" className="mt-6" onClick={() => inputRef.current?.click()}>
        Choose file
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
