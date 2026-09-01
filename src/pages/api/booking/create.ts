import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/server/session";
import { bookingSchema } from "@/features/booking/validation/booking.schema";

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
    // Authenticate user
    const user = await requireUser(req.headers.cookie);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Validate request body
    const parsed = bookingSchema.safeParse(req.body);

    if (!parsed.success) {
      console.log(
        "Booking Validation Error:",
        parsed.error.flatten()
      );

      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        // Always trust the authenticated session
        userId: user.id,

        fullName: data.fullName,
        phone: data.phone,
        nextOfKin: data.nextOfKin,

        currentLocation: data.currentLocation,
        proposedLocation: data.proposedLocation,

        luggageWeight: data.luggageWeight,
        proposedPrice: data.proposedPrice,

        paymentAccount: data.paymentAccount,

        // Updated schema fields
        travelDate: new Date(data.travelDate),
        travelTime: data.travelTime,

        selectedModes: data.selectedModes,

        // These should eventually contain Cloudinary URLs
        coverSrc: data.coverSrc ?? null,
        avatarSrc: data.avatarSrc ?? null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}