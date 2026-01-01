"use server";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Doctor from "@/db/models/Doctor";
import Booking from "@/db/models/Booking";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

interface DateObject {
  date: string;
  day: string;
}

interface DoctorDocument {
  _id: string;
  firstName: string;
  lastName: string;
  treatments: string[];
  availability: string[];
  days: string[];
  email: string;
}

// STEP 1: Treatment → Available Doctors + Locations
export async function getTreatmentAvailability(treatmentId: string) {
  await dbConnect();
  const treatmentDoc = await Treatment.findById(treatmentId);
  if (!treatmentDoc) throw new Error("Treatment not found");

  // 👈 CONVERT TO PLAIN JSON (serializable + typed)
  const treatment = treatmentDoc.toObject();
  const doctorsRaw = await Doctor.find({ treatments: treatment._id });

  const doctors = doctorsRaw.map((doc) => doc.toObject());

  return {
    treatment,
    doctors,
    locations: treatment.location,
  };
}

// STEP 2: Doctor + Location → Available Dates
export async function getDoctorDates(
  doctorId: string,
  treatmentId: string,
  location: string,
  month: number,
  year: number
) {
  await dbConnect();
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found"); // Change later to more gratious way.

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const bookings = await Booking.find({
    doctor: doctorId,
    treatment: treatmentId,
    date: { $gte: startDate, $lte: endDate },
  });

  const availableDays = doctor.days.map((dayName: string) => {
    const dayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(dayName);
    const dayBookings = bookings.filter((b: any) => {
      const bookingDay = new Date(b.date.date).getDay();
      return bookingDay === dayIndex;
    });
    return { day: dayName, booked: dayBookings.length > 0 };
  });

  return { doctor, availableDays };
}

// STEP 3: Date → Available Times
export async function getAvailableTimes(
  doctorId: string,
  treatmentId: string,
  dateObj: DateObject,
  location: string
) {
  await dbConnect();
  const doctor = (await Doctor.findById(
    doctorId
  ).lean()) as DoctorDocument | null;
  if (!doctor) throw new Error("Doctor not found");

  const bookings = await Booking.find({
    doctor: doctorId,
    treatment: treatmentId,
    date: dateObj,
  });

  const bookedTimes = bookings.map((b: any) => b.time);
  const availableTimes = doctor.availability.filter(
    (time: string) => !bookedTimes.includes(time)
  );

  return { doctor, date: dateObj, availableTimes };
}

// FINAL: Create Booking
export async function createBooking(formData: FormData) {
  const session = await getSession();

  const userEmail = session?.user?.email || (formData.get("email") as string);
  if (!userEmail) throw new Error("Email required");

  await dbConnect();

  const treatmentId = formData.get("treatmentId") as string;
  const doctorId = formData.get("doctorId") as string;
  const dateStr = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const patientName = formData.get("patientName") as string;
  const phone = formData.get("phone") as string;

  const date: DateObject = JSON.parse(dateStr);

  // Final availability check
  const { availableTimes } = await getAvailableTimes(
    doctorId,
    treatmentId,
    date,
    location
  );
  if (!availableTimes.includes(time)) {
    throw new Error("Time slot no longer available");
  }

  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId,
    date,
    time,
    patientDetails: { email: userEmail, name: patientName, phone, location },
  });

  await booking.save();
  redirect(`/booking/confirmed?bookingId=${booking._id}`);
}
