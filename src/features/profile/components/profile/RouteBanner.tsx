import {
  ArrowRight,
  MapPin,
} from "lucide-react";

interface RouteBannerProps {
  from: string;
  to: string;
}

export function RouteBanner({
  from,
  to,
}: RouteBannerProps) {
  if (!from && !to) {
    return null;
  }

  return (
    <div className="mt-4 flex w-fit items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-foreground">
      <MapPin
        size={13}
        className="shrink-0 text-muted-foreground"
      />

      <span>{from || "—"}</span>

      <ArrowRight
        size={13}
        className="shrink-0 text-accent"
      />

      <MapPin
        size={13}
        className="shrink-0 text-accent"
      />

      <span>{to || "—"}</span>
    </div>
  );
}