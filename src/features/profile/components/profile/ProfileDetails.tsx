import type { ProfileData } from "../../types/profile.types";
import { formatProfileDate } from "../../utils/formatDate";
import { InfoCard } from "../shared/InfoCard";

interface ProfileDetailsProps {
  profile: ProfileData;
}

export function ProfileDetails({
  profile,
}: ProfileDetailsProps) {
  const { form } = profile;

  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoCard
        label="Next of Kin"
        value={form.nextOfKin}
      />

      <InfoCard
        label="Proposed Price"
        value={form.proposedPrice}
      />

      <InfoCard
        label="Payment Account"
        value={form.paymentAccount}
      />

      <InfoCard
        label="Date"
        value={formatProfileDate(form.TravelDate)}
      />

      <InfoCard
        label="Time / Station"
        value={form.TravleTime}
      />

      <InfoCard
        label="Luggage Weight"
        value={form.luggageWeight}
      />
    </div>
  );
}