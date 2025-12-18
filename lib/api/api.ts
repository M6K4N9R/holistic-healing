import type { TreatmentsData } from "@/types/api";

export async function fetchTreatments(): Promise<TreatmentsData> {
  const res = await fetch("/api/treatments", {
    next: { revalidate: 3600 }, // ISR
    cache: "force-cache", // Server Component compatible
  });

  if (!res.ok) throw new Error("Failed to fetch treatments");
  return res.json();
}
