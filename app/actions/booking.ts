"use server";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import dbConnect from "@/db/dbConnect";
import Booking from "@/db/models/Booking";
import Treatment from "@/db/models/Treatment";
import Doctor from "@/db/models/Doctor";

export async function createBooking(formData: FormData) {
  await dbConnect();

  const { treatmentId, doctorId, date, time, patientName, phone, email } =
    Object.fromEntries(formData) as any;

  // Validate references exist ========== REMOVE for now -----TEST-----
  /*  const treatment = await Treatment.findById(treatmentId);
  const doctor = await Doctor.findById(doctorId);
  if (!treatment || !doctor) {
    throw new Error("Invalid treatment or doctor");
  }
 */
  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId,
    date: JSON.parse(date),
    time,
    patientDetails: { email, name: patientName, phone: phone || null },
  });

  await booking.save();
  redirect(`/booking/confirmed?bookingId=${booking._id}`);
}
