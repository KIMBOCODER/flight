import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminBookingTrend } from "@/features/admin/types/admin.types";

interface BookingTrendsChartProps {
  data: AdminBookingTrend[];
}

export function BookingTrendsChart({
  data,
}: BookingTrendsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Trends</CardTitle>

        <CardDescription>
          Total bookings over the last six months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="bookings"
                stroke="currentColor"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}