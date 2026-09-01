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
  return (
    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
      <MapPin size={13} />

      <span>{from || "Origin"}</span>

      <ArrowRight size={13} />

      <span>{to || "Destination"}</span>
    </div>
  );
}