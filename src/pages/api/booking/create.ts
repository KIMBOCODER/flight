
import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/server/session";
import { bookingSchema } from "@/features/booking/validation/booking.schema";

function isAllowedCloudinaryImageUrl(
  value: string | null | undefined,
  userId: string,
  type: "cover" | "avatar"
): boolean {
  if (!value) return true;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudName) return false;

  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" ||
      url.hostname !== "res.cloudinary.com" ||
      url.port ||
      url.username ||
      url.password
    ) {
      return false;
    }

    const segments = url.pathname.split("/").filter(Boolean);

    if (
      segments.length < 7 ||
      segments[0] !== cloudName ||
      segments[1] !== "image" ||
      segments[2] !== "upload"
    ) {
      return false;
    }

    let index = 3;

    // Cloudinary may insert a version segment such as v1792071448.
    if (/^v\d+$/.test(segments[index])) {
      index++;
    }

    const expectedFolder = [
      "flight-booking",
      userId,
      type === "cover" ? "covers" : "avatars",
    ];

    const actualFolder = segments.slice(
      index,
      index + expectedFolder.length
    );

    if (
      actualFolder.length !== expectedFolder.length ||
      !expectedFolder.every(
        (segment, position) =>
          actualFolder[position] === segment
      )
    ) {
      return false;
    }

    // Require one filename after the expected folder.
    const remaining = segments.slice(
      index + expectedFolder.length
    );

    return (
      remaining.length === 1 &&
      /\.(jpe?g|png|webp)$/i.test(remaining[0])
    );
  } catch {
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const user = await requireUser(req.headers.cookie);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

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

    if (
      !isAllowedCloudinaryImageUrl(
        data.coverSrc,
        user.id,
        "cover"
      ) ||
      !isAllowedCloudinaryImageUrl(
        data.avatarSrc,
        user.id,
        "avatar"
      )
    ) {
      return res.status(400).json({
        message: "Invalid cover or avatar image URL.",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,

        fullName: data.fullName,
        phone: data.phone,
        nextOfKin: data.nextOfKin,

        currentLocation: data.currentLocation,
        proposedLocation: data.proposedLocation,

        luggageWeight: data.luggageWeight,
        proposedPrice: data.proposedPrice,

        paymentAccount: data.paymentAccount,

        travelDate: new Date(data.travelDate),
        travelTime: data.travelTime,

        selectedModes: data.selectedModes,

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
