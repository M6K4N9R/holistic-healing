import type {
  AvailabilityFilters,
  AvailabilityResponse,
} from "@/types/booking";
import type { LeanTreatment, LeanDoctors, LeanDoctor } from "@/types/booking";
import Doctor from "@/db/models/Doctor";
import Booking from "@/db/models/Booking";
import mongoose from "mongoose";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

export async function getAvailability(
  treatmentId: string,
  filters: AvailabilityFilters = {},
): Promise<AvailabilityResponse> {
  await dbConnect();

  // Load treatment
  const treatmentDoc = await Treatment.findById(
    treatmentId,
    "name price duration location",
  ).lean<LeanTreatment>();
  if (!treatmentDoc) throw new Error("Treatment not found");

  const treatment: AvailabilityResponse["treatment"] = {
    _id: treatmentDoc._id.toString(),
    name: treatmentDoc.name,
    price: treatmentDoc.price,
    duration: treatmentDoc.duration,
    locations: treatmentDoc.location?.map((loc: any) => loc.toString()) || [],
  };

  // Load doctors
  const doctorsRaw = await Doctor.find({
    treatments: new mongoose.Types.ObjectId(treatmentId),
  })
    .select("firstName lastName schedule")
    .lean<LeanDoctors>()
    .exec();

  const doctors: AvailabilityResponse["doctors"] = doctorsRaw.map(
    (doc: LeanDoctor) => ({
      _id: doc._id.toString(),
      firstName: doc.firstName,
      lastName: doc.lastName,
      schedule: doc.schedule || [],
    }),
  );

  // All locations
  const allLocations: string[] = Array.from(
    new Set(
      doctors.flatMap(
        (doc: any) =>
          doc.schedule?.map((s: any) => s.location).filter(Boolean) || [],
      ),
    ),
  );

  // availableDates: concrete dates from schedules (NEW but simple)
  const today = new Date();
  const next60Days = new Date(today);
  next60Days.setDate(today.getDate() + 60);

  const availableDates = generateDatesWithSchedule(
    doctors,
    treatment.locations,
    today,
    next60Days,
  );

  // ========================== ADD BOOKING SUBTRACTION =============

  // Fetch bookings for available dates only
  const todayStr = new Date().toISOString().split("T")[0];
  const bookings = (await Booking.find({
    doctor: { $in: doctorsRaw.map((d: any) => d._id) },
    "dateObject.date": { $gte: todayStr, $in: availableDates },
  })
    .select("doctor dateObject.date timeSlot location")
    .lean()) as any[];

  console.log("Bookings found:", bookings.length);

  // Compute capacity per location per date
  const locationsCapacity: Record<string, { slotsLeft: number }> = {};
  const dateDetails: AvailabilityResponse["dateDetails"] = {};

  // For each location
  allLocations.forEach((loc) => (locationsCapacity[loc] = { slotsLeft: 999 }));

  // For each available date
  availableDates.forEach((dateStr) => {
    dateDetails[dateStr] = { locationsCapacity: {} };

    allLocations.forEach((loc) => {
      dateDetails[dateStr].locationsCapacity![loc] = {
        slotsLeft: 999,
        doctors: [],
      };
    });
  });

  // Subtract bookings from capacities
  bookings.forEach((booking: any) => {
    const loc = booking.location;
    const dateStr = booking.dateObject.date;

    if (locationsCapacity[loc]) locationsCapacity[loc].slotsLeft -= 1;
    if (dateDetails[dateStr]?.locationsCapacity[loc]) {
      dateDetails[dateStr].locationsCapacity[loc].slotsLeft -= 1;
    }
  });

  // ================================================================

  return {
    treatment,
    doctors,
    allLocations,
    availableDates,
    locationsCapacity, // 👈 overall capacity
    dateDetails, // 👈 per‑date capacity
  };
}

function generateDatesWithSchedule(
  doctors: any[],
  treatmentLocations: string[],
  startDate: Date,
  endDate: Date,
): string[] {
  const dates = new Set<string>();

  // For each day between start/end
  const current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0]; // "2026-02-05"
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      current.getDay()
    ];

    // Check if ANY doctor has schedule for this weekday at treatment location
    const hasCapacity = doctors.some((doc) =>
      doc.schedule.some(
        (s: any) =>
          treatmentLocations.includes(s.location) &&
          s.availability?.some(
            (a: any) => a.day === weekday && a.timeSlots?.length > 0,
          ),
      ),
    );

    if (hasCapacity) dates.add(dateStr);

    current.setDate(current.getDate() + 1);
  }

  return Array.from(dates);
}
