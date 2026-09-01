import {
  Car,
  TrainFront,
  Plane,
  Bus,
  Anchor,
} from "lucide-react";

import { TRANSPORT_MODES } from "../../data/transpotModes";
import { TransportMode } from "../../types/transport.types";

const icons = {
  Car: <Car size={14} />,
  Train: <TrainFront size={14} />,
  Air: <Plane size={14} />,
  Bus: <Bus size={14} />,
  Boat: <Anchor size={14} />,
};

interface Props {
  selectedModes: TransportMode[];
  onToggle: (mode: TransportMode) => void;
}

export function TransportModeSelector({
  selectedModes,
  onToggle,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRANSPORT_MODES.map((mode) => {
        const active = selectedModes.includes(mode);

        return (
          <button
            key={mode}
            type="button"
            onClick={() => onToggle(mode)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition
              ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }
            `}
          >
            {icons[mode]}
            {mode}
          </button>
        );
      })}
    </div>
  );
}