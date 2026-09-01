import { useRouter } from "next/router";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    await fetch(
      "/api/auth/logout",
      {
        method: "POST",
      }
    );

    router.push("/login");
  }

  return {
    logout,
  };
} 