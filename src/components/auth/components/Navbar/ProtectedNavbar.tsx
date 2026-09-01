import Link from "next/link";


import {
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";



import { Button } from "@/components/ui/button";


interface Props {
  user: {
    id: string;
    username: string;
  };
}

export function ProtectedNavbar({
  user,
}: Props) {
  return (
    <header className="border-b bg-background">
      <div className="page-container flex h-16 items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <LayoutDashboard className="h-5 w-5" />

          Dashboard
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={`/user/${user.id}`}
            className="flex items-center gap-2 text-sm"
          >
            <User className="h-4 w-4" />
            {user.username}
          </Link>

          <Button variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}