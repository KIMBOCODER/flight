import type { DashboardResponse } from "../types/dashboard.types";

const DASHBOARD_API = "/api/dashboard";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch(DASHBOARD_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Failed to load dashboard.",
    }));

    throw new Error(error.message ?? "Failed to load dashboard.");
  }

  return response.json() as Promise<DashboardResponse>;
}