import {
  Hero,
  PopularDestinations,
  Features,
  Testimonials,
  FAQ,
  CTA,
} from "@/features/landing";

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularDestinations />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}