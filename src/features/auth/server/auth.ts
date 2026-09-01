import { jwtVerify, SignJWT } from "jose";
import { JwtPayload } from "../types/auth.types";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET missing");
  }

  return new TextEncoder().encode(secret);
};

export async function signToken(
  payload: JwtPayload
) {
  return await new SignJWT({
    username: payload.username,
    role: payload.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(
  token: string
) {
  const { payload } = await jwtVerify(
    token,
    getSecret()
  );

  return {
    userId: payload.sub as string,
    username: payload.username as string,
    role: payload.role as "USER" | "ADMIN",
  };
}