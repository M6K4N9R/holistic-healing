"use server";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

export async function getTreatments() {
  await dbConnect();
  const treatments = await Treatment.find({}).lean();
  return { treatments };
}
