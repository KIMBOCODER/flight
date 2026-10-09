import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { requireAdmin } from "@/features/auth/server/authorization";
import { adminBookingService } from "@/features/admin/services/admin-booking.service";

import type { BookingStatus } from "@prisma/client";

const VALID_STATUSES: BookingStatus[] = [
  "PENDING",
  "APPROVED",
  "COMPLETED",
  "CANCELLED",
];

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

    const statusParam =
      typeof req.query.status === "string"
        ? req.query.status
        : undefined;

    let status: BookingStatus | undefined;

    if (statusParam) {
      if (
        !VALID_STATUSES.includes(
          statusParam as BookingStatus
        )
      ) {
        return res.status(400).json({
          message: "Invalid booking status",
        });
      }

      status = statusParam as BookingStatus;
    }

    const result =
      await adminBookingService.getBookings({
        status,
      });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "Admin bookings API error:",
      error
    );

    return res.status(500).json({
      message: "Failed to load bookings",
    });
  }
}