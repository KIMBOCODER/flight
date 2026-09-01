import type { ProfileData } from "../../types/profile.types";

import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileCover } from "./ProfileCover";
import { ProfileDetails } from "./ProfileDetails";
import { ProfileStatus } from "./ProfileStatus";
import { RouteBanner } from "./RouteBanner";
import { TransportTags } from "./TransportTags";

interface ProfileCardProps {
  profile: ProfileData;
}

export function ProfileCard({
  profile,
}: ProfileCardProps) {
  const { form } = profile;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <ProfileCover src={profile.coverSrc} />

      <div className="relative px-5 pb-6">
        <div className="-mt-8">
          <ProfileAvatar
            src={profile.avatarSrc}
            name={form.fullName}
            size="md"
          />
        </div>

        <div className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-light text-foreground">
                {form.fullName || "Full Name"}
              </h2>

              <p className="mt-0.5 text-sm text-muted-foreground">
                {form.phone || "—"}
              </p>
            </div>

            <ProfileStatus profile={profile} />
          </div>

          <RouteBanner
            from={form.currentLocation}
            to={form.proposedLocation}
          />

          <ProfileDetails profile={profile} />

          <TransportTags
            modes={profile.transportModes}
          />
        </div>
      </div>
    </div>
  );
}