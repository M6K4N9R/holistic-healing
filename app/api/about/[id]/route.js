import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import { NextResponse } from "next/server";

export default async function GET(request) {
  const { id } = request.query;
  await dbConnect();
  const treatment = await Treatment.findOne({ _id: id });
  return NextResponse.json({ treatment });
}
