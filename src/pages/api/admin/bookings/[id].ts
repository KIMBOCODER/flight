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
  if (req.method !== "GET") {
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

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const booking =
      await adminBookingService.getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(
      "Admin booking detail API error:",
      error
    );

    return res.status(500).json({
      message: "Failed to load booking",
    });
  }
}