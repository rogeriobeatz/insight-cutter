/**
 * Data access layer.
 *
 * Every function is async and returns the shape the UI needs, so swapping the
 * mock source for Supabase (or a worker API) later only touches this file.
 */
import { mockClips, mockProjects, mockUsage, mockUser } from "@/mocks";
import type {
  Clip,
  NewProjectInput,
  Project,
  UsageSummary,
  User,
} from "@/types";

/** Session-scoped store so newly created projects survive navigation. */
const runtimeProjects: Project[] = [...mockProjects];

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCurrentUser(): Promise<User> {
  await delay(0);
  return mockUser;
}

export async function getUsage(): Promise<UsageSummary> {
  await delay(0);
  return mockUsage;
}

export async function listProjects(): Promise<Project[]> {
  await delay();
  return [...runtimeProjects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getProject(projectId: string): Promise<Project | undefined> {
  await delay();
  return runtimeProjects.find((project) => project.id === projectId);
}

export async function listClips(projectId?: string): Promise<Clip[]> {
  await delay();
  // Mock data only carries clips for the reference project; other completed
  // projects reuse the same set so the flow stays navigable.
  if (!projectId) return mockClips;
  return mockClips.map((clip) => ({ ...clip, projectId }));
}

export async function getClip(clipId: string): Promise<Clip | undefined> {
  await delay();
  return mockClips.find((clip) => clip.id === clipId);
}

export async function createProject(input: NewProjectInput): Promise<Project> {
  await delay(220);
  const reference = mockProjects[0]!;
  const title = input.file?.name?.replace(/\.[^.]+$/, "") ?? deriveTitle(input.youtubeUrl);
  const project: Project = {
    ...reference,
    id: `project-${Date.now()}`,
    title,
    createdAt: new Date().toISOString(),
    status: "processing",
    progress: 0,
    clipCount: 0,
    contentType: input.contentType,
    language: input.language,
    clipLength: input.clipLength,
    video: {
      ...reference.video,
      id: `video-${Date.now()}`,
      fileName: input.file?.name ?? `${title}.mp4`,
      source: input.file ? "upload" : "youtube",
      sourceUrl: input.youtubeUrl,
    },
  };
  runtimeProjects.unshift(project);
  return project;
}

/** Marks a simulated job as done so Results can render. */
export async function completeProject(projectId: string, clipCount: number): Promise<void> {
  const project = runtimeProjects.find((item) => item.id === projectId);
  if (!project) return;
  project.status = "completed";
  project.progress = 100;
  project.clipCount = clipCount;
}

function deriveTitle(url?: string): string {
  if (!url) return "Untitled project";
  return "YouTube import";
}
