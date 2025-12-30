"use server";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import dbConnect from "@/db/dbConnect"; // Your DB
import Booking from "@/db/models/Booking";

export async function createBooking(formData: FormData) {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");

  const treatmentId = formData.get("treatmentId") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const doctorEmail = formData.get("doctorEmail") as string;

  await dbConnect();
  const booking = new Booking({
    userId: session.user.userId,
    treatmentId,
    date,
    location,
    doctorEmail,
  });
  await booking.save();

  redirect("/booking/confirmed");
}
