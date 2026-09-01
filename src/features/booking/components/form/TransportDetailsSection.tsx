import { Weight, Banknote } from "lucide-react";

import { Field } from "../shared/Field";
import { TransportModeSelector } from "./TransportModeSelector";

import { BookingFormData, BookingErrors } from "../../types/booking.types";
import { TransportMode } from "../../types/transport.types";

interface Props {
  form: BookingFormData;
  errors: BookingErrors;
  selectedModes: TransportMode[];
  onToggleMode: (mode: TransportMode) => void;
  onChange: (
    key: keyof BookingFormData
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function TransportDetailsSection({
  form,
  errors,
  selectedModes,
  onToggleMode,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Means Of Transport
        </label>

        <TransportModeSelector
          selectedModes={selectedModes}
          onToggle={onToggleMode}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Luggage Weight">
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={form.luggageWeight}
              onChange={onChange("luggageWeight")}
              placeholder="20kg"
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>

        <Field label="Proposed Price" error={errors.proposedPrice}>
          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={form.proposedPrice}
              onChange={onChange("proposedPrice")}
              placeholder="₦50,000"
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}