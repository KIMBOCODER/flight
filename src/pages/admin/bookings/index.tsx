import { useState } from "react";

import type {
  GetServerSideProps,
} from "next";

import type { BookingStatus } from "@prisma/client";

import { Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { requireAdmin } from "@/features/auth/server/authorization";

import { BookingFilters } from "@/features/admin/components/bookings/BookingFilters";
import { BookingTable } from "@/features/admin/components/bookings/BookingTable";
import { useAdminBookings } from "@/features/admin/hooks/useAdminBookings";

export default function AdminBookingsPage() {
  const [status, setStatus] =
    useState<BookingStatus | "ALL">("ALL");

  const {
    bookings,
    total,
    loading,
    error,
    refetch,
  } = useAdminBookings(
    status === "ALL" ? {} : {status});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bookings
        </h1>

        <p className="text-muted-foreground">
          Manage and monitor customer bookings.
        </p>
      </div>

      <BookingFilters
        value={status}
        onChange={setStatus}
      />

      <div className="text-sm text-muted-foreground">
        {total} booking{total === 1 ? "" : "s"}
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading bookings...
          </div>
        </div>
      ) : error ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />

          <p className="text-sm text-muted-foreground">
            {error}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      ) : (
        <BookingTable
          bookings={bookings}
          onActionSuccess={() => void refetch()}
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps =
  async (context) => {
    const admin = await requireAdmin(
      context.req.headers.cookie
    );

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