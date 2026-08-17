import { Link, useRouterState } from "@tanstack/react-router";
import {
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
import { cn } from "@/lib/utils";
import type { User } from "@/types";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const primaryNav: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Projects", to: "/projects", icon: SquarePlay },
  { label: "Clips", to: "/clips", icon: Scissors },
  { label: "Templates", to: "/templates", icon: LayoutTemplate },
];

const secondaryNav: NavItem[] = [
  { label: "Usage", to: "/usage", icon: Gauge },
  { label: "Settings", to: "/settings", icon: Settings },
];

interface AppSidebarProps {
  user: User;
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ user, collapsed, onToggle }: AppSidebarProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

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
        <Link to="/" className="flex items-center" aria-label="INPOINT home">
          {collapsed ? <Wordmark compact /> : <Wordmark variant="bracket" />}
        </Link>
        {!collapsed ? (
          <button
            type="button"
            onClick={onToggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Collapse sidebar"
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
          aria-label="Expand sidebar"
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
  return (
    <Link
      to={item.to}
      title={collapsed ? item.label : undefined}
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
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </Link>
  );
}
