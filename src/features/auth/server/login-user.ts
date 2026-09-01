import { prisma } from "@/lib/prisma";

import { verifyPassword } from "./password";

export async function loginUser(
  username: string,
  password: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        username,
      },
    });

  if (!user) {
    throw new Error(
      "Invalid username or password"
    );
  }

  const valid =
    await verifyPassword(
      password,
      user.passwordHash
    );

  if (!valid) {
    throw new Error(
      "Invalid username or password"
    );
  }

  if (!user.isActive) {
    throw new Error(
      "Account disabled"
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
}