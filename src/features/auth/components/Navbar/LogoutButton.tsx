import { Button } from "@/components/ui/button";

import {
  useLogout,
} from "../../hooks";

export function LogoutButton() {
  const { logout } =
    useLogout();

  return (
    <Button
      variant="outline"
      onClick={logout}
    >
      Logout
    </Button>
  );
}