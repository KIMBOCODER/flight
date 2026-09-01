import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  registerSchema,
} from "@/features/auth/validators/register.schema";

import {
  registerUser,
} from "@/features/auth/server/register-user";

import {
  signToken,
} from "@/features/auth/server/auth";

import {
  AUTH_COOKIE,  AUTH_COOKIE_MAX_AGE
} from "@/features/auth/server/session";



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
      registerSchema.safeParse(req.body);

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
      await registerUser(
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

    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
}