import type { GetServerSideProps } from "next";

import { requireUser } from "@/features/auth/server/session";

import {
  DashboardLayout,
  PageTitle,
  DashboardCard,
} from "@/features/dashboard";

interface DashboardProfilePageProps {
  user: {
    id: string;
    username: string;
    role: "USER" | "ADMIN";
  };
}

export default function DashboardProfilePage({
  user,
}: DashboardProfilePageProps) {
  return (
    <DashboardLayout user={user}>
      <PageTitle
        title="Profile"
        description="Manage your account information."
      />

      <DashboardCard >
        Profile information goes here.
      </DashboardCard>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
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
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    },
  };
};