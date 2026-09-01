import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar, MapPin, Plane, Users } from "lucide-react";

import { BookingFormData, TripType, TransportType } from "../types";
import { searchBookings } from "../services/bookingService";

export function BookingForm() {
  const [tripType, setTripType] = useState<TripType>("round-trip");

  const [form, setForm] = useState<BookingFormData>({
    transportType: "flight",
    tripType: "round-trip",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabinClass: "economy",
  });

  const update = (key: keyof BookingFormData, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    const result = await searchBookings({
      ...form,
      tripType,
    });

    console.log(result);
  };

  return (
    <section className="py-12 -mt-16 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8 shadow-2xl">
          <div className="space-y-6">

            {/* Transport Type (matches your type.ts) */}
            <div className="flex gap-4 flex-wrap">
              {(["flight", "car", "train", "bus"] as TransportType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => update("transportType", type)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      form.transportType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                )
              )}
            </div>

            {/* Trip Type */}
            <div className="flex gap-4">
              {(["round-trip", "one-way"] as TripType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTripType(type);
                    update("tripType", type);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    tripType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type === "round-trip" ? "Round Trip" : "One Way"}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* From */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-blue-600" />
                  From
                </Label>
                <Input
                  value={form.from}
                  onChange={(e) => update("from", e.target.value)}
                  placeholder="New York (JFK)"
                />
              </div>

              {/* To */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  To
                </Label>
                <Input
                  value={form.to}
                  onChange={(e) => update("to", e.target.value)}
                  placeholder="London (LHR)"
                />
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Departure
                </Label>
                <Input
                  type="date"
                  value={form.departureDate}
                  onChange={(e) => update("departureDate", e.target.value)}
                />
              </div>

              {/* Return Date */}
              {form.tripType === "round-trip" && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Return
                  </Label>
                  <Input
                    type="date"
                    value={form.returnDate}
                    onChange={(e) => update("returnDate", e.target.value)}
                  />
                </div>
              )}

              {/* Passengers */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  Passengers
                </Label>

                <Select
                  value={String(form.passengers)}
                  onValueChange={(val : string) =>
                    update("passengers", Number(val))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} Passenger{n > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cabin Class */}
              {form.transportType === "flight" && (
                <div className="space-y-2">
                  <Label>Cabin Class</Label>

                  <Select
                    value={form.cabinClass}
                    onValueChange={(val: string) =>
                      update("cabinClass", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium economy">
                        Premium Economy
                      </SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full"
            >
              Search {form.transportType}s
            </Button>

          </div>
        </Card>
      </div>
    </section>
  );
}