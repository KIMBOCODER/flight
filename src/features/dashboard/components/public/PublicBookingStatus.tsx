import {
  CheckCircle2,
  CircleAlert,
  CircleX,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  PublicBookingData,
} from "@/features/dashboard/types/public-booking.types";

interface PublicBookingStatusProps {
  status: PublicBookingData["status"];
}

export function PublicBookingStatus({
  status,
}: PublicBookingStatusProps) {
  const config =
    {
      PENDING: {
        icon: Clock3,
        title: "Booking Pending",
        description:
          "This booking is currently awaiting approval.",
      },

      APPROVED: {
        icon: CheckCircle2,
        title: "Booking Approved",
        description:
          "This booking has been approved.",
      },

      COMPLETED: {
        icon: CheckCircle2,
        title: "Booking Completed",
        description:
          "This journey has been marked as completed.",
      },

      CANCELLED: {
        icon: CircleX,
        title: "Booking Cancelled",
        description:
          "This booking has been cancelled.",
      },
    }[status];

  const Icon =
    config?.icon ?? CircleAlert;

  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5 sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Booking Status
          </p>

          <h2 className="mt-1 text-base font-semibold">
            {config?.title ??
              status}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {config?.description ??
              "Current booking status."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}