import { ImageIcon } from "lucide-react";

interface EmptyImageStateProps {
  label: string;        // message to display
  className?: string;   // optional styling
}

export function EmptyImageState({ label, className }: EmptyImageStateProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${className ?? ""}`}>
      <div className="p-3 rounded-full bg-border">
        <ImageIcon size={20} className="text-muted-foreground" />
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
