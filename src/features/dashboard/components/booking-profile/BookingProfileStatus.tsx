import {
  CheckCircle2,
  Circle,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  BookingStatus,
} from "@prisma/client";

interface BookingProfileStatusProps {
  status: BookingStatus;
}

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    description: string;
  }
> = {
  PENDING: {
    label: "Pending",
    description:
      "Your booking request has been received and is awaiting approval.",
  },

  APPROVED: {
    label: "Approved",
    description:
      "Your booking has been approved and is ready for travel.",
  },

  COMPLETED: {
    label: "Completed",
    description:
      "This booking has been successfully completed.",
  },

  CANCELLED: {
    label: "Cancelled",
    description:
      "This booking has been cancelled and is no longer active.",
  },
};

const statusOrder: BookingStatus[] = [
  "PENDING",
  "APPROVED",
  "COMPLETED",
];

function getStatusIndex(
  status: BookingStatus
) {
  return statusOrder.indexOf(status);
}

export function BookingProfileStatus({
  status,
}: BookingProfileStatusProps) {
  const config = statusConfig[status];

  const currentIndex =
    getStatusIndex(status);

  const StatusIcon =
    status === "CANCELLED"
      ? XCircle
      : status === "PENDING"
        ? Clock3
        : CheckCircle2;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Booking Status
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
            <StatusIcon className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <p className="font-medium">
              {config.label}
            </p>

            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>

        {status !== "CANCELLED" && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {statusOrder.map(
              (step, index) => {
                const completed =
                  index <= currentIndex;

                return (
                  <div
                    key={step}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}

                      <span
                        className={`text-xs ${
                          completed
                            ? "font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step}
                      </span>
                    </div>

                    <div
                      className={`h-1 rounded-full ${
                        completed
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}

        {status === "CANCELLED" && (
          <div className="mt-5 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

              <div>
                <p className="text-sm font-medium text-destructive">
                  Booking cancelled
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  This booking is no longer active.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}