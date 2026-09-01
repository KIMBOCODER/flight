import { getSessionUser } from "./session";
import { ROLES, type Role } from "../permissions/roles";
import {
  hasPermission,
  type Permission,
} from "../permissions/permissions";

export type AuthenticatedUser = NonNullable<
  Awaited<ReturnType<typeof getSessionUser>>
>;

export async function requireAuth(cookieHeader?: string | null) {
  if (!cookieHeader) return null;
  return getSessionUser(cookieHeader);
}

export async function requireRole(
  cookieHeader: string | undefined,
  allowedRoles: Role[]
) {
  const user = await requireAuth(cookieHeader);

  if (!user) return null;

  if (!allowedRoles.includes(user.role as Role)) {
    return null;
  }

  return user;
}

export async function requireAdmin(cookieHeader?: string | null) {
  return requireRole(cookieHeader ?? undefined, [ROLES.ADMIN]);
}

export async function requirePermission(
  cookieHeader: string | undefined,
  permission: Permission
) {
  const user = await requireAuth(cookieHeader);

  if (!user) return null;

  if (!hasPermission(user.role as Role, permission)) {
    return null;
  }

  return user;
}