import type { BookingStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface BookingFiltersProps {
  value: BookingStatus | "ALL";
  onChange: (
    status: BookingStatus | "ALL"
  ) => void;
}

const filters: Array<{
  label: string;
  value: BookingStatus | "ALL";
}> = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Approved",
    value: "APPROVED",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export function BookingFilters({
  value,
  onChange,
}: BookingFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          type="button"
          variant={
            value === filter.value
              ? "default"
              : "outline"
          }
          size="sm"
          onClick={() =>
            onChange(filter.value)
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}