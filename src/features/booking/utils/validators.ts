
import {
  BookingErrors,
  BookingFormData,
} from "../types/booking.types";

export function validateBookingForm(
  form: BookingFormData
): BookingErrors {
  const errors: BookingErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (form.phone.trim().length < 7) {
    errors.phone = "Enter a valid phone number";
  }

  if (!form.nextOfKin.trim()) {
    errors.nextOfKin = "Next of kin is required";
  }

  if (!form.currentLocation.trim()) {
    errors.currentLocation = "Current location is required";
  }

  if (!form.proposedLocation.trim()) {
    errors.proposedLocation = "Destination is required";
  }

  if (!form.luggageWeight.trim()) {
    errors.luggageWeight = "Luggage weight is required";
  }

  if (!form.proposedPrice.trim()) {
    errors.proposedPrice = "Proposed price is required";
  }

  if (!form.paymentAccount.trim()) {
    errors.paymentAccount = "Payment account is required";
  }

  if (!form.travelDate.trim()) {
    errors.travelDate = "Travel date is required";
  }

  if (!form.travelTime.trim()) {
    errors.travelTime = "Travel time is required";
  }

  return errors;
}
