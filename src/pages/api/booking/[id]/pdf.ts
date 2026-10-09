
import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { renderToBuffer } from "@react-pdf/renderer";

import { requireUser } from "@/features/auth/server/session";

import { bookingProfileService } from "@/features/dashboard/services/booking-profile.service";

import { createBookingPdfDocument } from "@/features/dashboard/components/booking-pdf/BookingPdfDocument";

function createBookingReference(
  id: string,
  createdAt: string
) {
  const date = new Date(createdAt);
  const year = date.getFullYear();

  const shortId = id
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase();

  return `BK-${year}-${shortId}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const user = await requireUser(
      req.headers.cookie
    );

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const bookingId = req.query.id;

    if (
      typeof bookingId !== "string" ||
      !bookingId
    ) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const booking =
      await bookingProfileService.getBookingById(
        bookingId,
        user.id
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const reference =
      createBookingReference(
        booking.id,
        booking.createdAt
      );

    const protocol =
      typeof req.headers["x-forwarded-proto"] ===
      "string"
        ? req.headers["x-forwarded-proto"]
        : "http";

    const host = req.headers.host;

    if (!host) {
      return res.status(500).json({
        message: "Unable to determine host",
      });
    }

    const publicUrl =
      `${protocol}://${host}/booking/${booking.id}`;

    const document =
      createBookingPdfDocument({
        booking: {
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
            booking.travelDate,
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
            booking.createdAt,
          updatedAt:
            booking.updatedAt,
        },
        reference,
        publicUrl,
      });

    const pdf = await renderToBuffer(
      document
    );

    const filename =
      `booking-${reference}.pdf`;

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    return res.status(200).send(pdf);
  } catch (error) {
    console.error(
      "PDF generation error:",
      error
    );

    return res.status(500).json({
      message: "Failed to generate PDF",
    });
  }
}