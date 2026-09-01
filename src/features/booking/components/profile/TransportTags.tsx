import {
  TRANSPORT_ICONS,
} from "../../data/transpotModes";

import { TransportMode } from "../../types/transport.types";

interface TransportTagsProps {
  modes: TransportMode[];
}

export function TransportTags({
  modes,
}: TransportTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => {
        const Icon =
          TRANSPORT_ICONS[mode];

        return (
          <span
            key={mode}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs border border-border bg-secondary"
          >
            <Icon size={12} />
            {mode}
          </span>
        );
      })}
    </div>
  );
}