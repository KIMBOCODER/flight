import { LogoutButton } from "./LogoutButton";

interface Props {
  username: string;
}

export function UserDropdown({
  username,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <span>
        {username}
      </span>

      <LogoutButton />
    </div>
  );
}