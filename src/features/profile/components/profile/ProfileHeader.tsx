import type { ProfileData } from "../../types/profile.types";
import { ProfileAvatar } from "./ProfileAvatar";

interface ProfileHeaderProps {
  profile: ProfileData;
}

export function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-end gap-4">
      <ProfileAvatar
        src={profile.avatarSrc}
        name={profile.form.fullName}
        size="lg"
      />

      <div className="pb-1">
        <h1 className="font-serif text-2xl font-light text-foreground">
          {profile.form.fullName || "Full Name"}
        </h1>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {profile.form.phone || "+234 000 000 0000"}
        </p>
      </div>
    </div>
  );
}