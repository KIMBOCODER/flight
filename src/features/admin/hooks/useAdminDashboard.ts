import { useCallback, useEffect, useState } from "react";

import type { AdminDashboardData } from "@/features/admin/types/admin.types";

interface UseAdminDashboardResult {
  data: AdminDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAdminDashboard(): UseAdminDashboardResult {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/dashboard");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load admin dashboard",
        );
      }

      setData(result.data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load admin dashboard",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchDashboard();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
}