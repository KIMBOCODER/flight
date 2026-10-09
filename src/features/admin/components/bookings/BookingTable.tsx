import Link from "next/link";

import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import type { AdminBooking } from "@/features/admin/types/admin-booking.types";

import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingActions } from "./BookingActions";

interface BookingTableProps {
  bookings: AdminBooking[];
  onActionSuccess?: () => void;
}

export function BookingTable({
  bookings,
  onActionSuccess,
}: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border p-12 text-center">
        <h3 className="font-semibold">
          No bookings found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no bookings matching this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Travel Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((booking) => (
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
                <div>
                  <p className="font-medium">
                    {booking.fullName}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    @{booking.username}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span>
                  {booking.currentLocation}
                  {" → "}
                  {booking.proposedLocation}
                </span>
              </TableCell>

              <TableCell>
                {new Date(
                  booking.travelDate
                ).toLocaleDateString()}
              </TableCell>

              <TableCell className="font-medium">
                {booking.proposedPrice}
              </TableCell>

              <TableCell>
                <BookingStatusBadge
                  status={booking.status}
                />
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                  >
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>

                  <BookingActions
                    bookingId={booking.id}
                    status={booking.status}
                    onSuccess={onActionSuccess}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}