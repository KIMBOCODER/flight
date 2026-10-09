import { prisma } from "@/lib/prisma";
import type { BookingStatus } from "@prisma/client";

import type {
  AdminBooking,
  AdminBookingFilters,
} from "@/features/admin/types/admin-booking.types";

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

function mapBooking(booking: {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  nextOfKin: string;
  currentLocation: string;
  proposedLocation: string;
  luggageWeight: string;
  proposedPrice: string;
  paymentAccount: string;
  travelDate: Date;
  travelTime: string;
  selectedModes: unknown;
  coverSrc: string | null;
  avatarSrc: string | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
  };
}): AdminBooking {
  return {
    id: booking.id,
    reference: createBookingReference(
      booking.id,
      booking.createdAt
    ),

    userId: booking.userId,
    username: booking.user.username,

    fullName: booking.fullName,
    phone: booking.phone,
    nextOfKin: booking.nextOfKin,

    currentLocation: booking.currentLocation,
    proposedLocation: booking.proposedLocation,

    luggageWeight: booking.luggageWeight,
    proposedPrice: booking.proposedPrice,
    paymentAccount: booking.paymentAccount,

    travelDate: booking.travelDate.toISOString(),
    travelTime: booking.travelTime,

    selectedModes: booking.selectedModes,

    coverSrc: booking.coverSrc,
    avatarSrc: booking.avatarSrc,

    status: booking.status,

    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}

const bookingInclude = {
  user: {
    select: {
      username: true,
    },
  },
};

export const adminBookingService = {
  async getBookings(
    filters: AdminBookingFilters = {}
  ) {
    const where = filters.status
      ? {
          status: filters.status,
        }
      : undefined;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: bookingInclude,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.booking.count({
        where,
      }),
    ]);

    return {
      bookings: bookings.map(mapBooking),
      total,
    };
  },

  async getBookingById(
    bookingId: string
  ): Promise<AdminBooking | null> {
    if (!bookingId) {
      throw new Error("Booking ID is required");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: bookingInclude,
    });

    if (!booking) {
      return null;
    }

    return mapBooking(booking);
  },

  async approveBooking(
    bookingId: string
  ): Promise<AdminBooking> {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "PENDING") {
      throw new Error(
        `Booking cannot be approved because it is already ${booking.status}`
      );
    }

    const updated = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "APPROVED",
      },
      include: bookingInclude,
    });

    return mapBooking(updated);
  },

  async completeBooking(
    bookingId: string
  ): Promise<AdminBooking> {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "APPROVED") {
      throw new Error(
        `Booking cannot be completed because it is ${booking.status}`
      );
    }

    const updated = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "COMPLETED",
      },
      include: bookingInclude,
    });

    return mapBooking(updated);
  },

  async cancelBooking(
    bookingId: string
  ): Promise<AdminBooking> {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (
      booking.status !== "PENDING" &&
      booking.status !== "APPROVED"
    ) {
      throw new Error(
        `Booking cannot be cancelled because it is ${booking.status}`
      );
    }

    const updated = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "CANCELLED",
      },
      include: bookingInclude,
    });

    return mapBooking(updated);
  },
};