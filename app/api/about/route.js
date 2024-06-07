import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import { NextResponse } from "next/server";

export default async function GET() {
  await dbConnect();
  const treatments = await Treatment.find();
  return NextResponse.json({ treatments });
}
