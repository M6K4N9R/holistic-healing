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

// Revert

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

  const selectedTreatmentLocations = treatmentDoc.location;

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

  const treatment: AvailabilityResponse["treatment"] = {
    _id: treatmentDoc._id.toString(),
    name: treatmentDoc.name,
    price: treatmentDoc.price,
    duration: treatmentDoc.duration,
    locations: selectedTreatmentLocations,
  };

  // All locations (IN CASE OF DOCTOR CHANGES BETTER EXTRACT FROM ALL TREATMENTS.location)
  const allLocations: string[] = Array.from(
    new Set(
      doctors.flatMap(
        (doc: any) =>
          doc.schedule?.map((s: any) => s.location).filter(Boolean) || [],
      ),
    ),
  );

  // availableDates: concrete dates from schedules
  const today = new Date();
  const next60Days = new Date(today);
  next60Days.setDate(today.getDate() + 60);

  const availableDates = generateDatesWithSchedule(
    doctors,
    selectedTreatmentLocations,
    today,
    next60Days,
  );

  console.log("availableDates: ", availableDates)

  // Fetch bookings for these doctors on available dates
  const doctorsIds = doctorsRaw.map((doc: any) => doc._id); // ObjectIds
  const todayStr = new Date().toISOString().split("T")[0];

  const bookings = (await Booking.find({
    doctor: { $in: doctorsIds },
    "dateObject.date": {
      $gte: todayStr,
      $in: availableDates, // Only computed dates
    },
  })
    .select("_id doctor dateObject.date timeSlot location") // ===== USE ID FOR LATER EDIT/DELETE IMPLEMENTATION
    .lean()) as any[];

  console.log("Step 3 - Bookings found:", bookings.length);
  console.log("Bookings found DETAILS:", bookings);

  // Compute MAX slots per location (from doctor schedules)
  const computeMaxSlotsPerLocation = (
    doctors: any[],
    treatmentLocations: string[],
    targetDateStr: string,
  ): Record<string, number> => {
    const maxSlots: Record<string, number> = {};

    allLocations.forEach((loc) => {
      if (!treatmentLocations.includes(loc)) {
        maxSlots[loc] = 0;
        return;
      }

      // Sum available timeSlots for this date's weekday across doctors at this loc
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        new Date(targetDateStr).getDay()
      ];
      let totalSlots = 0;

      doctors.forEach((doc) => {
        // Schedules of doctors don't intersect. Each doctor has unique working days in each location!
        const scheduleEntry = doc.schedule.find((s: any) => s.location === loc);
        if (scheduleEntry?.availability) {
          const dayAvail = scheduleEntry.availability.find(
            (a: any) => a.day === weekday,
          );
          if (dayAvail?.timeSlots) {
            totalSlots += dayAvail.timeSlots.length;
          }
        }
      });

      maxSlots[loc] = totalSlots;
    });

    return maxSlots;
  };

  // Initialize with computed max (per-date for accuracy)
  const dateDetails: AvailabilityResponse["dateDetails"] = {};
  availableDates.forEach((dateStr) => {
    const maxSlotsPerLoc = computeMaxSlotsPerLocation(
      doctors,
      selectedTreatmentLocations,
      dateStr,
    );
    console.log("maxSlotsPerLoc: ", maxSlotsPerLoc);

    dateDetails[dateStr] = {
      locationsCapacity: {},
    };

    allLocations.forEach((loc) => {
      dateDetails[dateStr].locationsCapacity![loc] = {
        slotsLeft: maxSlotsPerLoc[loc] || 0,
        doctors: [], // Just in case, but not really needed.
      };
    });
  });

  // ============================ DEBUG: Works correctly

  // Overall capacity = average across dates (for LocationPicker badges)
  const locationsCapacity: Record<string, { slotsLeft: number }> = {};
  allLocations.forEach((loc) => {
    const avgSlots = Math.round(
      availableDates.reduce(
        (sum, dateStr) =>
          sum + (dateDetails[dateStr].locationsCapacity![loc]?.slotsLeft || 0),
        0,
      ) / availableDates.length,
    );
    locationsCapacity[loc] = { slotsLeft: avgSlots };
  });

  console.log("dateDetails DETAILS: ", dateDetails);
  console.log("locationsCapacity: ", locationsCapacity);

  // ========================== ADD BOOKING SUBTRACTION =============

  // 👈 Subtract each booking from capacities
  bookings.forEach((booking: any) => {
    const loc = booking.location;
    const dateStr = booking.dateObject.date;

    // Overall (updates avg display) DEBUG: doesn't update the display based on existing bookings
    if (locationsCapacity[loc]) {
      locationsCapacity[loc].slotsLeft = Math.max(
        0,
        locationsCapacity[loc].slotsLeft - 1,
      );
      console.log("locationsCapacity: ", locationsCapacity[loc])
    }

    // Per-date (critical for trulyAvailableDates)
    if (dateDetails[dateStr]?.locationsCapacity[loc]) {
      dateDetails[dateStr].locationsCapacity[loc].slotsLeft = Math.max(
        0,
        dateDetails[dateStr].locationsCapacity[loc].slotsLeft - 1,
      );
    }
  });

  // Filter availableDates to only dates with remaining capacity
  const trulyAvailableDates = availableDates.filter((dateStr) =>
    Object.values(dateDetails[dateStr].locationsCapacity!).some(
      (locCap: any) => locCap.slotsLeft > 0, // Real remaining slots
    ),
  );

  // ================================================================

  return {
    treatment,
    doctors,
    allLocations,
    availableDates: trulyAvailableDates, //  bookings-aware!
    locationsCapacity, //  Overall
    dateDetails, //  Per date
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
    //===================================== DEBUG HASCAPACITY
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
