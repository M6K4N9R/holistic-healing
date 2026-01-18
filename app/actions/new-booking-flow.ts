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

  const doctors = doctorsRaw.map((doc: any) => ({
    ...doc,
    _id: doc._id?.toString(),
  }));

  const dayName = dateObj.day;

  // 2. Filter doctors by: works at location + works this day + has availability
  const filteredDoctors = doctors
    .filter((doc: any) => {
      // filter 1. Doctor works at this location?
      const scheduleAtLocation = doc.schedule?.find(
        (entry: any) => entry.location === location
      );
      if (!scheduleAtLocation) return false;

      // filter 2. Doctor works THIS SPECIFIC DAY at this location?
      const dayEntry = scheduleAtLocation.availability?.find(
        (entry: any) => entry.day === dayName
      );
      console.log("dayName: ", dayName);
      console.log("scheduleAtLocation: ", scheduleAtLocation);

      if (!dayEntry) return false;
      // filter 3. Has available time slots?
      return dayEntry.timeSlots && dayEntry.timeSlots.length > 0;
    })
    .map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
    }));

  // 3. Get existing bookings for this date/treatment/location
  const bookings = await Booking.find({
    treatment: treatmentId,
    date: dateObj,
    location: location,
  }).lean();

  const bookedTimes = bookings.map((b: any) => b.timeSlot);

  // 4. Find common available times across filtered doctors
  const allAvailTimes: string[] = filteredDoctors
    .flatMap((doc: any) => {
      const scheduleEntry = doc.schedule.find(
        (s: any) => s.location === location
      );
      const dayEntry = scheduleEntry?.availability.find(
        (s: any) => s.day === dayName
      );

      return dayEntry.timeSlots || [];
    })
    .filter((time): time is string => Boolean(time));

  const uniqueTimes: string[] = Array.from(new Set(allAvailTimes)); // In each location there is only one room for treatments so Schedules of the doctors don't cross. IT IS JUST IN CASE FOR THE FUTURE
  const availableTimes = uniqueTimes.filter(
    (time) => !bookedTimes.includes(time)
  );

  console.log(" DOCTORS: ", doctors);
  console.log("BOOKINGS AT CHOOSEN TREATMENT, DAY, and LOCATION: ", bookings);
  return {
    doctors: filteredDoctors,
    availableTimes,
    dateObj,
    location,
    dayName,
  };
}

// STEP 3: Final time check
export async function getAvailableTimes(
  doctorId: string,
  treatmentId: string,
  dateObj: DateObject,
  location: string
) {
  await dbConnect();
  const doctorRaw = await Doctor.findOne({
    _id: new mongoose.Types.ObjectId(doctorId),
  })
    .select("firstName lastName email schedule")
    .lean();
  if (!doctorRaw) throw new Error("Doctor not found");

  const doctor = doctorRaw.map((doc: any) => ({
    ...doc,
    _id: doc._id?.toString(),
  }));

  const bookings = await Booking.find({
    doctor: doctorId,
    treatment: treatmentId,
    date: dateObj,
  }).lean();

  const bookedTimes = bookings.map((b: any) => b.timeSlot);

  // Extract from schedule[location][day]

  const scheduleEntry = doctor.schedule?.find(
    (s: any) => s.location === location
  );
  const dayEntry = scheduleEntry?.availability?.find(
    (a: any) => a.day === dateObj.day
  );
  const baseTimeSlots = dayEntry?.timeSlots || [];

  const availableTimes = baseTimeSlots.filter(
    (time: string) => !bookedTimes.includes(time)
  );

  return { doctorRaw, date: dateObj, availableTimes };

  console.log("Fetsched Doctor in GETAVAILABLETIMES(): ", doctor);
}

// FINAL: Create Booking (updated)
export async function createBooking(formData: FormData) {
  await dbConnect();

  const treatmentId = formData.get("treatmentId") as string;
  const doctorId = formData.get("doctorId") as string;
  const dateStr = formData.get("date") as string;
  const timeSlot = formData.get("time") as string;
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
  if (!availableTimes.includes(timeSlot)) {
    throw new Error("Time slot no longer available");
  }

  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId,
    date,
    timeSlot,
    patientDetails: { email, name: patientName, phone, location },
  });

  await booking.save();
  redirect(`/booking/confirmed?bookingId=${booking._id}`);
}
