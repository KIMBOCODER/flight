import { Badge } from "@/components/ui/badge";

import type { BookingStatus } from "@prisma/client";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  switch (status) {
    case "APPROVED":
      return (
        <Badge variant="default">
          {label}
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge variant="destructive">
          {label}
        </Badge>
      );

    case "COMPLETED":
      return (
        <Badge variant="secondary">
          {label}
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {label}
        </Badge>
      );
  }
}