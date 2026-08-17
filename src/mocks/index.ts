import clipSpeaker from "@/assets/clip-speaker.jpg";
import thumbDesign from "@/assets/thumb-design.jpg";
import thumbMarketing from "@/assets/thumb-marketing.jpg";
import thumbPodcast from "@/assets/thumb-podcast.jpg";
import { buildMockTranscript } from "@/mocks/transcript";
import type { Clip, Project, UsageSummary, User, VideoAsset } from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "Alex Moreira",
  email: "alex@studio.co",
  plan: "pro",
};

export const mockUsage: UsageSummary = {
  minutesUsed: 142,
  minutesIncluded: 300,
  periodLabel: "This month",
};

function video(partial: Omit<VideoAsset, "width" | "height" | "fps" | "source">): VideoAsset {
  return { width: 1920, height: 1080, fps: 24, source: "upload", ...partial };
}

const defaultCaptions = {
  style: "bold" as const,
  fontSize: 42,
  position: "bottom" as const,
  highlightColor: "signal",
};

const defaultLayout = {
  aspectRatio: "9:16" as const,
  framing: "auto" as const,
};

interface ClipSeed {
  title: string;
  excerpt: string;
  inSec: number;
  outSec: number;
  tags: string[];
  captionText: string;
  score: Clip["score"];
}

const clipSeeds: ClipSeed[] = [
  {
    title: "Why most designers stop growing",
    excerpt:
      "You eventually realize that getting better at software doesn't necessarily make you a better designer...",
    inSec: 872,
    outSec: 919,
    tags: ["Strong Hook", "Insight", "Career"],
    captionText: "THE BIGGEST MISTAKE\nDESIGNERS MAKE",
    score: { hook: 96, clarity: 92, retention: 91, emotion: 83, shareability: 94, overall: 94 },
  },
  {
    title: "The career advice nobody gives you",
    excerpt:
      "Everyone optimizes for the next title. Almost nobody optimizes for the next decade of decisions...",
    inSec: 2290,
    outSec: 2342,
    tags: ["Career", "Contrarian", "Advice"],
    captionText: "THE ADVICE NOBODY\nGIVES YOU",
    score: { hook: 93, clarity: 90, retention: 89, emotion: 86, shareability: 92, overall: 91 },
  },
  {
    title: "AI won't replace designers — this will",
    excerpt:
      "The risk was never the tool. The risk is being the person who only executes what's already decided...",
    inSec: 3763,
    outSec: 3811,
    tags: ["Hot Take", "Technology", "Debate"],
    captionText: "AI WON'T REPLACE\nDESIGNERS",
    score: { hook: 91, clarity: 88, retention: 84, emotion: 81, shareability: 90, overall: 87 },
  },
  {
    title: "How to know a project is worth doing",
    excerpt:
      "There's a simple filter: if it fails, will you still be glad you tried it? That answers most of it...",
    inSec: 1518,
    outSec: 1563,
    tags: ["Framework", "Insight"],
    captionText: "IS THIS PROJECT\nWORTH DOING?",
    score: { hook: 88, clarity: 91, retention: 82, emotion: 74, shareability: 84, overall: 85 },
  },
  {
    title: "The taste gap that holds people back",
    excerpt:
      "Your taste develops faster than your craft, and that gap is where most people quit too early...",
    inSec: 2740,
    outSec: 2794,
    tags: ["Story", "Emotion"],
    captionText: "THE TASTE GAP",
    score: { hook: 86, clarity: 84, retention: 85, emotion: 90, shareability: 79, overall: 84 },
  },
  {
    title: "Stop redesigning, start deciding",
    excerpt:
      "Every extra iteration felt productive, but we were just avoiding the one call we needed to make...",
    inSec: 4402,
    outSec: 4449,
    tags: ["Process", "Insight"],
    captionText: "STOP REDESIGNING",
    score: { hook: 84, clarity: 87, retention: 80, emotion: 72, shareability: 81, overall: 81 },
  },
  {
    title: "What great feedback actually sounds like",
    excerpt:
      "Good feedback never starts with an opinion. It starts with the intent of the thing being reviewed...",
    inSec: 5120,
    outSec: 5171,
    tags: ["Practical", "Teamwork"],
    captionText: "WHAT GOOD FEEDBACK\nSOUNDS LIKE",
    score: { hook: 80, clarity: 89, retention: 78, emotion: 70, shareability: 76, overall: 79 },
  },
  {
    title: "The one habit that compounds fastest",
    excerpt:
      "Write down the reasoning behind every decision. In a year, you'll have a map of how you think...",
    inSec: 5844,
    outSec: 5889,
    tags: ["Habit", "Conclusion"],
    captionText: "THE HABIT THAT\nCOMPOUNDS",
    score: { hook: 78, clarity: 86, retention: 77, emotion: 71, shareability: 74, overall: 77 },
  },
];

const designVideo = video({
  id: "video-1",
  fileName: "The Future of Design.mp4",
  durationSec: 6138, // 01:42:18
  thumbnailUrl: thumbDesign,
});

export const mockProjects: Project[] = [
  {
    id: "the-future-of-design",
    title: "The Future of Design",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    status: "completed",
    progress: 100,
    clipCount: 8,
    contentType: "podcast",
    language: "auto",
    clipLength: "auto",
    video: designVideo,
  },
  {
    id: "founders-podcast-042",
    title: "Founders Podcast #042",
    createdAt: new Date(Date.now() - 4 * 86_400_000).toISOString(),
    status: "completed",
    progress: 100,
    clipCount: 12,
    contentType: "interview",
    language: "auto",
    clipLength: "30-60",
    video: video({
      id: "video-2",
      fileName: "Founders Podcast 042.mov",
      durationSec: 8021, // 02:13:41
      thumbnailUrl: thumbPodcast,
    }),
  },
  {
    id: "marketing-masterclass",
    title: "Marketing Masterclass",
    createdAt: new Date().toISOString(),
    status: "processing",
    progress: 72,
    clipCount: 0,
    contentType: "educational",
    language: "auto",
    clipLength: "60-90",
    video: video({
      id: "video-3",
      fileName: "Marketing Masterclass.mp4",
      durationSec: 3503, // 58:23
      thumbnailUrl: thumbMarketing,
    }),
  },
];

export const mockClips: Clip[] = clipSeeds.map((seed, index) => ({
  id: `clip-${index + 1}`,
  projectId: mockProjects[0]!.id,
  title: seed.title,
  excerpt: seed.excerpt,
  inSec: seed.inSec,
  outSec: seed.outSec,
  thumbnailUrl: clipSpeaker,
  tags: seed.tags,
  score: seed.score,
  captionText: seed.captionText,
  captions: { ...defaultCaptions },
  layout: { ...defaultLayout },
  transcript: buildMockTranscript(seed.inSec),
}));
