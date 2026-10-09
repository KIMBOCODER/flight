import {
  Activity,
  CheckCircle2,
  Clock3,
  Users,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminDashboardStats } from "@/features/admin/types/admin.types";

interface StatsCardsProps {
  stats: AdminDashboardStats;
}

export function StatsCards({
  stats,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Activity,
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      icon: Clock3,
    },
    {
      title: "Approved",
      value: stats.approvedBookings,
      icon: CheckCircle2,
    },
    {
      title: "Completed",
      value: stats.completedBookings,
      icon: CheckCircle2,
    },
    {
      title: "Cancelled",
      value: stats.cancelledBookings,
      icon: XCircle,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>

              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {card.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}