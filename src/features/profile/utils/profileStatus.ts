import type {
  ProfileData,
  ProfileStatus,
} from "../types/profile.types";

export function getProfileStatus(
  profile: ProfileData
): ProfileStatus {
  const { form, transportModes } = profile;

  const personalComplete = [
    form.fullName,
    form.phone,
    form.nextOfKin,
    form.currentLocation,
    form.proposedLocation,
  ].every((value) => value.trim().length > 0);

  const transportComplete =
    form.luggageWeight.trim().length > 0 &&
    form.proposedPrice.trim().length > 0 &&
    transportModes.length > 0;

  const paymentComplete =
    form.paymentAccount.trim().length > 0 &&
    form.TravelDate.trim().length > 0;

  return {
    personalComplete,
    transportComplete,
    paymentComplete,

    isComplete:
      personalComplete &&
      transportComplete &&
      paymentComplete,
  };
}