import { LogOut, User } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export function UserDropdown() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <User className="h-5 w-5" />
      </div>

      <div className="hidden sm:block">
        <p className="font-semibold">
          My Account
        </p>

        <p className="text-xs text-muted-foreground">
          Logged In
        </p>
      </div>

      <Link href="/api/auth/logout">
        <Button
          size="icon"
          variant="ghost"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}