import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge
} from "@/components/ui/badge";

import {
  MapPin,
  Calendar,
} from "lucide-react";

import type { Booking } from "@prisma/client";


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

              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >

                <div className="space-y-2">


                  <div className="flex items-center gap-2 font-medium">

                    <MapPin className="h-4 w-4 text-muted-foreground" />

                    {booking.currentLocation}

                    <span>
                      →
                    </span>

                    {booking.proposedLocation}

                  </div>


                  <div className="flex items-center gap-2 text-sm text-muted-foreground">

                    <Calendar className="h-4 w-4" />

                    {new Date(
                      booking.travelDate
                    ).toLocaleDateString()}

                  </div>


                </div>


                <Badge>
                  Pending
                </Badge>


              </div>

            ))}

          </div>

        )}

      </CardContent>

    </Card>
  );
}