import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Traveler",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "SkyBooker made booking my business trips so easy! The interface is intuitive and I always find the best deals. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Frequent Flyer",
    avatar: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    comment: "I've been using SkyBooker for years. Their customer support is outstanding and the booking process is incredibly smooth.",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment: "As someone who travels constantly, I need a reliable booking platform. SkyBooker delivers every time with great prices and service.",
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Family Vacation Planner",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment: "Booking family vacations used to be stressful, but SkyBooker makes it simple. Love the flexibility and peace of mind they offer.",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Digital Nomad",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    comment: "Perfect for my nomadic lifestyle! Quick bookings, great prices, and excellent customer service. What more could you ask for?",
  },
  {
    id: 6,
    name: "James Taylor",
    role: "Corporate Executive",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    comment: "The best flight booking platform I've used. Professional, reliable, and always delivers on their promises. Five stars!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who trust SkyBooker for their flight bookings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
