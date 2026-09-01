import {
  ClipboardList,
  Clock,
  CheckCircle,
  Plane,
} from "lucide-react";


import {
  StatisticsCard,
} from "./StatisticsCard";

import type { DashboardStats } from "@/features/dashboard/types/dashboard.types";


interface StatisticsGridProps {

  stats: DashboardStats;

}


export function StatisticsGrid({
  stats,
}: StatisticsGridProps) {


  return (

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


      <StatisticsCard
        title="Total Bookings"
        value={stats.total}
        icon={ClipboardList}
      />


      <StatisticsCard
        title="Pending"
        value={stats.pending}
        icon={Clock}
      />


      <StatisticsCard
        title="Approved"
        value={stats.approved}
        icon={CheckCircle}
      />


      <StatisticsCard
        title="Completed"
        value={stats.completed}
        icon={Plane}
      />


    </div>

  );
}