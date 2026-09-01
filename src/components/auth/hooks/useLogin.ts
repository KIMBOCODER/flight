import { useState } from "react";
import { useRouter } from "next/router";

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function login(
    username: string,
    password: string
  ) {
    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      router.push("/dashboard");

      return data;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}