import { prisma } from "@/lib/prisma";

import type {
  BookingProfileData,
} from "@/features/dashboard/types/booking-profile.types";

export const bookingProfileService = {
  async getBookingById(
    bookingId: string,
    userId: string
  ): Promise<BookingProfileData | null> {
    if (!bookingId) {
      throw new Error("Booking ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const booking =
      await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId,
        },
      });

    if (!booking) {
      return null;
    }

    return {
      id: booking.id,
      userId: booking.userId,

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

      paymentAccount:
        booking.paymentAccount,

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