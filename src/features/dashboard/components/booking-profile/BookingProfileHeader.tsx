import {
  CalendarDays,
  Hash,
  MapPin,
  Clock3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  BookingProfileData,
} from "@/features/dashboard/types/booking-profile.types";

interface BookingProfileHeaderProps {
  booking: BookingProfileData;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTravelDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function getStatusVariant(
  status: BookingProfileData["status"]
) {
  switch (status) {
    case "APPROVED":
      return "default";

    case "CANCELLED":
      return "destructive";

    case "COMPLETED":
      return "outline";

    case "PENDING":
    default:
      return "secondary";
  }
}

function createBookingReference(
  booking: BookingProfileData
) {
  const date = new Date(
    booking.createdAt
  );

  const year = date.getFullYear();

  const shortId = booking.id
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase();

  return `BK-${year}-${shortId}`;
}

export function BookingProfileHeader({
  booking,
}: BookingProfileHeaderProps) {
  return (
    <Card className="overflow-hidden">
      {/* Cover */}
      <div className="relative h-48 w-full overflow-hidden bg-muted md:h-56">
        {booking.coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={booking.coverSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-muted/70 to-background">
            <span className="text-sm text-muted-foreground">
              Booking cover
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-6 md:left-6 md:right-6">
          <div className="flex min-w-0 items-end gap-4">
            {/* Avatar */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-background bg-muted shadow-lg md:h-20 md:w-20">
              {booking.avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={booking.avatarSrc}
                  alt={booking.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xl font-bold md:text-2xl">
                    {getInitials(
                      booking.fullName
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Name */}
            <div className="min-w-0 pb-0.5 text-white">
              <h1 className="truncate text-xl font-bold md:text-2xl">
                {booking.fullName}
              </h1>

              <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                <Hash className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate">
                  {createBookingReference(
                    booking
                  )}
                </span>
              </div>
            </div>
          </div>

          <Badge
            variant={getStatusVariant(
              booking.status
            )}
            className="shrink-0"
          >
            {booking.status}
          </Badge>
        </div>
      </div>

      {/* Summary */}
      <CardContent className="p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MapPin className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Route
              </p>

              <p className="mt-1 break-words text-sm font-medium">
                {booking.currentLocation}
              </p>

              <p className="text-xs text-muted-foreground">
                to {booking.proposedLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Travel Date
              </p>

              <p className="mt-1 text-sm font-medium">
                {formatTravelDate(
                  booking.travelDate
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Travel Time
              </p>

              <p className="mt-1 text-sm font-medium">
                {booking.travelTime}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}