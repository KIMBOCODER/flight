import { User, Phone, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { Field } from "../shared/Field";
import { BookingFormData,BookingErrors, } from "../../types/booking.types";

interface PersonalInformationSectionProps {
  form: BookingFormData;
  errors: BookingErrors;
  onChange: (
    key: keyof BookingFormData
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function PersonalInformationSection({
  form,
  errors,
  onChange,
}: PersonalInformationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.fullName}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={onChange("fullName")}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>

        <Field label="Phone Number" error={errors.phone}>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="tel"
              placeholder="+234..."
              value={form.phone}
              onChange={onChange("phone")}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>
      </div>

      <Field label="Next Of Kin" error={errors.nextOfKin}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Next Of Kin"
            value={form.nextOfKin}
            onChange={onChange("nextOfKin")}
            className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
          />
        </div>
      </Field>

      <div>
        <label className="text-sm font-medium mb-2 block">Route</label>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Current Location"
              value={form.currentLocation}
              onChange={onChange("currentLocation")}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>

          <ArrowRight className="size-4 text-primary shrink-0" />

          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
            <input
              type="text"
              placeholder="Destination"
              value={form.proposedLocation}
              onChange={onChange("proposedLocation")}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </div>

        {(errors.currentLocation || errors.proposedLocation) && (
          <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3" />
            Both locations are required
          </p>
        )}
      </div>
    </div>
  );
}