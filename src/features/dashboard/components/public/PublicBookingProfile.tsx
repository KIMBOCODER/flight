import {
  PublicBookingDetails,
  PublicBookingHeader,
  PublicBookingStatus,
} from "@/features/dashboard/components/public";

import type {
  PublicBookingData,
} from "@/features/dashboard/types/public-booking.types";

interface PublicBookingProfileProps {
  booking: PublicBookingData;
}

export function PublicBookingProfile({
  booking,
}: PublicBookingProfileProps) {
  return (
    <div className="space-y-6">
      <PublicBookingHeader
        booking={booking}
      />

      <PublicBookingStatus
        status={booking.status}
      />

      <PublicBookingDetails
        booking={booking}
      />

      <div className="pb-4 text-center">
        <p className="text-xs text-muted-foreground">
          This is a public booking record.
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Booking information may be updated
          as the booking progresses.
        </p>
      </div>
    </div>
  );
}