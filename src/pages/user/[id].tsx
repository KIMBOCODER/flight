import type { GetServerSideProps } from "next";

import { User, Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { prisma } from "@/lib/prisma";

import { requireUser } from "@/features/auth/server/session";

import { ProtectedShell } from "@/components/layout/Protectedshell";

interface Props {
  viewer: {
    id: string;
    username: string;
    role: string;
  };

  profile: {
    id: string;
    username: string;
    role: string;
  };
}

export default function UserPage({
  viewer,
  profile,
}: Props) {
  return (
    <ProtectedShell user={viewer}>
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5" />

            <span>
              {profile?.username ?? "Unknown User"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5" />

            <span>
              {profile?.role ?? "No Role Assigned"}
            </span>
          </div>
        </CardContent>
      </Card>
    </ProtectedShell>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const viewer = await requireUser(
    req.headers.cookie
  );

  if (!viewer) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      viewer: JSON.parse(
        JSON.stringify(viewer)
      ),
      profile: JSON.parse(
        JSON.stringify(profile)
      ),
    },
  };
};