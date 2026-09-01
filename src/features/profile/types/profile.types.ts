import type { TransportMode } from "@/features/booking/types/transport.types";

export interface ProfileFormData {
  fullName: string;
  phone: string;
  nextOfKin: string;

  currentLocation: string;
  proposedLocation: string;

  luggageWeight: string;
  proposedPrice: string;

  paymentAccount: string;

  TravelDate: string;
  TravleTime: string;
}

export interface ProfileImages {
  coverSrc: string | null;
  avatarSrc: string | null;
}

export interface ProfileData extends ProfileImages {
  id?: string;
  userId?: string;

  form: ProfileFormData;

  transportModes: TransportMode[];

  createdAt?: string;
  updatedAt?: string;
}

export type ProfileErrors = Partial<
  Record<keyof ProfileFormData, string>
>;

export interface ProfileStatus {
  isComplete: boolean;
  personalComplete: boolean;
  transportComplete: boolean;
  paymentComplete: boolean;
}