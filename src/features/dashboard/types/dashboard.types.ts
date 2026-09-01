import type { Booking } from "@prisma/client";

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  completed: number;
}

export interface DashboardUser {
  id: string;
  username: string;
  role: string;
  createdAt: Date;
}

export interface DashboardResponse {
  user: DashboardUser;
  stats: DashboardStats;
  recentBookings: Booking[];
}