import Head from "next/head";

import {
  LogIn,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  LoginForm,
} from "@/features/auth/components";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <LogIn className="h-10 w-10" />
            </div>

            <CardTitle>
              Welcome Back
            </CardTitle>

            <CardDescription>
              Sign in to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}