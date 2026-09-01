import type { ImageType } from "../types/upload.types";

export async function uploadProfileImage(
  file: File,
  type: ImageType
): Promise<string> {
  /**
   * Frontend stage:
   * Return a local object URL.
   *
   * Later:
   * Cloudinary upload/API integration goes here.
   */

  console.log(
    `Preparing ${type} image for upload:`,
    file.name
  );

  return URL.createObjectURL(file);
}