import type { ImageType } from "../types/upload.types";

export async function prepareProfileUpload(
  type: ImageType
) {
  /**
   * Backend upload preparation placeholder.
   *
   * Cloudinary integration will eventually
   * live behind this boundary.
   */

  return {
    type,
    ready: false,
  };
}