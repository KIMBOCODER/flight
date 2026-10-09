export interface BookingFormData {
  
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
}

export type BookingErrors = Partial<
  Record<keyof BookingFormData | "coverSrc" | "avatarSrc", string>
>;