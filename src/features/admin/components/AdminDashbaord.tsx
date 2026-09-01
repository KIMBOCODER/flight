import {
  StatsCards,
  RevenueChart,
  BookingTrendsChart,
  RecentBookingsTable,
} from "@/features/admin";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor bookings, revenue, and performance metrics
        </p>
      </div>

      <StatsCards />

      <Tabs defaultValue="revenue" className="mb-8">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <RevenueChart />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingTrendsChart />
        </TabsContent>
      </Tabs>

      <RecentBookingsTable />
    </div>
  );
}