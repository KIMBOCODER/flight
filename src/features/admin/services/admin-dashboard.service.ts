import { prisma } from "@/lib/prisma";
import type {
  AdminDashboardData,
  AdminDashboardStats,
  AdminBookingTrend,
  AdminRecentBooking,
} from "@/features/admin/types/admin.types";

function createBookingReference(
  bookingId: string,
  createdAt: Date
): string {
  const year = createdAt.getFullYear();

  const shortId = bookingId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase();

  return `BK-${year}-${shortId}`;
}

export const adminDashboardService = {
  async getDashboard(): Promise<AdminDashboardData> {
    const [
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      cancelledBookings,
      totalUsers,
      activeUsers,
      inactiveUsers,
      bookings,
    ] = await Promise.all([
      prisma.booking.count(),

      prisma.booking.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.booking.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.booking.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.booking.count({
        where: {
          status: "CANCELLED",
        },
      }),

      prisma.user.count(),

      prisma.user.count({
        where: {
          isActive: true,
        },
      }),

      prisma.user.count({
        where: {
          isActive: false,
        },
      }),

      prisma.booking.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 50,

        select: {
          id: true,
          fullName: true,
          currentLocation: true,
          proposedLocation: true,
          travelDate: true,
          proposedPrice: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const stats: AdminDashboardStats = {
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      cancelledBookings,
      totalUsers,
      activeUsers,
      inactiveUsers,
    };

    const recentBookings: AdminRecentBooking[] = bookings
      .slice(0, 5)
      .map((booking) => ({
        id: booking.id,
        reference: createBookingReference(
          booking.id,
          booking.createdAt
        ),
        fullName: booking.fullName,
        currentLocation: booking.currentLocation,
        proposedLocation: booking.proposedLocation,
        travelDate: booking.travelDate.toISOString(),
        proposedPrice: booking.proposedPrice,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
      }));

    const bookingTrends = buildBookingTrends(bookings);

    return {
      stats,
      bookingTrends,
      recentBookings,
    };
  },
};

function buildBookingTrends(
  bookings: Array<{
    createdAt: Date;
  }>
): AdminBookingTrend[] {
  const months: AdminBookingTrend[] = [];

  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    months.push({
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      bookings: 0,
    });
  }

  for (const booking of bookings) {
    const bookingDate = booking.createdAt;

    const monthIndex =
      (bookingDate.getFullYear() - now.getFullYear()) * 12 +
      (bookingDate.getMonth() - now.getMonth());

    const arrayIndex = 5 + monthIndex;

    if (arrayIndex >= 0 && arrayIndex < months.length) {
      months[arrayIndex].bookings += 1;
    }
  }

  return months;
}