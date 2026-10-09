import Link from "next/link";

import {
  Calendar,
  MapPin,
} from "lucide-react";

import type { Booking } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentBookingsProps {
  bookings: Booking[];
}

export function RecentBookings({
  bookings,
}: RecentBookingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Bookings
        </CardTitle>
      </CardHeader>

      <CardContent>
        {bookings.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link
                key={booking.id}
                href={`/dashboard/bookings/${booking.id}`}
                className="block rounded-lg border p-4 transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />

                      <span className="truncate">
                        {booking.currentLocation}
                      </span>

                      <span>
                        →
                      </span>

                      <span className="truncate">
                        {booking.proposedLocation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />

                      <span>
                        {new Date(
                          booking.travelDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      booking.status ===
                      "CANCELLED"
                        ? "destructive"
                        : booking.status ===
                            "APPROVED"
                          ? "default"
                          : booking.status ===
                              "COMPLETED"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}