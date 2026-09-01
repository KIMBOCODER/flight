import type { ProfileData } from "../types/profile.types";

export async function downloadProfilePdf(
  profile: ProfileData
): Promise<void> {
  console.log(
    "PDF generation will be connected here:",
    profile
  );

  // PDF generation will be implemented here
  // when we add the PDF dependency.
}