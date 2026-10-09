import type { GetServerSideProps } from "next";

import {
  DashboardLayout,
  PageTitle,
  EmptyState,
} from "@/features/dashboard";

import { requireUser } from "@/features/auth/server/session";



interface DashboardBookingsPageProps {
  user: {

    id: string;
    username: string;
    role: "USER" | "ADMIN";
  };
}


export default function DashboardBookingsPage({
  user,
}: DashboardBookingsPageProps) {

  return (
    <DashboardLayout user={user}>

      <PageTitle
        title="My Bookings"
        description="View and manage all your travel bookings."
      />

      <EmptyState
        title="No bookings found"
        description="Create your first booking to get started."
      />

    </DashboardLayout>
  );
}


export const getServerSideProps: GetServerSideProps = async ({
  req,
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


  return {
    props: {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    },
  };
};