import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const treatments = await Treatment.find();
  console.log("Treatments are:", treatments);
  return NextResponse.json({ treatments });
}
