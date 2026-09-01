import Link from "next/link";
import { useRouter } from "next/router";

import { SidebarNavItem as SidebarItemType } from "../../types/sidebar.types";

interface SidebarItemProps {
  item: SidebarItemType;
}

export function SidebarItem({
  item,
}: SidebarItemProps) {
  const router = useRouter();

  const active =
    router.pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
        flex items-center gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        font-medium
        transition-all

        ${
          active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      <Icon className="h-5 w-5" />

      <span>{item.title}</span>

      {item.badge && (
        <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}