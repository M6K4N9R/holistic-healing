import { TreatmentsData } from "@/types/api";

export async function fetchTreatments(): Promise<TreatmentsData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/treatments`,
    {
      next: { revalidate: 3600 }, // ISR
    }
  );
  if (!res.ok) throw new Error("Failed to fetch treatments");
  return res.json();
}
