export const PROFILE_MAX_AVATAR_SIZE = 5 * 1024 * 1024;

export const PROFILE_MAX_COVER_SIZE = 10 * 1024 * 1024;

export const PROFILE_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const PROFILE_SECTIONS = {
  PERSONAL: "Personal Information",
  TRANSPORT: "Transport Details",
  PAYMENT: "Payment & Schedule",
} as const;