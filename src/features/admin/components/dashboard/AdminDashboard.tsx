import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";

import { StatsCards } from "./StatsCards";
import { BookingTrendsChart } from "./BookingTrendsChart";
import { RecentBookingsTable } from "./RecentBookingsTable";

export function AdminDashboard() {
  const {
    data,
    loading,
    error,
    refetch,
  } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />

        <div>
          <h2 className="font-semibold">
            Unable to load dashboard
          </h2>

          <p className="text-sm text-muted-foreground">
            {error ?? "Something went wrong."}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Monitor bookings and users across the platform.
        </p>
      </div>

      <StatsCards stats={data.stats} />

      <BookingTrendsChart
        data={data.bookingTrends}
      />

      <RecentBookingsTable
        bookings={data.recentBookings}
      />
    </div>
  );
}