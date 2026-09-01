interface InfoCardProps {
  label: string;
  value?: string;
}

export function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-3.5">
      <p className="mb-0.5 text-xs text-muted-foreground">
        {label}
      </p>

      <p className="text-sm font-medium text-foreground">
        {value || "—"}
      </p>
    </div>
  );
}