import { sidebarItems } from "../../data/sidebar";

import { SidebarItem } from "./SidebarItem";

interface DashboardSidebarProps {
  role: "USER" | "ADMIN";
}

export function DashboardSidebar({
  role,
}: DashboardSidebarProps) {
  const items = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <aside
      className="
        hidden
        lg:flex
        w-72
        flex-col
        border-r
        bg-card
        px-5
        py-6
      "
    >
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          Flight Booking
        </h1>

        <p className="text-sm text-muted-foreground">
          Dashboard
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
          />
        ))}
      </nav>
    </aside>
  );
}