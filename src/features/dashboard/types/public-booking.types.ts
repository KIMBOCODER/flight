import type {
  BookingStatus,
} from "@prisma/client";

export interface PublicBookingData {
  id: string;

  fullName: string;
  phone: string;
  nextOfKin: string;

  currentLocation: string;
  proposedLocation: string;

  luggageWeight: string;
  proposedPrice: string;

  travelDate: string;
  travelTime: string;

  selectedModes: unknown;

  coverSrc: string | null;
  avatarSrc: string | null;

  status: BookingStatus;

  createdAt: string;
  updatedAt: string;
}