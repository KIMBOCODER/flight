import type { ProfileData } from "../types/profile.types";

export function mapProfileData(
  data: Partial<ProfileData>
): ProfileData {
  return {
    id: data.id,

    userId: data.userId,

    coverSrc: data.coverSrc ?? null,

    avatarSrc: data.avatarSrc ?? null,

    form: {
      fullName: data.form?.fullName ?? "",
      phone: data.form?.phone ?? "",
      nextOfKin: data.form?.nextOfKin ?? "",

      currentLocation: data.form?.currentLocation ?? "",
      proposedLocation: data.form?.proposedLocation ?? "",

      luggageWeight: data.form?.luggageWeight ?? "",
      proposedPrice: data.form?.proposedPrice ?? "",

      paymentAccount: data.form?.paymentAccount ?? "",

      TravelDate: data.form?.TravelDate ?? "",
      TravleTime: data.form?.TravleTime ?? "",
    },

    transportModes: data.transportModes ?? [],

    createdAt: data.createdAt,

    updatedAt: data.updatedAt,
  };
}