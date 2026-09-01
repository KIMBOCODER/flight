import {
  Anchor,
  Bus,
  Car,
  Plane,
  TrainFront,
} from "lucide-react";

import type { TransportMode } from "@/features/booking/types/transport.types";

interface TransportTagsProps {
  modes: TransportMode[];
}

const icons: Record<
  TransportMode,
  React.ReactNode
> = {
  Car: <Car size={14} />,
  Train: <TrainFront size={14} />,
  Air: <Plane size={14} />,
  Bus: <Bus size={14} />,
  Boat: <Anchor size={14} />,
};

export function TransportTags({
  modes,
}: TransportTagsProps) {
  if (!modes.length) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {modes.map((mode) => (
        <span
          key={mode}
          className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground"
        >
          {icons[mode]}
          {mode}
        </span>
      ))}
    </div>
  );
}