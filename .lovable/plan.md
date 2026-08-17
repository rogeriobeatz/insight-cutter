# INPOINT — v1 (UI + fluxo com mock data)

Plataforma de inteligência de vídeo que transforma conteúdo longo em cortes curtos. Esta versão é 100% front-end: nenhuma IA, FFmpeg, transcrição ou upload real. Só a experiência, a arquitetura visual e o fluxo completo navegável.

## Direção visual

- Dark mode como experiência principal: preto quase absoluto, grafite, cinza neutro, branco levemente quente.
- Destaque: signal orange usado com parcimônia (CTA, progresso, playhead, score alto, markers, seleção).
- Tipografia: Geist (UI) + fonte monoespaçada para timecodes, scores e dados técnicos. Timecode `00:14:32:08` como elemento de identidade.
- Wordmark tipográfico `INPOINT` (variação `[ IN ] POINT` em pontos discretos). Sem logo complexo.
- Muito espaço negativo, cantos discretos, bordas de 1px, hierarquia tipográfica forte. Sem gradientes chamativos, blobs, glassmorphism, ícones de cérebro ou estrelinhas de IA.

## App shell

Sidebar fixa à esquerda: INPOINT / Home / Projects / Clips / Templates; rodapé com Usage, Settings e avatar. TopBar contextual por página.

## Telas e fluxo

1. **Dashboard** (`/`) — "Good afternoon." + subtítulo, CTA `New project`, lista `Recent projects` (thumbnail, título, duração, nº de clips, data, status incluindo "Processing — 72%") e indicador de uso `142 / 300 minutes processed`. Sem gráficos corporativos.
2. **New project** (`/projects/new`) — dropzone grande ("Drop your video here", MP4/MOV/WEBM), input de link do YouTube, controles de Language, Clip length (Auto / 30–60 / 60–90), Content type (Podcast, Interview, Educational, Business, Other) e botão `Analyze video`.
3. **Processing** (`/projects/$projectId/processing`) — thumbnail, nome do arquivo, duração, pipeline em 5 etapas (Uploading, Transcribing, Understanding content, Finding key moments, Creating clips) com progresso simulado, percentual e microcopy rotativa ("Analyzing hooks...", etc.). Ao concluir, avança para Results.
4. **Results** (`/projects/$projectId`) — "8 moments found" + subtítulo com a duração analisada. Grid de clips: thumbnail 9:16, Virality Score grande, título gerado, trecho da transcrição, timestamp in→out, duração, tags e ações Preview / Edit / Download. Score ≥ 90 recebe tratamento sutil de destaque. Clicar no score abre popover com Hook, Clarity, Retention, Emotion, Shareability, Overall + explicação.
5. **Clip editor** (`/clips/$clipId`) — três regiões: preview vertical 9:16 com legenda estilizada sobreposta; timeline inferior com waveform simulada, segmento, playhead, in/out points e timecodes; painel direito com tabs Captions (Minimal/Bold/Karaoke, font size, position, highlight color), Layout (9:16 / 1:1 / 16:9, framing Auto/Center/Speaker) e Transcript (palavras + timestamps). Topo: Back, nome do clip, Save, Export.

Fluxo navegável: Dashboard → New project → Processing → Results → Editor.

## Responsividade

Desktop-first. Dashboard e listas se adaptam a tablet. O editor mostra aviso em telas pequenas indicando que a experiência completa é no desktop.

## Notas técnicas

- Estrutura: `src/types/` (User, Project, VideoAsset, Clip, ClipScore, TranscriptSegment, ProcessingJob), `src/mocks/` (dados separados da UI), `src/services/` (camada de acesso com assinaturas async prontas para Supabase), `src/hooks/` (ex.: `useProcessingSimulation`, `useClipEditorState`), `src/components/` divididos por domínio (app-shell, projects, clips, editor, ui).
- Componentes reutilizáveis: AppSidebar, TopBar, ProjectCard, UploadDropzone, ProcessingStep, ClipCard, ViralityScore, VideoPreview, Timeline, TranscriptPanel, CaptionControls, EmptyState, UsageIndicator.
- Rotas TanStack em `src/routes/` conforme lista acima; tokens de cor/tipografia definidos em `src/styles.css` (nenhuma cor hardcoded nos componentes); `head()` próprio por rota.
- Nenhuma regra de negócio dentro de componentes: formatação de timecode, cálculo de score e simulação de pipeline ficam em `src/lib/` e hooks. Sem backend, banco, pagamentos ou dependências extras além do que já existe.
