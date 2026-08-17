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
  periodLabel: "Este mês",
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
    title: "Por que a maioria dos criadores para de crescer",
    excerpt:
      "Uma hora você percebe que dominar a ferramenta não te torna um criador melhor...",
    inSec: 872,
    outSec: 919,
    tags: ["Gancho forte", "Insight", "Carreira"],
    captionText: "O MAIOR ERRO\nDE QUEM CRIA",
    score: { hook: 96, clarity: 92, retention: 91, emotion: 83, shareability: 94, overall: 94 },
  },
  {
    title: "O conselho de carreira que ninguém te dá",
    excerpt:
      "Todo mundo otimiza para o próximo cargo. Quase ninguém otimiza para a próxima década de decisões...",
    inSec: 2290,
    outSec: 2342,
    tags: ["Carreira", "Polêmico", "Conselho"],
    captionText: "O CONSELHO QUE\nNINGUÉM TE DÁ",
    score: { hook: 93, clarity: 90, retention: 89, emotion: 86, shareability: 92, overall: 91 },
  },
  {
    title: "A IA não vai te substituir — isso vai",
    excerpt:
      "O risco nunca foi a ferramenta. O risco é ser quem só executa o que já foi decidido...",
    inSec: 3763,
    outSec: 3811,
    tags: ["Polêmica", "Tecnologia", "Debate"],
    captionText: "A IA NÃO VAI\nTE SUBSTITUIR",
    score: { hook: 91, clarity: 88, retention: 84, emotion: 81, shareability: 90, overall: 87 },
  },
  {
    title: "Como saber se um projeto vale a pena",
    excerpt:
      "Tem um filtro simples: se der errado, você ainda vai estar feliz por ter tentado? Isso responde quase tudo...",
    inSec: 1518,
    outSec: 1563,
    tags: ["Framework", "Insight"],
    captionText: "ESSE PROJETO\nVALE A PENA?",
    score: { hook: 88, clarity: 91, retention: 82, emotion: 74, shareability: 84, overall: 85 },
  },
  {
    title: "O abismo de repertório que trava você",
    excerpt:
      "Seu repertório cresce mais rápido que sua técnica, e é nesse abismo que a maioria desiste cedo...",
    inSec: 2740,
    outSec: 2794,
    tags: ["História", "Emoção"],
    captionText: "O ABISMO DE\nREPERTÓRIO",
    score: { hook: 86, clarity: 84, retention: 85, emotion: 90, shareability: 79, overall: 84 },
  },
  {
    title: "Pare de refazer, comece a decidir",
    excerpt:
      "Cada versão extra parecia produtiva, mas a gente só estava fugindo da decisão que precisava tomar...",
    inSec: 4402,
    outSec: 4449,
    tags: ["Processo", "Insight"],
    captionText: "PARE DE REFAZER",
    score: { hook: 84, clarity: 87, retention: 80, emotion: 72, shareability: 81, overall: 81 },
  },
  {
    title: "Como soa um feedback de verdade",
    excerpt:
      "Feedback bom nunca começa com opinião. Começa com a intenção do que está sendo revisado...",
    inSec: 5120,
    outSec: 5171,
    tags: ["Prático", "Time"],
    captionText: "COMO SOA UM\nFEEDBACK BOM",
    score: { hook: 80, clarity: 89, retention: 78, emotion: 70, shareability: 76, overall: 79 },
  },
  {
    title: "O hábito que rende juros mais rápido",
    excerpt:
      "Escreva o raciocínio por trás de cada decisão. Em um ano você terá um mapa de como pensa...",
    inSec: 5844,
    outSec: 5889,
    tags: ["Hábito", "Conclusão"],
    captionText: "O HÁBITO QUE\nRENDE JUROS",
    score: { hook: 78, clarity: 86, retention: 77, emotion: 71, shareability: 74, overall: 77 },
  },
];

const designVideo = video({
  id: "video-1",
  fileName: "O Futuro da Criacao.mp4",
  durationSec: 6138, // 01:42:18
  thumbnailUrl: thumbDesign,
});

export const mockProjects: Project[] = [
  {
    id: "o-futuro-da-criacao",
    title: "O Futuro da Criação",
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
    title: "Podcast dos Fundadores #042",
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
    title: "Masterclass de Marketing",
    createdAt: new Date().toISOString(),
    status: "processing",
    progress: 72,
    clipCount: 0,
    contentType: "educational",
    language: "auto",
    clipLength: "60-90",
    video: video({
      id: "video-3",
      fileName: "Masterclass de Marketing.mp4",
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
