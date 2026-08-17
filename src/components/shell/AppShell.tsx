import { useState, type ReactNode } from "react";

import { AppSidebar } from "@/components/shell/AppSidebar";
import { mockUser } from "@/mocks";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  /** The editor uses the full viewport height with its own internal scrolling. */
  fullHeight?: boolean;
}

export function AppShell({ children, fullHeight = false }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar
        user={mockUser}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          fullHeight ? "overflow-hidden" : "overflow-y-auto",
        )}
      >
        {children}
      </div>
    </div>
  );
}
