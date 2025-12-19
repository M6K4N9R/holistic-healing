// lib/api/api.ts
import type { TreatmentsData } from "@/types/api";
import "server-only";

export async function fetchTreatments(): Promise<TreatmentsData> {
  // Get base URL in server environment
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL?.startsWith("http")
      ? process.env.VERCEL_URL
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/treatments`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch treatments");
  }

  return res.json();
}
