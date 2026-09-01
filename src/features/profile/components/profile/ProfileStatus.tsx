import { CheckCircle2 } from "lucide-react";

import type { ProfileData } from "../../types/profile.types";
import { getProfileStatus } from "../../utils/profileStatus";

interface ProfileStatusProps {
  profile: ProfileData;
}

export function ProfileStatus({
  profile,
}: ProfileStatusProps) {
  const status = getProfileStatus(profile);

  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={16}
        className={
          status.isComplete
            ? "text-green-600"
            : "text-muted-foreground"
        }
      />

      <span className="text-sm text-muted-foreground">
        {status.isComplete
          ? "Profile complete"
          : "Profile incomplete"}
      </span>
    </div>
  );
}