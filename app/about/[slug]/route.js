import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import { NextResponse } from "next/server";

export default async function GET(request, response) {
  const { id } = request.query;
  await dbConnect();
  const treatment = await Treatment.findById(id);
  return NextResponse.json(treatment);
}
