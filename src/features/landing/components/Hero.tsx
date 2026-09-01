import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Your Journey Begins Here
            </h1>
            <p className="text-lg sm:text-xl text-blue-100">
              Book flights to over 500 destinations worldwide. Best prices guaranteed, seamless experience, 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button  size="lg"  variant="secondary" className="group">
                Start Booking
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Explore Destinations
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">120+</div>
                <div className="text-blue-200 text-sm">Airlines</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99%</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right: This space can hold the booking form preview */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="h-12 bg-white/20 rounded-lg"></div>
                  <div className="h-12 bg-white/20 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                  </div>
                  <div className="h-12 bg-blue-500 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
