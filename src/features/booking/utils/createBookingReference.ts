interface BookingReferenceInput {
  id: string;
  createdAt: string | Date;
}

export function createBookingReference(
  booking: BookingReferenceInput
) {
  const date = new Date(
    booking.createdAt
  );

  const year = date.getFullYear();

  const shortId = booking.id
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase();

  return `BK-${year}-${shortId}`;
}