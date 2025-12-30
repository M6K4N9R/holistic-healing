"use server";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

export async function getTreatments() {
  await dbConnect();
  const treatments = await Treatment.find({}).limit(12).lean();
  return { treatments };
}
