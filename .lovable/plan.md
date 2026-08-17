# INPOINT — do protótipo à plataforma vendável

Objetivo: transformar o protótipo atual (mock data) em produto real, em português com suporte multilíngue, focado em clipadores, com pipeline de IA de verdade, editor viral e venda de planos.

## Fase 1 — Idioma e prioridade YouTube (rápido)

- i18n leve próprio (`src/i18n/`): dicionários `pt-BR` (padrão), `en`, `es`; hook `useT()`, seletor no header/Settings, preferência salva no perfil e em localStorage (lido só após hidratação).
- Todos os textos das telas atuais passam para as chaves de tradução.
- Novo projeto: campo de link do YouTube passa a ser o herói (input grande, colar e analisar). Upload de arquivo vira ação secundária ("enviar arquivo" em um link discreto que revela o dropzone).

## Fase 2 — Contas e dados reais

- Autenticação (e-mail/senha + Google), tela `/auth`, rotas privadas.
- Banco: `profiles`, `plans`, `subscriptions`, `projects`, `videos`, `clips`, `clip_renders`, `transcripts`, `usage_ledger`, `templates`, `user_roles` (RLS por usuário; papéis em tabela separada).
- Camada de serviço atual (`src/services/inpoint.service.ts`) troca mock por Supabase mantendo a mesma assinatura.

## Fase 3 — Motor de inteligência (o coração)

Fluxo assíncrono por job, com estados persistidos e progresso em tempo real:

```text
link/upload → ingestão → transcrição (palavra a palavra)
→ análise semântica (IA) → detecção de momentos virais
→ score + corte sugerido (IN/OUT) → clipes prontos para editar
```

- Ingestão: worker externo (fora do runtime web) baixa/normaliza o vídeo e grava no Storage; o app só cria e acompanha o job.
- Transcrição com timestamps por palavra (base das legendas karaokê).
- Análise via IA (Lovable AI Gateway) em janelas do transcript: identifica gancho, tensão, virada, conclusão e frases "citáveis"; retorna JSON validado com Zod.
- Score de viralidade explicável: gancho, clareza, retenção, emoção, compartilhabilidade + nota geral, com justificativa em uma frase.
- Conteúdo misto (MrBeast): também usa sinais de ritmo — picos de energia do áudio, densidade de cortes, mudanças de cena — e não só o texto.
- Saída por clipe: título, hook, IN/OUT, tags, legenda pronta para postar e hashtags.

## Fase 4 — Editor viral

- Legendas: presets vibrantes (Karaokê palavra-a-palavra, Bold Impact, Neon Pop, Hormozi, Minimal), tamanho, posição, cor de destaque, contorno, sombra, emojis automáticos, animação de entrada por palavra.
- Layouts virais: tela cheia, split 50/50 com vídeo em loop (gameplay, culinária, satisfying), split com imagem, moldura com blur, retrato + b-roll, zoom rítmico nos picos de fala.
- Biblioteca de fundos/loops (Storage) + upload do próprio loop.
- Extras: broll automático em palavras-chave, progress bar, marca d'água/@handle, hook de texto nos 3 primeiros segundos, música de fundo com ducking.
- Templates salváveis e reaplicáveis em lote a todos os clipes de um projeto.
- Exportação real (worker de render): MP4 9:16/1:1/16:9, fila de render com status e download; legendas queimadas + SRT opcional.

## Fase 5 — Monetização

- Planos: Free (teste curto, com marca d'água), Creator, Pro, Studio — cobrados por minutos de vídeo analisados/mês + limites de render e resolução.
- Checkout, upgrade/downgrade, cancelamento e portal do cliente; webhook atualiza `subscriptions`.
- Medidor de uso real (`usage_ledger`) com bloqueio ao atingir o limite e CTA de upgrade; página `/usage` mostra consumo e histórico.
- Landing pública em português com preços, provas e CTA.

## Fase 6 — Acabamento

- Onboarding, estados vazios, erros e falhas de job com retry.
- Notificações (e-mail/toast) quando a análise termina.
- SEO/metadados por rota, responsivo mobile, analytics de funil.

## Detalhes técnicos

- Toda lógica de servidor em `createServerFn` (TanStack Start); webhooks e callbacks do worker em `src/routes/api/public/*` com verificação de assinatura.
- Processamento de vídeo (FFmpeg/render) roda em worker externo — o runtime serverless não suporta binários nativos; o app orquestra por job + webhook.
- IA via Lovable AI Gateway com saída estruturada validada por Zod e tratamento de 402/429.
- Uploads grandes direto para o Storage com URL assinada; nunca pelo servidor do app.

## Decisões que preciso de você

1. Provedor de pagamento: Stripe ou Paddle (Paddle resolve imposto internacional; Stripe é mais flexível no Brasil/Pix via parceiro).
2. Preços dos planos (valores e limites de minutos) — posso sugerir uma tabela inicial.
3. Começo já pela Fase 1 (português + YouTube em destaque) e sigo em sequência, ou prefere priorizar outra fase primeiro?
