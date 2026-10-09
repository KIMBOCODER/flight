import type { BookingStatus } from "@prisma/client";

export interface AdminDashboardStats {
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface AdminBookingTrend {
  month: string;
  bookings: number;
}

export interface AdminRecentBooking {
  id: string;
  reference: string;
  fullName: string;
  currentLocation: string;
  proposedLocation: string;
  travelDate: string;
  proposedPrice: string;
  status: BookingStatus;
  createdAt: string;
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  bookingTrends: AdminBookingTrend[];
  recentBookings: AdminRecentBooking[];
}