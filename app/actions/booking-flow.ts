import type { AvailabilityFilters } from "@/types/booking";
import type { AvailabilityResponse } from "@/types/booking";

export async function getAvailability(
  treatmentId: string,
  filters: AvailabilityFilters = {},
): Promise<AvailabilityResponse> {
  return {
    treatment: {
      _id: "mock-treatment-id",
      name: "Mock Treatment",
      price: 100,
      duration: 60,
      locations: ["Akasha", "Praxis Kollektive"],
    },
    doctors: [
      {
        _id: "mock-doctor-1",
        firstName: "Alice",
        lastName: "Example",
        schedule: [],
      },
    ],
    allLocations: ["Akasha", "Praxis"],
    availableDates: ["2026-02-05", "2026-02-07"],
    locationsCapacity: {
      Akasha: { slotsLeft: 3 },
      Praxis: { slotsLeft: 0 },
    },
    dateDetails: {},
  };
}
