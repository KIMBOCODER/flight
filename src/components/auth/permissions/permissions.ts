import { ROLES, type Role } from "./roles";

export const PERMISSIONS = {
  VIEW_DASHBOARD: "view:dashboard",
  VIEW_PROFILE: "view:profile",
  ACCESS_ADMIN: "access:admin",
  MANAGE_USERS: "manage:users",
  MANAGE_SETTINGS: "manage:settings",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  [ROLES.USER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROFILE,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.ACCESS_ADMIN,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
};

export function hasPermission(role: Role, permission: Permission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAccessAdmin(role: Role) {
  return hasPermission(role, PERMISSIONS.ACCESS_ADMIN);
}