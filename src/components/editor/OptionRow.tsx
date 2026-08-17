import type { ReactNode } from "react";

interface OptionRowProps {
  label: string;
  value?: string;
  children: ReactNode;
}

export function OptionRow({ label, value, children }: OptionRowProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="label-mono text-muted-foreground">{label}</span>
        {value ? (
          <span className="font-mono text-[0.7rem] tabular text-foreground">{value}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
