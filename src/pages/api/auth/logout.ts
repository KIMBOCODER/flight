import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  AUTH_COOKIE, AUTH_COOKIE_MAX_AGE
} from "@/features/auth/constant/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  res.setHeader(
    "Set-Cookie",
    `${AUTH_COOKIE}=; Path=/; Max-Age=0; HttpOnly`
  );

  return res.status(200).json({
    success: true,
  });
}