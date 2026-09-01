import type { ProfileData } from "../types/profile.types";

export const mockProfile: ProfileData = {
  id: "profile-demo-001",

  userId: "user-demo-001",

  coverSrc: null,

  avatarSrc: null,

  form: {
    fullName: "Full Name",
    phone: "+234 000 000 0000",
    nextOfKin: "John Doe",

    currentLocation: "Lagos",
    proposedLocation: "Abuja",

    luggageWeight: "20kg",
    proposedPrice: "₦50,000",

    paymentAccount: "Opay - 1234567890",

    TravelDate: "2026-05-12",
    TravleTime: "10:00 AM / Jibowu",
  },

  transportModes: ["Car"],

  createdAt: "2026-05-01T10:00:00.000Z",

  updatedAt: "2026-05-01T10:00:00.000Z",
};