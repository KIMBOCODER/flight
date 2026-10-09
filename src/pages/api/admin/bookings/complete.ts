import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { requireAdmin } from "@/features/auth/server/authorization";
import { adminBookingService } from "@/features/admin/services/admin-booking.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const admin = await requireAdmin(
      req.headers.cookie
    );

    if (!admin) {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const { bookingId } = req.body;

    if (
      typeof bookingId !== "string" ||
      !bookingId
    ) {
      return res.status(400).json({
        message: "Booking ID is required",
      });
    }

    const booking =
      await adminBookingService.completeBooking(
        bookingId
      );

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(
      "Complete booking error:",
      error
    );

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to complete booking",
    });
  }
}