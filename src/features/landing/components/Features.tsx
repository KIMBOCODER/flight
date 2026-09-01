import { ShieldCheck, Clock, CreditCard, Headphones, Globe, Ticket } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description: "Your payment information is protected with industry-leading encryption and security measures.",
  },
  {
    icon: Clock,
    title: "Fast Booking",
    description: "Book your flights in under 3 minutes with our streamlined booking process.",
  },
  {
    icon: CreditCard,
    title: "Best Price Guarantee",
    description: "We guarantee the lowest prices. Find a better deal and we'll match it plus give you 10% off.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you anytime, anywhere.",
  },
  {
    icon: Globe,
    title: "500+ Destinations",
    description: "Access flights to over 500 destinations worldwide with 120+ partner airlines.",
  },
  {
    icon: Ticket,
    title: "Flexible Tickets",
    description: "Free cancellation and rebooking options available on most tickets for peace of mind.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose SkyBooker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making your travel booking experience seamless, secure, and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
