import { z } from "zod";

export const bookingSchema = z.object({
  userId: z.string().min(1),

  fullName: z.string().min(2, "Full name is required"),

  phone: z.string().min(7, "Phone is required"),

  nextOfKin: z.string().min(2),

  currentLocation: z.string().min(2),
  proposedLocation: z.string().min(2),

  luggageWeight: z.string().min(1),
  proposedPrice: z.string().min(1),

  paymentAccount: z.string().min(3),

  travelDate: z.string().min(1),
  travelTime: z.string().min(1),

  selectedModes: z.any().optional(),

  coverSrc: z.string().optional(),
  avatarSrc: z.string().optional(),
});