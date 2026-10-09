import type { GetServerSideProps } from "next";

import { requireUser } from "@/features/auth/server/session";

import {
  DashboardLayout,
  DashboardCard,
  PageTitle,
} from "@/features/dashboard";

interface DashboardSettingsPageProps {
  user: {
    id: string;
    username: string;
    role: "USER" | "ADMIN";
  };
}

export default function DashboardSettingsPage({
  user,
}: DashboardSettingsPageProps) {
  return (
    <DashboardLayout user={user}>
      <PageTitle
        title="Settings"
        description="Manage your account preferences and application settings."
      />

<DashboardCard
  title="Settings"
  value="Settings page."
/>     
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