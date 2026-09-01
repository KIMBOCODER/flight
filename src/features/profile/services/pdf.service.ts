import type { ProfileData } from "../types/profile.types";

export async function generateProfilePdf(
  profile: ProfileData
): Promise<void> {
  /**
   * PDF implementation will be added later.
   *
   * This service keeps PDF generation away
   * from the UI components.
   */

  console.log(
    "Generating profile PDF:",
    profile.id
  );
}