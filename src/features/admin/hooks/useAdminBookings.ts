
import { useCallback, useEffect, useState } from "react";

import type { BookingStatus } from "@prisma/client";

import type {
  AdminBooking,
  AdminBookingFilters,
  AdminBookingListResponse,
} from "@/features/admin/types/admin-booking.types";

interface UseAdminBookingsResult {
  bookings: AdminBooking[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface AdminBookingsApiResponse {
  success?: boolean;
  data?: AdminBookingListResponse;
  message?: string;
}

export function useAdminBookings(
  filters: AdminBookingFilters = {},
): UseAdminBookingsResult {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const status: BookingStatus | undefined = filters.status;

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (status) {
        params.set("status", status);
      }

      const query = params.toString();
      const url = query
        ? `/api/admin/bookings?${query}`
        : "/api/admin/bookings";

      const response = await fetch(url);

      const result =
        (await response.json()) as AdminBookingsApiResponse;

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load admin bookings",
        );
      }

      const data = result.data;

      if (
        !data ||
        !Array.isArray(data.bookings) ||
        typeof data.total !== "number"
      ) {
        throw new Error("Invalid response from admin bookings API");
      }

      setBookings(data.bookings);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch admin bookings:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load admin bookings",
      );
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchBookings();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchBookings]);

  return {
    bookings,
    total,
    loading,
    error,
    refetch: fetchBookings,
  };
}
