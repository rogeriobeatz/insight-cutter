import { Globe } from "lucide-react";

import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  collapsed?: boolean;
  className?: string;
}

export function LanguageSwitcher({ collapsed = false, className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  if (collapsed) {
    return (
      <button
        type="button"
        title={t("nav.language")}
        aria-label={t("nav.language")}
        onClick={() => {
          const next = LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length]!;
          setLocale(next);
        }}
        className={cn(
          "mx-auto flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground",
          className,
        )}
      >
        <Globe className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className={cn("px-2", className)}>
      <span className="mb-1.5 flex items-center gap-2 px-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
        <Globe className="h-3 w-3" />
        {t("nav.language")}
      </span>
      <div className="grid grid-cols-3 gap-1">
        {LOCALES.map((item) => (
          <button
            key={item}
            type="button"
            title={LOCALE_LABELS[item]}
            onClick={() => setLocale(item)}
            className={cn(
              "rounded-sm border px-1 py-1 font-mono text-[0.65rem] transition-colors",
              locale === item
                ? "border-signal/50 bg-signal-muted text-foreground"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {LOCALE_SHORT[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
