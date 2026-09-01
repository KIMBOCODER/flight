import { BookingProfile } from "../types/booking.types";

export const mockProfile: BookingProfile = {
  coverSrc: null,
  avatarSrc: null,

  transportModes: ["Car"],

  form: {
    fullName: "",
    phone: "",
    nextOfKin: "",

    currentLocation: "",
    proposedLocation: "",

    luggageWeight: "",
    proposedPrice: "",

    paymentAccount: "",

    date: "",
    timeStation: "",
  },
};