import type { AvailabilityFilters } from "@/types/booking";
import type { AvailabilityResponse } from "@/types/booking";
import mongoose from "mongoose";
import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Doctor from "@/db/models/Doctor";
import type { LeanTreatment, LeanDoctors, LeanDoctor } from "@/types/booking";

export async function getAvailability(
  treatmentId: string,
  filters: AvailabilityFilters = {},
): Promise<AvailabilityResponse> {
  await dbConnect();

  // 1. Load treatment (your existing code)
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

  // 2. Load doctors 
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

  // 3. All locations 
  const allLocations: string[] = Array.from(
    new Set(
      doctors.flatMap(
        (doc: any) =>
          doc.schedule?.map((s: any) => s.location).filter(Boolean) || [],
      ),
    ),
  );

  // 4. availableDates: concrete dates from schedules (NEW but simple)
  const today = new Date();
  const next60Days = new Date(today);
  next60Days.setDate(today.getDate() + 60);

  const availableDates = generateDatesWithSchedule(
    doctors,
    treatment.locations,
    today,
    next60Days,
  );

  // 5. Empty capacities (populated in Step 3)
  const locationsCapacity: AvailabilityResponse["locationsCapacity"] = {};
  allLocations.forEach((loc) => {
    locationsCapacity[loc] = { slotsLeft: 999 }; // "infinite" for now
  });

  const dateDetails: AvailabilityResponse["dateDetails"] = {};

  return {
    treatment,
    doctors,
    allLocations,
    availableDates,
    locationsCapacity,
    dateDetails,
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
