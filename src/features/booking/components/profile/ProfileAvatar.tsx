import { User } from "lucide-react";
import { getInitials } from "../../utils/getInitials";

interface ProfileAvatarProps {
  src?: string | null;
  fullName: string;
}

export function ProfileAvatar({
  src,
  fullName,
}: ProfileAvatarProps) {
  const initials = getInitials(fullName);

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary border-4 border-card">
      {src ? (
        <img
          src={src}
          alt={fullName}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {initials ? (
            <span className="text-xl font-semibold">
              {initials}
            </span>
          ) : (
            <User size={24} />
          )}
        </div>
      )}
    </div>
  );
}