import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import Head from "next/head";

import {
  DownloadProfileButton,
  ProfileCard,
} from "@/features/profile";

import {
  getProfileById,
} from "@/features/profile/services/profile.service";

interface ProfilePageProps {
  profile: Awaited<
    ReturnType<typeof getProfileById>
  >;
}

export const getServerSideProps: GetServerSideProps<
  ProfilePageProps
> = async (context) => {
  const id = context.params?.id;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const profile = await getProfileById(id);

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile,
    },
  };
};

export default function ProfileDetailsPage({
  profile,
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  if (!profile) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {profile.form.fullName || "Profile"}
        </title>
      </Head>

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-light text-foreground">
                Profile
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Travel profile details
              </p>
            </div>

            <DownloadProfileButton
              profile={profile}
            />
          </div>

          <ProfileCard profile={profile} />
        </div>
      </main>
    </>
  );
}