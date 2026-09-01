import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I cancel or change my flight?",
    answer: "Yes! Most tickets come with flexible cancellation and rebooking options. Free cancellation is available within 24 hours of booking. After that, fees may apply depending on the airline's policy.",
  },
  {
    question: "Are the prices on SkyBooker final?",
    answer: "The prices you see include all mandatory fees and taxes. Some airlines may charge additional fees for checked baggage, seat selection, or other optional services at the airport.",
  },
  {
    question: "How do I get my tickets after booking?",
    answer: "After completing your booking, you'll receive an email confirmation with your e-ticket. You can also access your tickets anytime through your SkyBooker account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and Apple Pay. All transactions are secured with industry-standard encryption.",
  },
  {
    question: "Do prices include baggage allowance?",
    answer: "Baggage policies vary by airline and ticket class. Your booking confirmation will clearly state what's included. You can always add extra baggage during booking or later through your account.",
  },
  {
    question: "What if I need help during my trip?",
    answer: "Our 24/7 customer support team is available via phone, email, or live chat. We're here to help you with any issues or questions before, during, and after your trip.",
  },
  {
    question: "How far in advance should I book?",
    answer: "For the best prices, we recommend booking 2-3 months in advance for domestic flights and 3-6 months for international flights. However, you can book up to 11 months in advance or as late as the day of departure.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We use bank-level encryption to protect your personal and payment information. We never share your data with third parties without your consent and comply with all international data protection regulations.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Everything you need to know about booking with SkyBooker
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
