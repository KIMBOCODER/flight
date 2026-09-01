import type { ProfileData } from "../types/profile.types";

export async function getServerProfile(
  userId: string
): Promise<ProfileData | null> {
  /**
   * Backend integration placeholder.
   *
   * Later this function will:
   *
   * 1. Query Prisma.
   * 2. Verify the authenticated user.
   * 3. Return the user's profile.
   */

  console.log("Fetching profile for:", userId);

  return null;
}