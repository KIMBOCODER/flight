import type { GetServerSideProps } from "next";

import { requireUser } from "@/features/auth/server/session";

import { DashboardLayout } from "@/features/dashboard/components/layout/DashboardLayout";

import {
  WelcomeCard,
  StatisticsGrid,
  RecentBookings,
} from "@/features/dashboard/components/overview";

import { LoadingSpinner } from "@/features/dashboard/components/shared/LoadingSpinner";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

interface DashboardPageProps {
  user: {
    id: string;
    username: string;
    role: "USER" | "ADMIN";
  };
}

export default function DashboardPage({
  user,
}: DashboardPageProps) {
  const {
    data,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout user={user}>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
          <h2 className="text-lg font-semibold text-destructive">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error ?? "Unable to load dashboard data."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        <WelcomeCard
          name={data.user.username}
        />

        <StatisticsGrid
          stats={data.stats}
        />

        <RecentBookings
          bookings={data.recentBookings}
        />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  async ({ req }) => {
    const user = await requireUser(
      req.headers.cookie
    );

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    };
  };