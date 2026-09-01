import { prisma } from "@/lib/prisma";

export const dashboardService = {
  async getDashboard(userId: string) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === "PENDING").length,
      approved: bookings.filter(b => b.status === "APPROVED").length,
      completed: bookings.filter(b => b.status === "COMPLETED").length,
    };

    return {
      user,
      stats,
      recentBookings: bookings.slice(0, 5),
    };
  },
};