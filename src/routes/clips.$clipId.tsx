import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Monitor, Pause, Play, Upload } from "lucide-react";
import { toast } from "sonner";

import { CaptionControls } from "@/components/editor/CaptionControls";
import { LayoutControls } from "@/components/editor/LayoutControls";
import { Timeline } from "@/components/editor/Timeline";
import { TranscriptPanel } from "@/components/editor/TranscriptPanel";
import { VideoPreview } from "@/components/editor/VideoPreview";
import { ViralityScore } from "@/components/clips/ViralityScore";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/shell/EmptyState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClipEditor } from "@/hooks/useClipEditor";
import { formatShortDuration, formatTimecode } from "@/lib/timecode";
import { getClip } from "@/services/inpoint.service";
import type { Clip } from "@/types";

export const Route = createFileRoute("/clips/$clipId")({
  head: () => ({
    meta: [
      { title: "Clip editor — INPOINT" },
      { name: "description", content: "Trim, caption and reframe your clip before exporting." },
      { property: "og:title", content: "Clip editor — INPOINT" },
      { property: "og:description", content: "Trim, caption and reframe your clip." },
    ],
  }),
  component: ClipEditorPage,
});

function ClipEditorPage() {
  const { clipId } = Route.useParams();
  const { data: clip, isPending } = useQuery({
    queryKey: ["clip", clipId],
    queryFn: () => getClip(clipId),
  });

  if (isPending) {
    return <AppShell fullHeight><div /></AppShell>;
  }

  if (!clip) {
    return (
      <AppShell>
        <div className="mx-auto w-full max-w-3xl px-6 py-20">
          <EmptyState
            title="Clip not found"
            action={
              <Button variant="signal" size="sm" asChild>
                <Link to="/clips">Back to clips</Link>
              </Button>
            }
          />
        </div>
      </AppShell>
    );
  }

  return <ClipEditor clip={clip} />;
}

function ClipEditor({ clip }: { clip: Clip }) {
  const editor = useClipEditor(clip);
  const padding = 6;

  return (
    <AppShell fullHeight>
      {/* Small screens: the editor needs room to work. */}
      <div className="flex flex-1 items-center justify-center px-6 lg:hidden">
        <EmptyState
          title="Best experienced on desktop"
          description="The clip editor needs a wider screen. Open INPOINT on a desktop to trim, caption and reframe."
          action={
            <Button variant="outline" size="sm" asChild>
              <Link to="/clips">Back to clips</Link>
            </Button>
          }
          className="border-border"
        />
      </div>

      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects/$projectId" params={{ projectId: clip.projectId }}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <span className="h-5 w-px bg-border" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{clip.title}</p>
              <p className="font-mono text-[0.65rem] tabular text-muted-foreground">
                {formatTimecode(editor.inSec)} → {formatTimecode(editor.outSec)} —{" "}
                {formatShortDuration(editor.durationSec)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ViralityScore score={clip.score} size="sm" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                editor.markSaved();
                toast.success("Clip saved");
              }}
            >
              Save
            </Button>
            <Button
              variant="signal"
              size="sm"
              onClick={() => toast.success("Export queued — 1080×1920")}
            >
              <Upload className="h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 items-center justify-center bg-background p-8">
              <div className="flex h-full max-h-[520px] items-center gap-6">
                <VideoPreview
                  captionText={clip.captionText}
                  captions={editor.captions}
                  layout={editor.layout}
                />
                <div className="flex flex-col items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={editor.isPlaying ? "Pause" : "Play"}
                    onClick={editor.togglePlay}
                  >
                    {editor.isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                    {editor.layout.aspectRatio}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                    <Monitor className="h-3 w-3" />
                    1080p
                  </span>
                </div>
              </div>
            </div>

            <Timeline
              windowStartSec={Math.max(0, clip.inSec - padding)}
              windowEndSec={clip.outSec + padding}
              inSec={editor.inSec}
              outSec={editor.outSec}
              playheadSec={editor.playheadSec}
              onSeek={editor.seek}
            />
          </div>

          <aside className="flex w-[320px] shrink-0 flex-col border-l border-border bg-sidebar">
            <Tabs defaultValue="captions" className="flex min-h-0 flex-1 flex-col">
              <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-b border-border bg-transparent p-2">
                <TabsTrigger value="captions" className="rounded-sm text-xs">
                  Captions
                </TabsTrigger>
                <TabsTrigger value="layout" className="rounded-sm text-xs">
                  Layout
                </TabsTrigger>
                <TabsTrigger value="transcript" className="rounded-sm text-xs">
                  Transcript
                </TabsTrigger>
              </TabsList>

              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <TabsContent value="captions" className="mt-0">
                  <CaptionControls captions={editor.captions} onChange={editor.updateCaptions} />
                </TabsContent>
                <TabsContent value="layout" className="mt-0">
                  <LayoutControls layout={editor.layout} onChange={editor.updateLayout} />
                </TabsContent>
                <TabsContent value="transcript" className="mt-0">
                  <TranscriptPanel
                    segments={clip.transcript}
                    playheadSec={editor.playheadSec}
                    onSelectSegment={(segment) => editor.seek(segment.startSec)}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
