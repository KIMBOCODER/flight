import { BookingFormData } from "../types";

export async function searchBookings(data: BookingFormData) {
  console.log("Searching with:", data);

  // simulate API latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transportType: data.transportType,
        results: mockResults(data),
      });
    }, 1000);
  });
}

/**
 * MOCK RESULT GENERATOR (frontend only)
 */
function mockResults(data: BookingFormData) {
  return [
    {
      id: "1",
      provider: `${data.transportType.toUpperCase()} Express`,
      from: data.from,
      to: data.to,
      price: 250,
      duration: "4h 30m",
      departureDate: data.departureDate,
    },
    {
      id: "2",
      provider: `${data.transportType.toUpperCase()} Prime`,
      from: data.from,
      to: data.to,
      price: 320,
      duration: "3h 45m",
      departureDate: data.departureDate,
    },
  ];
}