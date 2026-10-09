import type {
  GetServerSideProps,
} from "next";

import { requireAdmin } from "@/features/auth/server/authorization";
import { AdminDashboard } from "@/features/admin/components/dashboard/AdminDashboard";

export default function AdminPage() {
  return <AdminDashboard />;
}

export const getServerSideProps: GetServerSideProps =
  async (context) => {
    const admin = await requireAdmin(
      context.req.headers.cookie
    );

    if (!admin) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  };