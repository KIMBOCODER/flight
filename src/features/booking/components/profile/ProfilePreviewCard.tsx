import { Eye, EyeOff } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

import { BookingFormData } from "../../types/booking.types";
import { TransportMode } from "../../types/transport.types";

import { ProfileCover } from "./ProfileCover";
import { ProfileAvatar } from "./ProfileAvatar";
import { RouteBanner } from "./RouteBanner";
import { InfoCard } from "./InfoCard";
import { TransportTags } from "./TransportTags";
import { DownloadProfileButton } from "./DownloadProfileButton";

interface ProfilePreviewCardProps {
  form: BookingFormData;
  selectedModes: TransportMode[];

  showPreview: boolean;
  onTogglePreview: () => void;

  coverSrc?: string | null;
  avatarSrc?: string | null;
}

export function ProfilePreviewCard({
  form,
  selectedModes,
  showPreview,
  onTogglePreview,
  coverSrc,
  avatarSrc,
}: ProfilePreviewCardProps) {
  return (
    <div className="mt-10 border-t border-border pt-8">
      {/* Toggle button */}
      <button
        type="button"
        onClick={onTogglePreview}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 mb-6"
      >
        {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
        {showPreview ? "Hide preview" : "Preview your profile card"}
      </button>

      {/* Conditional preview card */}
      {showPreview && (
        <div
          id="profile-card"
          className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-8"
        >
          <ProfileCover src={coverSrc ?? undefined} />

          <div className="absolute left-5 top-20">
            <ProfileAvatar
              src={avatarSrc ?? undefined}
              fullName={form.fullName}
            />
          </div>

          <div className="pt-16 px-5 pb-5">
            <h2 className="text-xl font-semibold">
              {form.fullName || "Full Name"}
            </h2>

            <p className="text-sm text-muted-foreground">
              {form.phone || "Phone"}
            </p>

            <RouteBanner
              from={form.currentLocation}
              to={form.proposedLocation}
            />

            <div className="grid md:grid-cols-2 gap-3 mt-5">
              <InfoCard label="Next Of Kin" value={form.nextOfKin} />
              <InfoCard label="Price" value={form.proposedPrice} />
              <InfoCard label="Payment Account" value={form.paymentAccount} />
              <InfoCard label="Date" value={formatDate(form.travelDate)} />
              <InfoCard label="Time / Station" value={form.travelTime} />
              <InfoCard label="Luggage Weight" value={form.luggageWeight} />
            </div>

            <div className="mt-5">
              <TransportTags modes={selectedModes} />
            </div>

            <div className="mt-6">
              <DownloadProfileButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
