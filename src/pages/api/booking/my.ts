import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/server/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await requireUser(req.headers.cookie);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(bookings);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
}