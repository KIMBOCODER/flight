import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { LucideIcon } from "lucide-react";


interface StatisticsCardProps {

  title: string;

  value: number;

  icon: LucideIcon;

  description?: string;

}


export function StatisticsCard({
  title,
  value,
  icon: Icon,
  description,
}: StatisticsCardProps) {

  return (

    <Card>

      <CardHeader className="flex flex-row items-center justify-between pb-2">

        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>


        <Icon className="h-5 w-5 text-muted-foreground" />

      </CardHeader>


      <CardContent>

        <div className="text-3xl font-bold">
          {value}
        </div>


        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}

      </CardContent>

    </Card>

  );
}