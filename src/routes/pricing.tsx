import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkle } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/shell/AppShell";
import { TopBar } from "@/components/shell/TopBar";
import { Button } from "@/components/ui/button";
import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Planos — INPOINT" },
      {
        name: "description",
        content:
          "Planos do INPOINT para clipadores: minutos de análise, cortes ilimitados e export sem marca d'água.",
      },
      { property: "og:title", content: "Planos — INPOINT" },
      {
        property: "og:description",
        content: "Escolha o plano do seu ritmo de produção de cortes.",
      },
    ],
  }),
  component: PricingPage,
});

interface Feature {
  key: TranslationKey;
  vars?: Record<string, string | number>;
  muted?: boolean;
}

interface Plan {
  id: "free" | "creator" | "pro" | "studio";
  nameKey: TranslationKey;
  taglineKey: TranslationKey;
  priceBRL: number;
  highlight?: boolean;
  features: Feature[];
}

const PLANS: Plan[] = [
  {
    id: "free",
    nameKey: "pricing.free",
    taglineKey: "pricing.free.tagline",
    priceBRL: 0,
    features: [
      { key: "pricing.feature.minutes", vars: { minutes: 30 } },
      { key: "pricing.feature.clips", vars: { clips: 3 } },
      { key: "pricing.feature.watermarkOn", muted: true },
      { key: "pricing.feature.hd" },
    ],
  },
  {
    id: "creator",
    nameKey: "pricing.creator",
    taglineKey: "pricing.creator.tagline",
    priceBRL: 79,
    highlight: true,
    features: [
      { key: "pricing.feature.minutes", vars: { minutes: 600 } },
      { key: "pricing.feature.clips", vars: { clips: 15 } },
      { key: "pricing.feature.watermark" },
      { key: "pricing.feature.captions" },
      { key: "pricing.feature.split" },
      { key: "pricing.feature.hd" },
    ],
  },
  {
    id: "pro",
    nameKey: "pricing.pro",
    taglineKey: "pricing.pro.tagline",
    priceBRL: 179,
    features: [
      { key: "pricing.feature.minutes", vars: { minutes: 1800 } },
      { key: "pricing.feature.clips", vars: { clips: 30 } },
      { key: "pricing.feature.watermark" },
      { key: "pricing.feature.batch" },
      { key: "pricing.feature.priority" },
      { key: "pricing.feature.4k" },
    ],
  },
  {
    id: "studio",
    nameKey: "pricing.studio",
    taglineKey: "pricing.studio.tagline",
    priceBRL: 449,
    features: [
      { key: "pricing.feature.minutes", vars: { minutes: 5000 } },
      { key: "pricing.feature.clips", vars: { clips: 60 } },
      { key: "pricing.feature.seats", vars: { seats: 5 } },
      { key: "pricing.feature.priority" },
      { key: "pricing.feature.4k" },
      { key: "pricing.feature.batch" },
    ],
  },
];

const FAQ: Array<{ q: TranslationKey; a: TranslationKey }> = [
  { q: "pricing.faq.q1", a: "pricing.faq.a1" },
  { q: "pricing.faq.q2", a: "pricing.faq.a2" },
  { q: "pricing.faq.q3", a: "pricing.faq.a3" },
];

function PricingPage() {
  const t = useT();

  return (
    <AppShell>
      <TopBar eyebrow={t("common.account")} title={t("nav.pricing")} />

      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <header className="max-w-2xl">
          <p className="label-mono text-signal">{t("pricing.eyebrow")}</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {t("pricing.title")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </header>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col border bg-card p-6",
                plan.highlight ? "border-signal/40" : "border-border",
              )}
            >
              {plan.highlight ? (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 bg-signal px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-signal-foreground">
                  <Sparkle className="h-3 w-3" />
                  {t("pricing.mostPopular")}
                </span>
              ) : null}

              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                {t(plan.nameKey)}
              </h2>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-mono text-3xl tabular text-foreground">
                  {plan.priceBRL === 0 ? "R$0" : `R$${plan.priceBRL}`}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {t("pricing.perMonth")}
                </span>
              </p>
              <p className="mt-3 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground">
                {t(plan.taglineKey)}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature.key} className="flex gap-2.5 text-xs leading-relaxed">
                    <Check
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        feature.muted ? "text-border-strong" : "text-signal",
                      )}
                    />
                    <span className={feature.muted ? "text-muted-foreground" : "text-foreground"}>
                      {t(feature.key, feature.vars)}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "signal" : "outline"}
                size="sm"
                className="mt-8 w-full"
                onClick={() => toast(t("pricing.soon"))}
              >
                {plan.priceBRL === 0
                  ? t("pricing.ctaFree")
                  : t("pricing.cta", { plan: t(plan.nameKey) })}
              </Button>
            </article>
          ))}
        </div>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="label-mono text-muted-foreground">{t("pricing.faq")}</h2>
          <dl className="mt-6 grid gap-8 md:grid-cols-3">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-medium text-foreground">{t(item.q)}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(item.a)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
