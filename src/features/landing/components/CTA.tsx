import { Button } from "@/components/ui/button";
import { ArrowRight, Plane } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
          <Plane className="h-8 w-8" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join over 50,000 travelers who trust SkyBooker for their flight bookings.
          Start your journey today with unbeatable prices and exceptional service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="group">
            Book Your Flight Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            Browse Destinations
          </Button>
        </div>
        <p className="mt-8 text-sm text-blue-200">
          No hidden fees • 24/7 support • Secure booking
        </p>
      </div>
    </section>
  );
}
