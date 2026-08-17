import { Link, useRouterState } from "@tanstack/react-router";
import {
  CreditCard,
  Gauge,
  Home,
  LayoutTemplate,
  PanelLeftClose,
  PanelLeftOpen,
  Scissors,
  Settings,
  SquarePlay,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Wordmark } from "@/components/brand/Wordmark";
import { LanguageSwitcher } from "@/components/shell/LanguageSwitcher";
import { useT, type TranslationKey } from "@/i18n";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface NavItem {
  labelKey: TranslationKey;
  to: string;
  icon: LucideIcon;
}

const primaryNav: NavItem[] = [
  { labelKey: "nav.home", to: "/", icon: Home },
  { labelKey: "nav.projects", to: "/projects", icon: SquarePlay },
  { labelKey: "nav.clips", to: "/clips", icon: Scissors },
  { labelKey: "nav.templates", to: "/templates", icon: LayoutTemplate },
];

const secondaryNav: NavItem[] = [
  { labelKey: "nav.pricing", to: "/pricing", icon: CreditCard },
  { labelKey: "nav.usage", to: "/usage", icon: Gauge },
  { labelKey: "nav.settings", to: "/settings", icon: Settings },
];

interface AppSidebarProps {
  user: User;
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ user, collapsed, onToggle }: AppSidebarProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const t = useT();

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-[64px]" : "w-[228px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border",
          collapsed ? "justify-center px-2" : "justify-between px-5",
        )}
      >
        <Link to="/" className="flex items-center" aria-label={t("nav.homeAria")}>
          {collapsed ? <Wordmark compact /> : <Wordmark variant="bracket" />}
        </Link>
        {!collapsed ? (
          <button
            type="button"
            onClick={onToggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("nav.collapse")}
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {collapsed ? (
        <button
          type="button"
          onClick={onToggle}
          className="mx-auto mt-3 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={t("nav.expand")}
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      ) : null}

      <nav className="mt-4 flex flex-1 flex-col gap-0.5 px-2">
        {primaryNav.map((item) => (
          <SidebarLink key={item.to} item={item} active={isActive(item.to)} collapsed={collapsed} />
        ))}
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-border px-2 py-3">
        {secondaryNav.map((item) => (
          <SidebarLink key={item.to} item={item} active={isActive(item.to)} collapsed={collapsed} />
        ))}

        <div className="mt-3 border-t border-border pt-3">
          <LanguageSwitcher collapsed={collapsed} />
        </div>

        <div
          className={cn(
            "mt-2 flex items-center gap-3 rounded-sm px-2 py-2",
            collapsed && "justify-center px-0",
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-elevated font-mono text-[0.7rem] text-foreground">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          {!collapsed ? (
            <span className="min-w-0">
              <span className="block truncate text-xs text-foreground">{user.name}</span>
              <span className="block truncate font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                {user.plan}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const t = useT();
  const label = t(item.labelKey);

  return (
    <Link
      to={item.to}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-elevated text-foreground"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-signal" />
      ) : null}
      <item.icon className="h-4 w-4 shrink-0" />
      {!collapsed ? <span className="truncate">{label}</span> : null}
    </Link>
  );
}
