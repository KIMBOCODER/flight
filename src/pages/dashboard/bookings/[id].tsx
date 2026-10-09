import type {
  GetServerSideProps,
} from "next";

import { requireUser } from "@/features/auth/server/session";

import { DashboardLayout } from "@/features/dashboard/components/layout/DashboardLayout";

import { BookingProfile } from "@/features/dashboard/components/booking-profile";

import { bookingProfileService } from "@/features/dashboard/services/booking-profile.service";

import type {
  BookingProfilePageProps,
} from "@/features/dashboard/types/booking-profile.types";

export default function BookingProfilePage({
  user,
  booking,
}: BookingProfilePageProps) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto w-full max-w-6xl">
        <BookingProfile
          booking={booking}
        />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  BookingProfilePageProps
> = async ({
  req,
  params,
}) => {
  const user = await requireUser(
    req.headers.cookie
  );

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

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
    await bookingProfileService.getBookingById(
      bookingId,
      user.id
    );

  if (!booking) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },

      booking,
    },
  };
};