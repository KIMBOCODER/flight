import { ReactNode } from "react";

import {
  ProtectedNavbar,
} from "@/features/auth/components/Navbar/ProtectedNavbar";

interface Props {
  user: {
    id: string;
    username: string;
  };

  children: ReactNode;
}

export function ProtectedShell({
  user,
  children,
}: Props) {
  return (
    <>
      <ProtectedNavbar
        user={user}
      />

      <main className="page-container py-8">
        {children}
      </main>
    </>
  );
}