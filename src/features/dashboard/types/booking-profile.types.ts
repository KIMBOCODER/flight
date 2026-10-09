import type {
  BookingStatus,
  Role,
} from "@prisma/client";

export interface BookingProfileUser {
  id: string;
  username: string;
  role: Role;
}

export interface BookingProfileData {
  id: string;
  userId: string;

  fullName: string;
  phone: string;
  nextOfKin: string;

  currentLocation: string;
  proposedLocation: string;

  luggageWeight: string;
  proposedPrice: string;

  paymentAccount: string;

  travelDate: string;
  travelTime: string;

  selectedModes: unknown;

  coverSrc: string | null;
  avatarSrc: string | null;

  status: BookingStatus;

  createdAt: string;
  updatedAt: string;
}

export interface BookingProfilePageProps {
  user: BookingProfileUser;
  booking: BookingProfileData;
}