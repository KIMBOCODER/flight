import {
  Anchor,
  Bus,
  Car,
  Plane,
  TrainFront,
} from "lucide-react";

import { TransportMode } from "../types/transport.types";

export const TRANSPORT_MODES: TransportMode[] = [
  "Car",
  "Train",
  "Air",
  "Bus",
  "Boat",
];

export const TRANSPORT_ICONS = {
  Car,
  Train: TrainFront,
  Air: Plane,
  Bus,
  Boat: Anchor,
};