import { UserRole } from "./role.types";

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
}

export interface SessionUser {
  id: string;
  username: string;
  role: UserRole;
}

export interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
}