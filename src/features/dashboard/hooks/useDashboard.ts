import { useEffect, useState } from "react";

import { getDashboard } from "../services/dashboard.client";
import type { DashboardResponse } from "../types/dashboard.types";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const response = await getDashboard();

        if (!mounted) return;

        setData(response);
      } catch (err) {
        console.error(err);

        if (!mounted) return;

        setError("Failed to load dashboard.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    refresh: async () => {
      setLoading(true);

      try {
        const response = await getDashboard();

        setData(response);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to refresh dashboard.");
      } finally {
        setLoading(false);
      }
    },
  };
}