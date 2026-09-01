import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  getSessionUser,
} from "@/features/auth/server/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user =
    await getSessionUser(
      req.headers.cookie
    );

  if (!user) {
    return res.status(401).json({
      user: null,
    });
  }

  return res.status(200).json({
    user,
  });
}