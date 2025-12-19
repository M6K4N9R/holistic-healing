import type { TreatmentsData } from "@/types/api";
/* 
export async function fetchTreatments(): Promise<TreatmentsData> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL?.startsWith("http")
      ? process.env.VERCEL_URL
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // 🔍 DEBUG: Log the baseUrl
  console.log('BASE_URL:', baseUrl);
  console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
  
  const url = `${baseUrl}/api/treatments`;
  console.log('FULL URL:', url); // Should be http://localhost:3000/api/treatments
  
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  // ...
}
 */

export async function fetchTreatments(): Promise<TreatmentsData> {
  const res = await fetch("http://localhost:3000/api/treatments", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch treatments");
  return res.json();
}
