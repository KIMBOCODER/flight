import React from "react";

interface SectionProps {
  title: string;
  done?: boolean;
  children: React.ReactNode;
}

export function Section({
  title,
  done = false,
  children,
}: SectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
        <h2 className="flex-1 text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>

        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            done
              ? "bg-green-500"
              : "bg-border"
          }`}
        />
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}