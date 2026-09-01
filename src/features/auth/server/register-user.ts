import { prisma } from "@/lib/prisma";

import { hashPassword } from "./password";


export async function registerUser(
  username: string,
  password: string
) {

  const existingUser =
    await prisma.user.findUnique({
      where: {
        username,
      },
    });


  if (existingUser) {
    throw new Error(
      "Username already exists"
    );
  }


  const passwordHash =
    await hashPassword(password);


  const user =
    await prisma.user.create({

      data: {

        username,

        passwordHash,

        role: "USER",

        isActive: true,

      },


      select: {

        id: true,

        username: true,

        role: true,

      },

    });


  return user;
}