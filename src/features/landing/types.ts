export type TransportType = "flight" | "car" | "train" | "bus";

export type TripType = "one-way" | "round-trip";

export interface BookingFormData {
  transportType: TransportType;
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: string;
}