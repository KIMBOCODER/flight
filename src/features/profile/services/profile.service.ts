import { mockProfile } from "../data/mockProfile";
import type { ProfileData } from ".../types/profile.types";

export async function getProfile(): Promise<ProfileData> {
  return mockProfile;
}

export async function getProfileById(
  id: string
): Promise<ProfileData | null> {
  if (id !== mockProfile.id) {
    return null;
  }

  return mockProfile;
}