import {
  CalendarDays,
  Clock3,
  Hash,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { createBookingReference } from "@/features/booking/utils/createBookingReference";

import type {
  PublicBookingData,
} from "@/features/dashboard/types/public-booking.types";

interface PublicBookingHeaderProps {
  booking: PublicBookingData;
}

function getInitials(
  name: string
) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) =>
      part.charAt(0)
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTravelDate(
  date: string
) {
  return new Date(
    date
  ).toLocaleDateString(
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
  status: PublicBookingData["status"]
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

export function PublicBookingHeader({
  booking,
}: PublicBookingHeaderProps) {
  const bookingReference =
    createBookingReference(
      booking
    );

  return (
    <Card className="overflow-hidden">
      <div className="relative h-52 w-full overflow-hidden bg-muted sm:h-60 md:h-72">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:bottom-6 md:left-6 md:right-6">
          <div className="flex min-w-0 items-end gap-3 sm:gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-white/90 bg-muted shadow-xl sm:h-20 sm:w-20">
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

            <div className="min-w-0 pb-0.5 text-white">
              <h2 className="truncate text-xl font-bold sm:text-2xl md:text-3xl">
                {booking.fullName}
              </h2>

              <div className="mt-1.5 flex items-center gap-2 text-xstext-white/80 sm:text-sm">
                <Hash className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate">
                  {bookingReference}
                </span>
              </div>
            </div>
          </div>

          <Badge
            variant={getStatusVariant(
              booking.status
            )}
            className="w-fit shrink-0"
          >
            {booking.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6 md:p-7">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MapPin className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Route
              </p>

              <p className="mt-1 break-words text-sm font-semibold">
                {booking.currentLocation}
              </p>

              <p className="text-xs text-muted-foreground">
                to {booking.proposedLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Travel Date
              </p>

              <p className="mt-1 text-sm font-semibold">
                {formatTravelDate(
                  booking.travelDate
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Travel Time
              </p>

              <p className="mt-1 text-sm font-semibold">
                {booking.travelTime}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}