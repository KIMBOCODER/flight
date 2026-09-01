import { ImageIcon } from "lucide-react";

interface EmptyImageStateProps {
  label: string;
}

export function EmptyImageState({
  label,
}: EmptyImageStateProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted">
      <div className="rounded-full bg-border p-3">
        <ImageIcon
          size={22}
          className="text-muted-foreground"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}