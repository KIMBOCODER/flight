import type { ReactNode } from "react";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

interface DashboardLayoutProps {
  children: ReactNode;

  user: {
    id: string;
    username: string;
    role: "USER" | "ADMIN";
  };
}

export function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/40">

      <DashboardSidebar
        role={user.role}
      />

      <div className="flex flex-1 flex-col">

        <DashboardTopbar
          role={user.role}
        />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}