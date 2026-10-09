
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import Link from "next/link";

import {
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/features/auth/server/authorization";
import { BookingDetails } from "@/features/admin/components/bookings/BookingDetails";
import type { AdminBooking } from "@/features/admin/types/admin-booking.types";

export default function AdminBookingDetailsPage() {
  const router = useRouter();

  const [booking, setBooking] = useState<AdminBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bookingId =
    typeof router.query.id === "string" ? router.query.id : null;

  const fetchBooking = useCallback(async () => {
    // Wait until the effect has completed before changing state.
    await Promise.resolve();

    if (!bookingId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(bookingId)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load booking");
      }

      setBooking(result.data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load booking"
      );
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
  if (!router.isReady) return;

  const timer = window.setTimeout(() => {
    void fetchBooking();
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, [router.isReady, fetchBooking]);

  if (!router.isReady || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading booking...
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />

        <p className="text-sm text-muted-foreground">
          {error ?? "Booking not found."}
        </p>

        <Button asChild variant="outline">
          <Link href="/admin/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/admin/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </Button>

      <BookingDetails
        booking={booking}
        onActionSuccess={() => {
          void fetchBooking();
        }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const admin = await requireAdmin(context.req.headers.cookie);

  if (!admin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};