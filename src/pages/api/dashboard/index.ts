import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { requireUser } from "@/features/auth/server/session";
import { dashboardService } from "@/features/dashboard/services/dashboard.service";


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


    const dashboard =
      await dashboardService.getDashboard(
        user.id
      );


    return res.status(200).json(
      dashboard
    );


  } catch (error) {

    console.error(
      "DASHBOARD API ERROR:",
      error
    );


    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to load dashboard",
    });

  }

}