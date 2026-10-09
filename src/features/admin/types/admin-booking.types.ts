import type { BookingStatus } from "@prisma/client";

export interface AdminBooking {
  id: string;
  reference: string;

  userId: string;
  username: string;

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

export interface AdminBookingListResponse {
  bookings: AdminBooking[];
  total: number;
}

export interface AdminBookingFilters {
  status?: BookingStatus;
}

export interface AdminBookingActionResponse {
  success: boolean;
  booking: AdminBooking;
}