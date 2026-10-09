import { useState } from "react";

import {
  Check,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BookingStatus } from "@prisma/client";

interface BookingActionsProps {
  bookingId: string;
  status: BookingStatus;
  onSuccess?: () => void;
}

export function BookingActions({
  bookingId,
  status,
  onSuccess,
}: BookingActionsProps) {
  const [loading, setLoading] =
    useState<string | null>(null);

  const performAction = async (
    action: "approve" | "complete" | "cancel"
  ) => {
    try {
      setLoading(action);

      const response = await fetch(
        `/api/admin/bookings/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${action} booking`
        );
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : `Failed to ${action} booking`
      );
    } finally {
      setLoading(null);
    }
  };

  if (status === "COMPLETED") {
    return (
      <span className="text-sm text-muted-foreground">
        Completed
      </span>
    );
  }

  if (status === "CANCELLED") {
    return (
      <span className="text-sm text-muted-foreground">
        Cancelled
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status === "PENDING" && (
        <Button
          size="sm"
          type="button"
          disabled={loading !== null}
          onClick={() =>
            void performAction("approve")
          }
        >
          <Check className="mr-2 h-4 w-4" />

          {loading === "approve"
            ? "Approving..."
            : "Approve"}
        </Button>
      )}

      {status === "APPROVED" && (
        <Button
          size="sm"
          type="button"
          disabled={loading !== null}
          onClick={() =>
            void performAction("complete")
          }
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />

          {loading === "complete"
            ? "Completing..."
            : "Complete"}
        </Button>
      )}

      <Button
        size="sm"
        type="button"
        variant="destructive"
        disabled={loading !== null}
        onClick={() =>
          void performAction("cancel")
        }
      >
        <XCircle className="mr-2 h-4 w-4" />

        {loading === "cancel"
          ? "Cancelling..."
          : "Cancel"}
      </Button>
    </div>
  );
}