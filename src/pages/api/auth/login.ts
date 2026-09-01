import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  loginSchema,
} from "@/features/auth/validators/login.schema";

import {
  loginUser,
} from "@/features/auth/server/login-user";

import {
  signToken,
} from "@/features/auth/server/auth";

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

  try {
    const parsed =
      loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        errors:
          parsed.error.flatten(),
      });
    }

    const {
      username,
      password,
    } = parsed.data;

    const user =
      await loginUser(
        username,
        password
      );

    const token =
      await signToken({
        userId: user.id,
        username: user.username,
        role: user.role,
      });

    res.setHeader(
      "Set-Cookie",
      `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${AUTH_COOKIE_MAX_AGE}; ${
    process.env.NODE_ENV === "production" ? "Secure;" : ""
  }`
    );

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
}