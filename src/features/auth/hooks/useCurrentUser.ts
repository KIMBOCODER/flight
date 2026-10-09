import { useCallback, useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchUser();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchUser]);

  return {
    user,
    loading,
    refetch: fetchUser,
  };
}