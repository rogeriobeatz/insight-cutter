import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Link2, Loader2, Sparkle } from "lucide-react";

import { OptionRow } from "@/components/editor/OptionRow";
import { SegmentButton } from "@/components/editor/CaptionControls";
import { UploadDropzone } from "@/components/projects/UploadDropzone";
import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProject } from "@/services/inpoint.service";
import type { ClipLengthPreset, ContentType } from "@/types";

export const Route = createFileRoute("/projects/new")({
  head: () => ({
    meta: [
      { title: "New project — INPOINT" },
      {
        name: "description",
        content: "Upload a video or paste a YouTube link and let INPOINT find the moments.",
      },
      { property: "og:title", content: "New project — INPOINT" },
      { property: "og:description", content: "Upload a video and find the moments." },
    ],
  }),
  component: NewProjectPage,
});

const LANGUAGES = ["Auto-detect", "English", "Portuguese", "Spanish"];

const CLIP_LENGTHS: Array<{ value: ClipLengthPreset; label: string }> = [
  { value: "auto", label: "Auto" },
  { value: "30-60", label: "30–60 sec" },
  { value: "60-90", label: "60–90 sec" },
];

const CONTENT_TYPES: Array<{ value: ContentType; label: string }> = [
  { value: "podcast", label: "Podcast" },
  { value: "interview", label: "Interview" },
  { value: "educational", label: "Educational" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

function NewProjectPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]!);
  const [clipLength, setClipLength] = useState<ClipLengthPreset>("auto");
  const [contentType, setContentType] = useState<ContentType>("podcast");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = Boolean(file) || youtubeUrl.trim().length > 0;

  const handleAnalyze = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const project = await createProject({
      file,
      youtubeUrl: youtubeUrl.trim() || undefined,
      language,
      clipLength,
      contentType,
    });
    navigate({ to: "/projects/$projectId/processing", params: { projectId: project.id } });
  };

  return (
    <AppShell>
      <TopBar
        eyebrow="Projects"
        title="New project"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Create a new project
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Drop in a long-form video. INPOINT reads the whole thing and returns the moments worth
          cutting.
        </p>

        <div className="mt-10">
          <UploadDropzone file={file} onFileChange={setFile} />
        </div>

        <div className="my-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="label-mono text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div>
          <label
            htmlFor="youtube"
            className="label-mono mb-2 block text-muted-foreground"
          >
            Paste a YouTube link
          </label>
          <div className="relative">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="youtube"
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="h-11 rounded-sm border-border bg-card pl-9 font-mono text-sm placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <OptionRow label="Language">
            <div className="flex flex-wrap gap-1">
              {LANGUAGES.map((item) => (
                <SegmentButton
                  key={item}
                  active={language === item}
                  onClick={() => setLanguage(item)}
                >
                  {item}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>

          <OptionRow label="Clip length">
            <div className="flex flex-wrap gap-1">
              {CLIP_LENGTHS.map((item) => (
                <SegmentButton
                  key={item.value}
                  active={clipLength === item.value}
                  onClick={() => setClipLength(item.value)}
                >
                  {item.label}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>

          <OptionRow label="Content type">
            <div className="flex flex-wrap gap-1">
              {CONTENT_TYPES.map((item) => (
                <SegmentButton
                  key={item.value}
                  active={contentType === item.value}
                  onClick={() => setContentType(item.value)}
                >
                  {item.label}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <Button variant="signal" size="lg" disabled={!canSubmit || submitting} onClick={handleAnalyze}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkle className="h-4 w-4" />
            )}
            Analyze video
          </Button>
          {!canSubmit ? (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
              Add a file or link to continue
            </span>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
