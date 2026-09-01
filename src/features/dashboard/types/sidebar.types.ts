import type { LucideIcon } from "lucide-react";

export type SidebarRole = "USER" | "ADMIN";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: SidebarRole[];
  badge?: string;
}