import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  User,
  Settings,
  Shield,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

import { SidebarItem } from "../types/sidebar.types";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["USER", "ADMIN"],
  },

  {
    title: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarDays,
    roles: ["USER", "ADMIN"],
  },

  {
    title: "New Booking",
    href: "/booking",
    icon: PlusCircle,
    roles: ["USER", "ADMIN"],
  },

  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    roles: ["USER", "ADMIN"],
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["USER", "ADMIN"],
  },

  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: Shield,
    roles: ["ADMIN"],
  },

  {
    title: "Manage Users",
    href: "/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },

  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
    roles: ["ADMIN"],
  },

  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
    roles: ["USER", "ADMIN"],
  },
];