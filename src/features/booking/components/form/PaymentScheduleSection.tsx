import {
  CreditCard,
  Calendar,
  Clock,
} from "lucide-react";

import { Field } from "../shared/Field";

import type {
  BookingFormData,
  BookingErrors,
} from "../../types/booking.types";

interface Props {
  form: BookingFormData;
  errors: BookingErrors;

  onChange: (
    key: keyof BookingFormData
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
}

export function PaymentScheduleSection({
  form,
  errors,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <Field
        label="Payment Account"
        error={errors.paymentAccount}
      >
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

          <input
            type="text"
            value={form.paymentAccount}
            onChange={onChange("paymentAccount")}
            placeholder="Opay - 1234567890"
            className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
          />
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Travel Date"
          error={errors.travelDate}
        >
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <input
              type="date"
              value={form.travelDate}
              onChange={onChange("travelDate")}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>

        <Field
          label="Travel Time"
          error={errors.travelTime}
        >
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <input
              type="text"
              value={form.travelTime}
              onChange={onChange("travelTime")}
              placeholder="10:00 AM / Jibowu"
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}