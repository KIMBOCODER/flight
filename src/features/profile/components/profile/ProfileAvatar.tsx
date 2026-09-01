import { User } from "lucide-react";

import { getInitials } from "../../utils/getInitials";

interface ProfileAvatarProps {
  src: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

export function ProfileAvatar({
  src,
  name,
  size = "md",
}: ProfileAvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={`${sizes[size]} overflow-hidden rounded-full bg-secondary ring-4 ring-card`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {initials ? (
            <span className="font-serif text-xl italic text-foreground/60">
              {initials}
            </span>
          ) : (
            <User className="text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
}