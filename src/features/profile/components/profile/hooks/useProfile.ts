import { useState } from "react";

import { mockProfile } from "../data/mockProfile";
import type { ProfileData } from "../types/profile.types";

export function useProfile(
  initialProfile: ProfileData = mockProfile
) {
  const [profile, setProfile] =
    useState<ProfileData>(initialProfile);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const updateProfile = (
    updates: Partial<ProfileData>
  ) => {
    setProfile((current) => ({
      ...current,
      ...updates,
    }));
  };

  return {
    profile,
    setProfile,
    updateProfile,
    isLoading,
    error,
  };
}