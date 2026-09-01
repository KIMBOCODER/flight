import { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  value: ReactNode;
}

export function DashboardCard({
  title,
  icon,
  value,
}: DashboardCardProps) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        {icon}
      </div>

      <h2 className="mt-5 text-3xl font-bold">
        {value}
      </h2>
    </Card>
  );
}