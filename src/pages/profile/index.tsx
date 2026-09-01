import Head from "next/head";

import {
  DownloadProfileButton,
  ProfileCard,
  useProfile,
} from "@/features/profile";

export default function ProfilePage() {
  const { profile } = useProfile();

  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta
          name="description"
          content="View your travel profile"
        />
      </Head>

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-3xl font-light text-foreground">
                  My Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  View your travel and transport information.
                </p>
              </div>

              <DownloadProfileButton
                profile={profile}
              />
            </div>
          </div>

          <ProfileCard profile={profile} />
        </div>
      </main>
    </>
  );
}