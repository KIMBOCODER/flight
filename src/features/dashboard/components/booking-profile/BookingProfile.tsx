import {
  BookingProfileActions,
  BookingProfileDetails,
  BookingProfileHeader,
  BookingProfileStatus,
} from "@/features/dashboard/components/booking-profile";

import type {
  BookingProfileData,
} from "@/features/dashboard/types/booking-profile.types";

interface BookingProfileProps {
  booking: BookingProfileData;
}

export function BookingProfile({
  booking,
}: BookingProfileProps) {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Booking Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Booking Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage the details of this
          booking.
        </p>
      </div>

      {/* Booking header */}
      <BookingProfileHeader
        booking={booking}
      />

      {/* Status */}
      <BookingProfileStatus
        status={booking.status}
      />

      {/* Details */}
      <BookingProfileDetails
        booking={booking}
      />

      {/* Actions */}
      <BookingProfileActions
        booking={booking}
      />
    </div>
  );
}