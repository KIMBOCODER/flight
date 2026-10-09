import {
  Banknote,
  CalendarDays,
  Clock3,
  Luggage,
  MapPin,
  Phone,
  UserRound,
  UsersRound,
  CreditCard,
  TrainFront,
  Bus,
  Car,
  Plane,
  Ship,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  BookingProfileData,
} from "@/features/dashboard/types/booking-profile.types";

interface BookingProfileDetailsProps {
  booking: BookingProfileData;
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

interface TransportMode {
  name: string;
  icon: React.ElementType;
}

function normalizeTransportModes(
  modes: unknown
): TransportMode[] {
  if (!modes) {
    return [];
  }

  let values: string[] = [];

  if (Array.isArray(modes)) {
    values = modes.map(String);
  } else if (
    typeof modes === "string"
  ) {
    values = [modes];
  } else if (
    typeof modes === "object"
  ) {
    const objectValues = Object.values(
      modes as Record<string, unknown>
    );

    values = objectValues
      .filter(
        (value): value is string =>
          typeof value === "string"
      );
  }

  return values.map((value) => {
    const normalized =
      value.toLowerCase().trim();

    if (
      normalized.includes("flight") ||
      normalized.includes("air")
    ) {
      return {
        name: value,
        icon: Plane,
      };
    }

    if (
      normalized.includes("train") ||
      normalized.includes("rail")
    ) {
      return {
        name: value,
        icon: TrainFront,
      };
    }

    if (
      normalized.includes("bus")
    ) {
      return {
        name: value,
        icon: Bus,
      };
    }

    if (
      normalized.includes("car") ||
      normalized.includes("vehicle")
    ) {
      return {
        name: value,
        icon: Car,
      };
    }

    if (
      normalized.includes("boat") ||
      normalized.includes("ship") ||
      normalized.includes("ferry")
    ) {
      return {
        name: value,
        icon: Ship,
      };
    }

    return {
      name: value,
      icon: MapPin,
    };
  });
}

function TransportModes({
  modes,
}: {
  modes: unknown;
}) {
  const transportModes =
    normalizeTransportModes(modes);

  if (transportModes.length === 0) {
    return (
      <span className="text-sm font-medium text-muted-foreground">
        Not specified
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {transportModes.map(
        (
          {
            name,
            icon: Icon,
          },
          index
        ) => (
          <Badge
            key={`${name}-${index}`}
            variant="secondary"
            className="gap-1.5 px-3 py-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {name}
          </Badge>
        )
      )}
    </div>
  );
}

export function BookingProfileDetails({
  booking,
}: BookingProfileDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Passenger */}
      <Card>
        <CardHeader>
          <CardTitle>
            Passenger Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem
            icon={UserRound}
            label="Full Name"
            value={booking.fullName}
          />

          <DetailItem
            icon={Phone}
            label="Phone Number"
            value={booking.phone}
          />

          <DetailItem
            icon={UsersRound}
            label="Next of Kin"
            value={booking.nextOfKin}
          />
        </CardContent>
      </Card>

      {/* Journey */}
      <Card>
        <CardHeader>
          <CardTitle>
            Journey Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2">
          <DetailItem
            icon={MapPin}
            label="Current Location"
            value={
              booking.currentLocation
            }
          />

          <DetailItem
            icon={MapPin}
            label="Proposed Location"
            value={
              booking.proposedLocation
            }
          />

          <DetailItem
            icon={CalendarDays}
            label="Travel Date"
            value={formatDate(
              booking.travelDate
            )}
          />

          <DetailItem
            icon={Clock3}
            label="Travel Time"
            value={booking.travelTime}
          />

          <DetailItem
            icon={Luggage}
            label="Luggage Weight"
            value={
              booking.luggageWeight
            }
          />

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MapPin className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Transport Mode
              </p>

              <div className="mt-2">
                <TransportModes
                  modes={
                    booking.selectedModes
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <CardTitle>
            Payment Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2">
          <DetailItem
            icon={Banknote}
            label="Proposed Price"
            value={
              booking.proposedPrice
            }
          />

          <DetailItem
            icon={CreditCard}
            label="Payment Account"
            value={
              booking.paymentAccount
            }
          />
        </CardContent>
      </Card>

      {/* Record */}
      <Card>
        <CardHeader>
          <CardTitle>
            Booking Record
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 sm:grid-cols-2">
          <DetailItem
            icon={CalendarDays}
            label="Created"
            value={formatDateTime(
              booking.createdAt
            )}
          />

          <DetailItem
            icon={Clock3}
            label="Last Updated"
            value={formatDateTime(
              booking.updatedAt
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}