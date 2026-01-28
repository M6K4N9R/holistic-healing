"use server";
import mongoose from "mongoose";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Doctor from "@/db/models/Doctor";
import Booking from "@/db/models/Booking";
import { redirect } from "next/navigation";
import { DateObject } from "@/types/booking";
import { log } from "console";

// STEP 1: Treatment → Available Doctors + Locations
/**
 * @returns {Promise<import('@/types/booking').TreatmentAvailability>}
 */
export async function getTreatmentAvailability(treatmentId: string) {
  await dbConnect();

  const treatmentDoc = await Treatment.findById(
    treatmentId,
    "name price duration location",
  ).lean();

  if (!treatmentDoc) throw new Error("Treatment not found");

  const treatment = {
    ...treatmentDoc,
    _id: treatmentDoc._id.toString(),
    location: treatmentDoc.location?.map((loc: any) => loc.toString()) || [],
  };

  // Extract locations at which selected treatment is offered

  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("firstName lastName schedule") // No treatments, no timestamps
    .lean();

  const doctorsIds = doctorsRaw.map((doc: any) => doc._id); // Extract ObjectIds BEFORE toString conversion for fetching existingBookings

  const doctors = doctorsRaw.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  // Extract UNIQUE locations and days across all doctors
  const allLocations = Array.from(
    new Set(
      doctors.flatMap(
        (doc: any) =>
          doc.schedule?.map((s: any) => s.location).filter(Boolean) || [],
      ),
    ),
  );
  const treatmentLocations = treatment.location;

  // Fetch EXISTING bookings for these doctors (next 60 days)
  const next60Days = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const todayStr = new Date().toISOString().split("T")[0]; // "2026-01-28"
  const next60DaysStr = next60Days.toISOString().split("T")[0]; // "2026-03-29"

  const existingBookings = await Booking.find({
    doctor: { $in: doctorsIds },
    "dateObject.date": {
      $gte: todayStr,
      $lte: next60DaysStr,
    },
  })
    .select("doctor dateObject timeSlot location")
    .lean();

  // Group bookings by doctor + day
  const bookingsByDoctorDay = new Map();
  existingBookings.forEach((booking: any) => {
    const key = `${booking.doctor}_${booking.dateObject.day}`;
    if (!bookingsByDoctorDay.has(key)) bookingsByDoctorDay.set(key, []);
    bookingsByDoctorDay.get(key)?.push(booking);
    console.log("existingBookings: ", existingBookings);
  });

  // availableDays: schedule days MINUS booked days
  const availableDays = Array.from(
    new Set(
      doctors
        .flatMap((doc: any) =>
          (doc.schedule || [])
            .filter((s: any) => treatment.location.includes(s.location))
            .flatMap((s: any) =>
              (s.availability || [])
                .filter((a: any) => a.timeSlots?.length > 0)
                .map((a: any) => a.day),
            ),
        )
        .filter((day: string) => {
          // Skip day if ALL doctors are fully booked that day
          const doctorDaysBooked = new Set(
            Array.from(bookingsByDoctorDay.keys())
              .filter((key: string) => key.endsWith(`_${day}`))
              .map((key: string) => key.split("_")[0]),
          );

          // Day available if at least 1 doctor has schedule + not fully booked
          return doctors.some((doc: any) => !doctorDaysBooked.has(doc._id));
        }),
    ),
  );

  console.log("AvailableDays: ", availableDays);
  console.log("bookingsByDoctorDay: ", bookingsByDoctorDay);

  console.log("doctorsIds:", doctorsIds);
  console.log("next60Days:", next60Days);
  console.log("existingBookings count ", existingBookings.length);
  console.log("existingBookings", existingBookings);

  return {
    treatment,
    doctors,
    allLocations,
    availableDays, // ["Mon", "Thu", "Sat"]
    totalBookings: existingBookings.length, // Debug
  };
}

export async function getLocationDays(treatmentId: string, location: string) {
  await dbConnect();

  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("schedule")
    .lean();

  const daysAtLocation = doctorsRaw.flatMap((docRaw: any) => {
    const doc = { ...docRaw, _id: docRaw._id?.toString() };
    const schedule = doc.schedule?.find((s: any) => s.location === location);
    return (
      schedule?.availability
        ?.filter((a: any) => a.timeSlots.length > 0)
        ?.map((a: any) => a.day) || []
    );
  });

  return Array.from(new Set(daysAtLocation));
}

// Check if ANY doctor offers treatment at location on specific day
export async function checkLocationDayAvailability(
  treatmentId: string,
  location: string,
  day: string,
) {
  await dbConnect();

  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("schedule")
    .lean();

  const hasAvailability = doctorsRaw.some((docRaw: any) => {
    const doc = { ...docRaw, _id: docRaw._id?.toString() };
    const scheduleAtLocation = doc.schedule?.find(
      (s: any) => s.location === location,
    );

    if (!scheduleAtLocation) return false;

    const dayEntry = scheduleAtLocation.availability?.find(
      (a: any) => a.day === day,
    );
    return !!(dayEntry?.timeSlots && dayEntry.timeSlots.length > 0);
  });

  return hasAvailability;
}

// Get First available day at the selected location ============= BEFORE REFACTURE 1/24/26

export async function getLocationDayAvailability(
  treatmentId: string,
  location: string,
  day: string,
) {
  const doctors = await getTreatmentAvailability(treatmentId);
  return doctors.doctors.some((doc: any) =>
    doc.schedule.some(
      (s: any) =>
        s.location === location &&
        s.availability.some(
          (a: any) => a.day === day && a.timeSlots.length > 0,
        ),
    ),
  );
}

//  NEW STEP 2: Treatment + Date + Location → Filtered Doctors + Times
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
        (entry: any) => entry.location === location,
      );
      if (!scheduleAtLocation) return false;

      // filter 2. Doctor works THIS SPECIFIC DAY at this location?
      const dayEntry = scheduleAtLocation.availability?.find(
        (entry: any) => entry.day === dayName,
      );

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
    dateObject: dateObj,
    location: location,
  }).lean();

  const bookedTimes = bookings.map((b: any) => b.timeSlot);

  // 4. Find common available times across filtered doctors
  const allAvailTimes: string[] = filteredDoctors
    .flatMap((doc: any) => {
      const scheduleEntry = doc.schedule.find(
        (s: any) => s.location === location,
      );
      const dayEntry = scheduleEntry?.availability.find(
        (s: any) => s.day === dayName,
      );

      return dayEntry.timeSlots || [];
    })
    .filter((time): time is string => Boolean(time));

  const uniqueTimes: string[] = Array.from(new Set(allAvailTimes)); // In each location there is only one room for treatments so Schedules of the doctors don't cross. IT IS JUST IN CASE FOR THE FUTURE
  const availableTimes = uniqueTimes.filter(
    (time) => !bookedTimes.includes(time),
  );

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
  location: string,
) {
  await dbConnect();
  const doctorRaw = await Doctor.findOne({
    _id: new mongoose.Types.ObjectId(doctorId),
  })
    .select("firstName lastName email schedule")
    .lean();
  if (!doctorRaw) throw new Error("Doctor not found");

  const doctor = {
    ...doctorRaw,
    _id: doctorRaw._id?.toString(),
  };

  const bookings = await Booking.find({
    doctor: doctorId,
    treatment: treatmentId,
    dateObject: dateObj,
  }).lean();

  const bookedTimes = bookings.map((b: any) => b.timeSlot);

  // Extract from schedule[location][day]

  const scheduleEntry = doctor.schedule?.find(
    (s: any) => s.location === location,
  );
  const dayEntry = scheduleEntry?.availability?.find(
    (a: any) => a.day === dateObj.day,
  );
  const baseTimeSlots = dayEntry?.timeSlots || [];

  const availableTimes = baseTimeSlots.filter(
    (time: string) => !bookedTimes.includes(time),
  );

  return { doctor: doctor, date: dateObj, availableTimes };
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
  const phone = formData.get("patientPhone") as string;
  const email = formData.get("patientEmail") as string;

  const date: DateObject = JSON.parse(dateStr);

  const { availableTimes } = await getAvailableTimes(
    doctorId,
    treatmentId,
    date,
    location,
  );
  if (!availableTimes.includes(timeSlot)) {
    throw new Error("Time slot no longer available");
  }
  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId,
    dateObject: date,
    timeSlot,
    location: location,
    patientDetails: { email, name: patientName, phone },
  });

  await booking.save();
  redirect(`/booking/confirmed?bookingId=${booking._id}`);
}
