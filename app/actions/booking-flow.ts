interface AvailabilityFilters {
  date?: string;
  location?: string;
}

interface AvailabilityResponse {
  treatment: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    locations: string[];
  };
  doctors: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    schedule: any[];
  }>;
  allLocations: string[]; // unique across doctors
  availableDates: string[]; // ["2026-02-05", "2026-02-07"]
  locationsCapacity: Record<string, { slotsLeft: number }>;
  // 👇 drill‑down (populated when date/location provided)
  dateDetails: Record<
    string, // "2026-02-05"
    {
      locationsCapacity: Record<
        string,
        { slotsLeft: number; doctors: string[] }
      >;
    }
  >;
}

export async function getAvailability(
  treatmentId: string,
  filters: AvailabilityFilters = {},
): Promise<AvailabilityResponse> {}
