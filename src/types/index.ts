/**
 * Domain types for INPOINT.
 *
 * These are intentionally backend-agnostic: they describe the product model,
 * not a database schema. When Supabase is wired in, the row types can be
 * mapped onto these interfaces inside `src/services`.
 */

export type ID = string;

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarUrl?: string | undefined;
  plan: "free" | "pro" | "studio";
}

export type ProjectStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export type ContentType =
  | "podcast"
  | "interview"
  | "educational"
  | "business"
  | "other";

export type ClipLengthPreset = "auto" | "30-60" | "60-90";

export interface VideoAsset {
  id: ID;
  fileName: string;
  /** Total duration in seconds. */
  durationSec: number;
  thumbnailUrl: string;
  width: number;
  height: number;
  /** Frames per second — used to render broadcast style timecodes. */
  fps: number;
  sourceUrl?: string | undefined;
  source: "upload" | "youtube";
}

export interface Project {
  id: ID;
  title: string;
  createdAt: string;
  status: ProjectStatus;
  /** 0–100, only meaningful while `status === "processing"`. */
  progress: number;
  clipCount: number;
  contentType: ContentType;
  language: string;
  clipLength: ClipLengthPreset;
  video: VideoAsset;
}

export interface ClipScore {
  hook: number;
  clarity: number;
  retention: number;
  emotion: number;
  shareability: number
  overall: number;
}

export interface TranscriptSegment {
  id: ID;
  startSec: number;
  endSec: number;
  speaker?: string | undefined;
  text: string;
}

export type ClipAspectRatio = "9:16" | "1:1" | "16:9";
export type ClipFraming = "auto" | "center" | "speaker";
export type CaptionStyle = "minimal" | "bold" | "karaoke";
export type CaptionPosition = "top" | "center" | "bottom";

export interface CaptionSettings {
  style: CaptionStyle;
  fontSize: number;
  position: CaptionPosition;
  highlightColor: string;
}

export interface ClipLayoutSettings {
  aspectRatio: ClipAspectRatio;
  framing: ClipFraming;
}

export interface Clip {
  id: ID;
  projectId: ID;
  title: string;
  /** Quoted line from the transcript used as the card excerpt. */
  excerpt: string;
  /** IN point in seconds, relative to the source video. */
  inSec: number;
  /** OUT point in seconds, relative to the source video. */
  outSec: number;
  thumbnailUrl: string;
  tags: string[];
  score: ClipScore;
  captionText: string;
  captions: CaptionSettings;
  layout: ClipLayoutSettings;
  transcript: TranscriptSegment[];
}

export type ProcessingStepId =
  | "upload"
  | "transcribe"
  | "understand"
  | "moments"
  | "clips";

export type ProcessingStepStatus =
  | "waiting"
  | "processing"
  | "completed"
  | "failed";

export interface ProcessingStep {
  id: ProcessingStepId;
  status: ProcessingStepStatus;
  /** 0–100 for the individual step. */
  progress: number;
}

export interface ProcessingJob {
  id: ID;
  projectId: ID;
  status: "queued" | "running" | "completed" | "failed";
  /** 0–100 across the whole pipeline. */
  progress: number;
  steps: ProcessingStep[];
  message: string;
  startedAt: string;
  finishedAt?: string | undefined;
}

export interface UsageSummary {
  minutesUsed: number;
  minutesIncluded: number;
  periodLabel: string;
}

export interface NewProjectInput {
  file?: File | null | undefined;
  youtubeUrl?: string | undefined;
  language: string;
  clipLength: ClipLengthPreset;
  contentType: ContentType;
}
