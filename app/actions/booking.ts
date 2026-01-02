"use server";
import { redirect } from "next/navigation";
import dbConnect from "@/db/dbConnect";
import Booking from "@/db/models/Booking";

export async function createBooking(formData: FormData) {
  await dbConnect();

  const dateStr = formData.get("date") as string;
  const time = (formData.get("time") as string) || "10:00";

  let date;
  try {
    date = dateStr
      ? JSON.parse(dateStr)
      : { date: "2026-01-02", day: "Thursday" };
  } catch {
    date = { date: "2026-01-02", day: "Thursday" }; // Default
  }

  const { treatmentId, doctorId, patientName, phone, email } =
    Object.fromEntries(formData) as any;

  console.log("Email:", email);
  console.log("treatmentId:", treatmentId);
  console.log("doctorId:", doctorId);
  console.log("patientName:", patientName);
  console.log("phone:", phone);

  // Validate references exist ========== REMOVE for now -----TEST-----
  /*  const treatment = await Treatment.findById(treatmentId);
  const doctor = await Doctor.findById(doctorId);
  if (!treatment || !doctor) {
    throw new Error("Invalid treatment or doctor");
  }
 */
  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId || null,
    date,
    time,
    patientDetails: {
      email: email,
      name: patientName,
      phone: phone || null,
    },
  });

  await booking.save();
  redirect("/booking/confirmed?bookingId=" + booking._id);
}
