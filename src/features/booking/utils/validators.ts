import {
  BookingErrors,
  BookingFormData,
} from "../types/booking.types";

export function validateBookingForm(
  form: BookingFormData
): BookingErrors {
  const errors: BookingErrors = {};

  if (!form.fullName.trim())
    errors.fullName = "Full name is required";

  if (!form.phone.trim())
    errors.phone = "Phone number is required";

  if (!form.nextOfKin.trim())
    errors.nextOfKin = "Next of kin is required";

  if (!form.currentLocation.trim())
    errors.currentLocation =
      "Current location is required";

  if (!form.proposedLocation.trim())
    errors.proposedLocation =
      "Destination is required";

  if (!form.proposedPrice.trim())
    errors.proposedPrice =
      "Proposed price is required";

  if (!form.paymentAccount.trim())
    errors.paymentAccount =
      "Payment account is required";

  if (!form.travelDate.trim())
    errors.travelDate = "Date is required";

  

  return errors;
}