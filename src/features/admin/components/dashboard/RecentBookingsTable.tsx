import Link from "next/link";

import {
  ArrowRight,
  Car,
  Bus,
  Plane,
  Train,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { AdminRecentBooking } from "@/features/admin/types/admin.types";

interface RecentBookingsTableProps {
  bookings: AdminRecentBooking[];
}

function getTransportIcon(booking: AdminRecentBooking) {
  const text =
    `${booking.currentLocation} ${booking.proposedLocation}`.toLowerCase();

  if (text.includes("flight")) {
    return <Plane className="h-4 w-4" />;
  }

  if (text.includes("train")) {
    return <Train className="h-4 w-4" />;
  }

  if (text.includes("bus")) {
    return <Bus className="h-4 w-4" />;
  }

  return <Car className="h-4 w-4" />;
}

function getStatusVariant(
  status: AdminRecentBooking["status"]
) {
  switch (status) {
    case "APPROVED":
      return "default" as const;

    case "CANCELLED":
      return "destructive" as const;

    case "COMPLETED":
      return "secondary" as const;

    default:
      return "outline" as const;
  }
}

export function RecentBookingsTable({
  bookings,
}: RecentBookingsTableProps) {
  return (
    <div className="mt-8 rounded-xl border">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Bookings
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest booking activity
          </p>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/bookings">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center"
              >
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="font-medium hover:underline"
                  >
                    {booking.reference}
                  </Link>
                </TableCell>

                <TableCell>
                  {booking.fullName}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTransportIcon(booking)}

                    <span>
                      {booking.currentLocation}
                      {" → "}
                      {booking.proposedLocation}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {new Date(
                    booking.travelDate
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell className="font-semibold">
                  {booking.proposedPrice}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getStatusVariant(
                      booking.status
                    )}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}