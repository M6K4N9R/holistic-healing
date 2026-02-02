import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/app/actions/booking-flow";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ treatmentId: string }> },
) {
  const resolvedParams = await params;
  const url = new URL(request.url);
  const date = url.searchParams.get("date") || undefined;
  const location = url.searchParams.get("location") || undefined;

  const data = await getAvailability(resolvedParams.treatmentId, {
    date,
    location,
  });
  return NextResponse.json(data);
}
