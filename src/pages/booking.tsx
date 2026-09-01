import type { GetServerSideProps } from "next";

import { BookingForm } from "@/features/booking/components/form/BookingForm";
import { requireUser } from "@/features/auth/server/session";

export default function BookingPage({ user }: any) {
  return <BookingForm userId={user.id} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await requireUser(req.headers.cookie);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};