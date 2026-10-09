import type { NextApiRequest, NextApiResponse } from "next";

import { requireAdmin } from "@/features/auth/server/authorization";
import { adminDashboardService } from "@/features/admin/services/admin-dashboard.service";

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
    const admin = await requireAdmin(req.headers.cookie);

    if (!admin) {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const dashboard =
      await adminDashboardService.getDashboard();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error(
      "Admin dashboard API error:",
      error
    );

    return res.status(500).json({
      message: "Failed to load admin dashboard",
    });
  }
}