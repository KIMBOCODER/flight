import type { AdminBooking } from "@/features/admin/types/admin-booking.types";

import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingActions } from "./BookingActions";

interface BookingDetailsProps {
  booking: AdminBooking;
  onActionSuccess?: () => void;
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm">
        {value || "—"}
      </p>
    </div>
  );
}

export function BookingDetails({
  booking,
  onActionSuccess,
}: BookingDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Booking Reference
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {booking.reference}
          </h1>
        </div>

        <BookingStatusBadge
          status={booking.status}
        />
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Passenger Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Full Name"
            value={booking.fullName}
          />

          <DetailItem
            label="Username"
            value={`@${booking.username}`}
          />

          <DetailItem
            label="Phone"
            value={booking.phone}
          />

          <DetailItem
            label="Next of Kin"
            value={booking.nextOfKin}
          />

          <DetailItem
            label="User ID"
            value={booking.userId}
          />
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Journey Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            label="Current Location"
            value={booking.currentLocation}
          />

          <DetailItem
            label="Proposed Location"
            value={booking.proposedLocation}
          />

          <DetailItem
            label="Travel Date"
            value={new Date(
              booking.travelDate
            ).toLocaleDateString()}
          />

          <DetailItem
            label="Travel Time"
            value={booking.travelTime}
          />

          <DetailItem
            label="Luggage Weight"
            value={booking.luggageWeight}
          />

          <DetailItem
            label="Transport Modes"
            value={
              booking.selectedModes
                ? JSON.stringify(
                    booking.selectedModes
                  )
                : "—"
            }
          />
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Payment Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <DetailItem
            label="Proposed Price"
            value={booking.proposedPrice}
          />

          <DetailItem
            label="Payment Account"
            value={booking.paymentAccount}
          />
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Record Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <DetailItem
            label="Created"
            value={new Date(
              booking.createdAt
            ).toLocaleString()}
          />

          <DetailItem
            label="Last Updated"
            value={new Date(
              booking.updatedAt
            ).toLocaleString()}
          />
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Booking Actions
        </h2>

        <div className="mt-4">
          <BookingActions
            bookingId={booking.id}
            status={booking.status}
            onSuccess={onActionSuccess}
          />
        </div>
      </div>
    </div>
  );
}