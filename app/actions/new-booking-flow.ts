"use server";
import mongoose from "mongoose";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Doctor from "@/db/models/Doctor";
import Booking from "@/db/models/Booking";
import { redirect } from "next/navigation";
import { DateObject } from "@/types/booking";

// =========================================== BEFORE ADJUSTMENTS

// STEP 1: Treatment → Available Doctors + Locations
export async function getTreatmentAvailability(treatmentId: string) {
  await dbConnect();

  const treatmentDoc = await Treatment.findById(
    treatmentId,
    "name price duration location"
  ).lean();

  if (!treatmentDoc) throw new Error("Treatment not found");

  const treatment = {
    ...treatmentDoc,
    _id: treatmentDoc._id.toString(),
  };

  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("firstName lastName email schedule") // No treatments, no timestamps
    .lean();

  const doctors = doctorsRaw.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  return {
    treatment,
    doctors,
    locations: treatment.location, // Array from treatment
  };
}

// 👈 NEW STEP 2: Treatment + Date + Location → Filtered Doctors + Times
export async function getFilteredAvailability({
  treatmentId,
  dateObj,
  location,
}: {
  treatmentId: string;
  dateObj: DateObject;
  location: string;
}) {
  await dbConnect();

  // 1. Get doctors for this treatment
  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("firstName lastName email schedule")
    .lean();

  const date = new Date(dateObj.date);
  const dayOfWeek = dateObj.day;

  // 2. Filter doctors by: works at location + works this day + has availability
  const filteredDoctors = doctorsRaw
    .filter((doc: any) => {
      // filter 1. Doctor works at this location?
      const scheduleAtLocation = doc.schedule?.find(
        (entry: any) => entry.location === location
      );

      if (!scheduleAtLocation) return false;

      // filter 2. Doctor works THIS SPECIFIC DAY at this location?
      const dayEntry = scheduleAtLocation.availability?.find(
        (entry: any) => entry.day === dayOfWeek
      );

      if (!dayEntry) return false;

      // filter 3. Has available time slots?
      return dayEntry.timeSlots && dayEntry.timeSlots.length > 0;
    })
    .map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  console.log("FILTERED DOCTORS: ", filteredDoctors);

  // 3. Get existing bookings for this date/treatment/location
  const bookings = await Booking.find({
    treatment: treatmentId,
    date: dateObj,
    location: location,
  }).lean();

  console.log("BOOKINGS AT CHOOSEN TREATMENT, DAY, and LOCATION: ", bookings);

  const bookedTimes = bookings.map((b: any) => b.time);

  // 4. Find common available times across filtered doctors
  const allAvailTimes = filteredDoctors.flatMap((doc: any) => doc.availability);
  const availableTimes = [...new Set(allAvailTimes)].filter(
    (time) => !bookedTimes.includes(time)
  );

  return {
    doctors: filteredDoctors,
    availableTimes,
    dateObj,
    location,
    dayOfWeek: dayNames[dayOfWeek],
  };
}

// STEP 3: Final time check (unchanged)
export async function getAvailableTimes(
  doctorId: string,
  treatmentId: string,
  dateObj: DateObject,
  location: string
) {
  await dbConnect();
  const doctor = (await Doctor.findById(doctorId).lean()) as any;
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

// FINAL: Create Booking (updated)
export async function createBooking(formData: FormData) {
  await dbConnect();

  const treatmentId = formData.get("treatmentId") as string;
  const doctorId = formData.get("doctorId") as string;
  const dateStr = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const patientName = formData.get("patientName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

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
    patientDetails: { email, name: patientName, phone, location },
  });

  await booking.save();
  redirect(`/booking/confirmed?bookingId=${booking._id}`);
}
