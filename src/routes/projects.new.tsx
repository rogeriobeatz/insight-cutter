import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Loader2, Sparkle, Youtube } from "lucide-react";

import { OptionRow } from "@/components/editor/OptionRow";
import { SegmentButton } from "@/components/editor/CaptionControls";
import { UploadDropzone } from "@/components/projects/UploadDropzone";
import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { createProject } from "@/services/inpoint.service";
import type { ClipLengthPreset, ContentType } from "@/types";

export const Route = createFileRoute("/projects/new")({
  head: () => ({
    meta: [
      { title: "Novo projeto — INPOINT" },
      {
        name: "description",
        content:
          "Cole o link de um vídeo do YouTube e deixe o INPOINT encontrar os cortes com maior potencial viral.",
      },
      { property: "og:title", content: "Novo projeto — INPOINT" },
      { property: "og:description", content: "Cole um link e encontre os momentos." },
    ],
  }),
  component: NewProjectPage,
});

const LANGUAGES: Array<{ value: string; labelKey: TranslationKey }> = [
  { value: "auto", labelKey: "new.language.auto" },
  { value: "pt", labelKey: "new.language.pt" },
  { value: "en", labelKey: "new.language.en" },
  { value: "es", labelKey: "new.language.es" },
];

const CLIP_LENGTHS: Array<{ value: ClipLengthPreset; labelKey: TranslationKey }> = [
  { value: "auto", labelKey: "new.clipLength.auto" },
  { value: "30-60", labelKey: "new.clipLength.30-60" },
  { value: "60-90", labelKey: "new.clipLength.60-90" },
];

const CONTENT_TYPES: Array<{ value: ContentType; labelKey: TranslationKey }> = [
  { value: "podcast", labelKey: "new.contentType.podcast" },
  { value: "interview", labelKey: "new.contentType.interview" },
  { value: "educational", labelKey: "new.contentType.educational" },
  { value: "business", labelKey: "new.contentType.business" },
  { value: "other", labelKey: "new.contentType.other" },
];

function NewProjectPage() {
  const t = useT();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [language, setLanguage] = useState("auto");
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
        eyebrow={t("new.eyebrow")}
        title={t("common.newProject")}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </Button>
        }
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <h1 className="text-3xl font-medium tracking-tight text-foreground">{t("new.title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("new.subtitle")}</p>

        {/* Primary path: paste a YouTube link. */}
        <div className="mt-10 border border-border-strong bg-card p-6 md:p-8">
          <label htmlFor="youtube" className="label-mono mb-3 flex items-center gap-2 text-signal">
            <Youtube className="h-3.5 w-3.5" />
            {t("new.youtube.label")}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="youtube"
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
              placeholder={t("new.youtube.placeholder")}
              className="h-12 flex-1 rounded-sm border-border bg-background font-mono text-sm placeholder:text-muted-foreground/70"
            />
            <Button
              variant="signal"
              size="lg"
              className="h-12 shrink-0"
              disabled={!canSubmit || submitting}
              onClick={handleAnalyze}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkle className="h-4 w-4" />
              )}
              {t("new.analyze")}
            </Button>
          </div>
          <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
            {t("new.youtube.hint")}
          </p>
        </div>

        {/* Secondary path: file upload, collapsed by default. */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowUpload((value) => !value)}
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", showUpload && "rotate-180")}
            />
            {showUpload ? t("new.upload.hide") : t("new.upload.toggle")}
          </button>

          {showUpload ? (
            <div className="mt-4">
              <UploadDropzone file={file} onFileChange={setFile} />
            </div>
          ) : null}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          <OptionRow label={t("new.language")}>
            <div className="flex flex-wrap gap-1">
              {LANGUAGES.map((item) => (
                <SegmentButton
                  key={item.value}
                  active={language === item.value}
                  onClick={() => setLanguage(item.value)}
                >
                  {t(item.labelKey)}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>

          <OptionRow label={t("new.clipLength")}>
            <div className="flex flex-wrap gap-1">
              {CLIP_LENGTHS.map((item) => (
                <SegmentButton
                  key={item.value}
                  active={clipLength === item.value}
                  onClick={() => setClipLength(item.value)}
                >
                  {t(item.labelKey)}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>

          <OptionRow label={t("new.contentType")}>
            <div className="flex flex-wrap gap-1">
              {CONTENT_TYPES.map((item) => (
                <SegmentButton
                  key={item.value}
                  active={contentType === item.value}
                  onClick={() => setContentType(item.value)}
                >
                  {t(item.labelKey)}
                </SegmentButton>
              ))}
            </div>
          </OptionRow>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <Button
            variant="signal"
            size="lg"
            disabled={!canSubmit || submitting}
            onClick={handleAnalyze}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkle className="h-4 w-4" />
            )}
            {t("new.analyze")}
          </Button>
          {!canSubmit ? (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
              {t("new.needInput")}
            </span>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
