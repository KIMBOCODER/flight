import { useState } from "react";
import { useRouter } from "next/router";


export function useRegister() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);


  async function register(
    username: string,
    password: string
  ) {

    setLoading(true);


    try {

      const response = await fetch(
        "/api/auth/register",
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

        console.error(
          "Register API Error:",
          data
        );

        throw new Error(
          data.message ||
          "Registration failed"
        );
      }


      router.push("/dashboard");


      return data;


    } catch(error) {

      console.error(
        "Register failed:",
        error
      );

      throw error;


    } finally {

      setLoading(false);

    }
  }


  return {
    register,
    loading,
  };
}