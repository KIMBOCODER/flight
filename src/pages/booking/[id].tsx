import type {
  GetServerSideProps,
} from "next";

import Head from "next/head";

import {
  PublicBookingProfile,
} from "@/features/dashboard/components/public";

import {
  publicBookingService,
} from "@/features/dashboard/services/public-booking.service";

import type {
  PublicBookingData,
} from "@/features/dashboard/types/public-booking.types";

interface PublicBookingPageProps {
  booking: PublicBookingData;
}

export default function PublicBookingPage({
  booking,
}: PublicBookingPageProps) {
  return (
    <>
      <Head>
        <title>{`${booking.fullName} — Booking Profile`}</title>

        <meta
          name="description"
          content={`Booking profile for ${booking.fullName}`}
        />

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main className="min-h-screen bg-muted/30 py-8 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              BOOKING PLATFORM
            </p>

            <h1 className="mt-2 text-xl font-bold">
              Booking Record
            </h1>
          </div>

          <PublicBookingProfile
            booking={booking}
          />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  PublicBookingPageProps
> = async ({ params }) => {
  const bookingId = params?.id;

  if (
    typeof bookingId !== "string" ||
    !bookingId
  ) {
    return {
      notFound: true,
    };
  }

  const booking =
    await publicBookingService.getPublicBookingById(
      bookingId
    );

  if (!booking) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      booking,
    },
  };
};