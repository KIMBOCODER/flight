
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  Hero,
  PopularDestinations,
  Features,
  Testimonials,
  FAQ,
  CTA,
} from "@/features/landing";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && user) {
      void router.replace("/dashboard");
    }
  }, [loading, user, router]);

  // Wait for the authentication check before showing the landing page.
  if (loading || user) {
    return null;
  }

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
