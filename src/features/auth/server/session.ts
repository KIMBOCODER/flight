import { parse } from "cookie";

import { prisma } from "@/lib/prisma";

import { verifyToken } from "./auth";


export const AUTH_COOKIE = "auth_token";

export const AUTH_COOKIE_MAX_AGE =
  60 * 60 * 24 * 7; // 7 days



export async function requireUser(
  cookieHeader?: string
) {

  const user = await getSessionUser(
    cookieHeader
  );


  if (!user) {
    return null;
  }


  return user;
}



export async function getSessionUser(
  cookieHeader?: string
) {

  if (!cookieHeader) {
    return null;
  }


  const cookies = parse(
    cookieHeader
  );


  const token = cookies[AUTH_COOKIE];


  if (!token) {
    return null;
  }


  try {

    const payload = await verifyToken(
      token
    );


    const user =
      await prisma.user.findUnique({

        where: {
          id: payload.userId,
        },

        select: {
          id: true,
          username: true,
          role: true,
          isActive: true,
        },

      });



    if (!user) {
      return null;
    }


    if (!user.isActive) {
      return null;
    }


    return user;


  } catch (error) {

    console.error(
      "Session verification failed:",
      error
    );

    return null;
  }
}