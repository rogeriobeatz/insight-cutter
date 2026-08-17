# Moment Maker Pro

Crie a primeira versão de um SaaS chamado INPOINT, uma plataforma de inteligência e edição de vídeo que transforma vídeos longos — podcasts, entrevistas, aulas, vídeos institucionais e conteúdos para YouTube — em cortes curtos otimizados para Reels, TikTok e YouTube Shorts.

Importante

Neste primeiro momento, NÃO tente implementar processamento real de vídeo, FFmpeg, transcrição ou APIs de inteligência artificial.

Quero primeiro construir uma interface extremamente bem resolvida, a arquitetura visual do produto e todo o fluxo principal utilizando mock data.

O código deve ser limpo, modular e preparado para posteriormente ser conectado a backend, APIs e workers externos.

O projeto será posteriormente sincronizado com GitHub e continuará sendo desenvolvido fora do Lovable, portanto:

use componentes reutilizáveis;

evite código monolítico;

evite dependências desnecessárias;

utilize TypeScript;

organize componentes, páginas, hooks, services e types;

não coloque regras de negócio complexas diretamente nos componentes;

prepare a estrutura para integração futura com Supabase;

prepare interfaces/types para Project, Video, Clip, Transcript e ProcessingJob.

PRODUTO

O INPOINT recebe vídeos longos e utiliza inteligência artificial para encontrar automaticamente os melhores momentos daquele conteúdo.

O conceito central é:

Find the moment. Make the cut.

Fluxo futuro:

Upload do vídeo
→ Transcrição
→ Análise semântica
→ Identificação dos melhores momentos
→ Virality Score
→ Geração dos cortes
→ Reframe vertical
→ Legendas
→ Edição
→ Renderização

Nesta primeira versão, simule esse processo.

DIREÇÃO VISUAL

Quero uma aplicação premium, minimalista, madura e extremamente bem desenhada.

Referências conceituais:

Linear

Raycast

Arc

Notion

Vercel

interfaces profissionais de edição como Premiere e DaVinci, mas muito mais simples

produtos SaaS contemporâneos de alto nível

NÃO quero:

estética genérica de startup de IA;

excesso de gradientes;

blobs coloridos;

cards gigantes desnecessários;

glassmorphism exagerado;

ilustrações 3D genéricas;

ícones de cérebro;

estrelinhas de IA espalhadas pela interface;

interface infantil;

excesso de arredondamento.

A interface deve parecer uma ferramenta profissional.

Use bastante espaço negativo, hierarquia tipográfica forte e informações bem organizadas.

Paleta

Dark mode como experiência principal.

Base:

preto quase absoluto;

grafite;

cinza neutro;

branco levemente quente.

Cor de destaque:

signal orange / red-orange vibrante.

Utilizar a cor de destaque com moderação para:

CTA;

progresso;

playhead;

score alto;

markers;

seleção.

Tipografia

Utilize uma fonte sans-serif moderna como Geist ou Inter.

Números, timestamps e dados técnicos podem utilizar uma fonte monoespaçada.

Timecodes devem fazer parte da identidade visual.

Exemplo:

00:14:32:08

IDENTIDADE DO PRODUTO

Nome:

INPOINT

Wordmark simples.

Não crie ainda um logotipo complexo.

Utilize inicialmente apenas uma assinatura tipográfica:

INPOINT

Podemos explorar ocasionalmente elementos como:

IN/POINT

ou

[ IN ] POINT

A linguagem visual do produto deve se inspirar em elementos de edição:

IN point;

OUT point;

timecode;

playhead;

timeline;

markers;

crop guides;

selection brackets;

waveform.

APP SHELL

Crie uma aplicação desktop-first.

Sidebar vertical à esquerda.

Itens:

INPOINT

Home

Projects

Clips

Templates

parte inferior:

Usage

Settings

avatar do usuário

TELA 1 — DASHBOARD

Título:

Good afternoon.

Subtítulo:

Turn your long-form content into moments worth watching.

CTA principal:

New project

Mostrar uma área chamada:

Recent projects

Cada projeto deve exibir:

thumbnail;

título;

duração original;

quantidade de clips encontrados;

data;

status.

Exemplos:

The Future of Design
01:42:18
8 clips
Completed

Founders Podcast #042
02:13:41
12 clips
Completed

Marketing Masterclass
58:23
Processing — 72%

Adicionar uma visualização elegante de uso mensal:

142 / 300 minutes processed

Não transforme o dashboard em um dashboard corporativo cheio de gráficos.

Ele deve ser extremamente simples.

TELA 2 — NEW PROJECT

Ao clicar em New Project, abrir uma página limpa.

Título:

Create a new project

Área grande de upload.

Texto:

Drop your video here

MP4, MOV or WEBM

or

Paste a YouTube link

Criar um input para URL.

Abaixo, configurações simples:

Language

Auto-detect

Clip length

Auto
30–60 sec
60–90 sec

Content type

Podcast
Interview
Educational
Business
Other

Botão:

Analyze video

TELA 3 — PROCESSING

Depois do upload, simular processamento.

Título do projeto.

Thumbnail.

Nome:

The Future of Design.mp4

Duração:

01:42:18

Criar uma experiência visual bonita mostrando o pipeline.

Etapas:

Uploading
Completed

Transcribing
Completed

Understanding content
Completed

Finding key moments
Processing

Creating clips
Waiting

Utilizar animações extremamente sutis.

Mostrar:

72%

e:

Finding the strongest moments in your video...

Também utilizar pequenos textos que mudem simulando análise:

Analyzing hooks...

Identifying self-contained stories...

Scoring audience retention potential...

Finding strong conclusions...

TELA 4 — RESULTS

Esta é uma das telas mais importantes.

Título:

8 moments found

Subtítulo:

We analyzed 01:42:18 of content and selected the moments with the highest potential.

Criar uma lista/grid de clips.

Cada clip deve possuir:

thumbnail vertical 9:16;

Virality Score grande;

título criado pela IA;

trecho da transcrição;

timestamp original;

duração;

tags.

Exemplo:

94

WHY MOST DESIGNERS STOP GROWING

“You eventually realize that getting better at software doesn't necessarily make you a better designer...”

00:14:32 → 00:15:19

00:47

Tags:

Strong Hook
Insight
Career

Segundo exemplo:

91

THE CAREER ADVICE NOBODY GIVES YOU

00:38:10 → 00:39:02

00:52

Terceiro:

87

AI WON'T REPLACE DESIGNERS — THIS WILL

01:02:43 → 01:03:31

00:48

Scores acima de 90 podem receber algum tratamento visual especial, mas NÃO utilizar gamificação exagerada.

Botões:

Preview

Edit

Download

VIRALITY SCORE

Ao clicar no score, abrir pequeno popover mostrando:

Hook — 96

Clarity — 92

Retention — 91

Emotion — 83

Shareability — 94

Overall — 94

Explique:

“INPOINT scores each moment based on how effectively it can work as standalone short-form content.”

TELA 5 — CLIP EDITOR

Criar uma interface simplificada de edição.

Layout em três regiões.

Centro

Preview vertical 9:16 do vídeo.

Simular pessoa falando em um podcast usando placeholder sofisticado.

Adicionar legenda sobre o vídeo:

THE BIGGEST MISTAKE
DESIGNERS MAKE

Legenda deve parecer estilizada para social media.

Parte inferior

Timeline simples.

Mostrar:

waveform simulada;

segmento do vídeo;

playhead;

in point;

out point;

timestamps.

Não tente construir ainda um editor de vídeo profissional.

É apenas uma representação funcional da experiência.

Painel direito

Tabs:

Captions

Layout

Transcript

Captions

Styles:

Minimal
Bold
Karaoke

Font size

Position

Highlight color

Layout

Format:

9:16

1:1

16:9

Framing:

Auto

Center

Speaker

Transcript

Mostrar transcrição com palavras/timestamps.

O usuário poderá futuramente selecionar texto para alterar o corte.

No topo:

Back

nome do clip

Save

Export

INTERAÇÕES

Faça todas as telas navegáveis.

Use mock data.

Quando clicar em:

New Project

→ abrir upload.

Analyze video

→ abrir processing.

Depois permita avançar para results.

Edit

→ abrir editor.

Os estados devem funcionar visualmente mesmo sem backend real.

COMPONENTES

Crie componentes reutilizáveis como:

AppSidebar

TopBar

ProjectCard

UploadDropzone

ProcessingStep

ClipCard

ViralityScore

VideoPreview

Timeline

TranscriptPanel

CaptionControls

EmptyState

UsageIndicator

TIPOS DE DADOS

Prepare TypeScript interfaces aproximadamente assim:

User

Project

VideoAsset

Clip

ClipScore

TranscriptSegment

ProcessingJob

Não implemente banco de dados ainda.

Crie mock data separado da interface.

RESPONSIVIDADE

O foco inicial é desktop.

O dashboard e listas podem ser responsivos para tablet.

O editor pode exibir aviso em telas muito pequenas indicando que a experiência completa é melhor em desktop.

EXPERIÊNCIA

O objetivo é que alguém entre no produto e entenda imediatamente:

envie um vídeo;

a IA encontra os momentos;

escolha um corte;

edite;

exporte.

A interface deve transmitir:

velocidade;

inteligência;

precisão;

controle;

qualidade profissional.

Evite textos exagerados sobre inteligência artificial.

A IA deve parecer parte natural do produto, não um gimmick.

IMPORTANTE SOBRE IMPLEMENTAÇÃO

Nesta etapa:

NÃO implementar pagamentos.

NÃO implementar processamento real de vídeo.

NÃO implementar FFmpeg.

NÃO implementar APIs de IA.

NÃO implementar upload real de arquivos grandes.

NÃO construir backend complexo.

NÃO inventar funcionalidades além das descritas.

Crie primeiro a experiência visual e o fluxo utilizando mock data.

Priorize qualidade de UI/UX e arquitetura limpa.

Ao terminar, quero conseguir navegar pelo fluxo completo:

Dashboard
→ New Project
→ Upload
→ Processing
→ Results
→ Clip Editor

Construa essa primeira versão agora.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://insight-cutter.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b7f65682-2e67-47e1-b5e4-ecbf77be04a3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
