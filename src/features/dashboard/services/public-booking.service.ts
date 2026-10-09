import { prisma } from "@/lib/prisma";

import type {
  PublicBookingData,
} from "@/features/dashboard/types/public-booking.types";

export const publicBookingService = {
  async getPublicBookingById(
    bookingId: string
  ): Promise<PublicBookingData | null> {
    if (!bookingId) {
      throw new Error("Booking ID is required");
    }

    const booking =
      await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
        select: {
          id: true,

          fullName: true,
          phone: true,
          nextOfKin: true,

          currentLocation: true,
          proposedLocation: true,

          luggageWeight: true,
          proposedPrice: true,

          travelDate: true,
          travelTime: true,

          selectedModes: true,

          coverSrc: true,
          avatarSrc: true,

          status: true,

          createdAt: true,
          updatedAt: true,
        },
      });

    if (!booking) {
      return null;
    }

    return {
      id: booking.id,

      fullName: booking.fullName,
      phone: booking.phone,
      nextOfKin: booking.nextOfKin,

      currentLocation:
        booking.currentLocation,

      proposedLocation:
        booking.proposedLocation,

      luggageWeight:
        booking.luggageWeight,

      proposedPrice:
        booking.proposedPrice,

      travelDate:
        booking.travelDate.toISOString(),

      travelTime:
        booking.travelTime,

      selectedModes:
        booking.selectedModes,

      coverSrc:
        booking.coverSrc,

      avatarSrc:
        booking.avatarSrc,

      status:
        booking.status,

      createdAt:
        booking.createdAt.toISOString(),

      updatedAt:
        booking.updatedAt.toISOString(),
    };
  },
};