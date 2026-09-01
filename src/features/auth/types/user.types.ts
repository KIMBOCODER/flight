import { UserRole } from "./role.types";

export interface User {
  id: string;
  username: string;
  role: UserRole;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  lastLoginAt: Date | null;
}