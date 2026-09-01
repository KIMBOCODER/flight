import Head from "next/head";

import {
  UserPlus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  RegisterForm,
} from "@/features/auth/components";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <UserPlus className="h-10 w-10" />
            </div>

            <CardTitle>
              Create Account
            </CardTitle>

            <CardDescription>
              Start using the platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}