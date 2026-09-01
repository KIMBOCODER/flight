interface InfoCardProps {
  label: string;
  value: string;
}

export function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="border border-border rounded-xl p-3 bg-background">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="text-sm font-medium">
        {value || "—"}
      </p>
    </div>
  );
}