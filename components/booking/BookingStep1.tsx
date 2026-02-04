"use client";

import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import CustomCalendar from "./Calendar";
import LocationPicker from "./LocationPicker";

export default function BookingStep1({ step }: { step: number }) {
  const form = useFormContext();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Auto-select from URL on mount
  useEffect(() => {
    const preselectedId = searchParams.get("treatmentId");
    if (preselectedId && !form.watch("treatmentId")) {
      form.setValue("treatmentId", preselectedId);
    }
  }, [searchParams, form]);

  // Fetch treatment data
  const { data: treatmentsData } = useSWR("/api/treatments");
  const treatments = treatmentsData?.treatments || [];

  const treatmentId = form.watch("treatmentId");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: availabilityData, isLoading } = useSWR(
    treatmentId
      ? `/api/availability/${treatmentId}?date=${selectedDate}&location=${selectedLocation}`
      : null,
    fetcher,
  );

  if (isLoading) {
    return <div>Loading availability...</div>;
  }
  console.log("NEW availabilityData in BookingStep1:", availabilityData);
  console.log(
    "NEW availabilityDates:",
    availabilityData?.availableDates?.slice(0, 5),
  );

  // Typed FETCHER
  // Remove after TESTING OF NEW availabillityData
  /* const fetchTreatmentAvailability = async (
    treatmentId: string,
  ): Promise<TreatmentAvailability> => {
    return getTreatmentAvailability(treatmentId);
  };
  const { data: availabilityData, isLoading: availabilityLoading } =
    useSWR<TreatmentAvailability>(
      treatmentId ? `treatment-${treatmentId}` : null,
      () => fetchTreatmentAvailability(treatmentId!),
    ); */

  const handleTreatmentSelect = (id: string) => {
    form.setValue("treatmentId", id);
    // Clear downstream fields
    form.setValue("location", "");
    form.setValue("dateObject", { date: "", day: "" });
  };

  console.log(
    "Selected date capacity:",
    availabilityData?.dateDetails?.["2026-02-05"],
  );

  return (
    <div className={step >= 1 ? "block" : "hidden"}>
      <h3 className="text-3xl font-bold text-primary mb-8 text-center">
        Choose Treatment & Date
      </h3>

      {/* Treatment Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {treatments.map((treatment: any) => (
          <button
            key={treatment._id}
            onClick={() => handleTreatmentSelect(treatment._id)}
            className={cn(
              form.watch("treatmentId") === treatment._id
                ? "bg-primary text-on-primary shadow-2xl scale-[1.02]"
                : "bg-surface-bright border-2 border-outline-variant hover:border-primary",
            )}
          >
            {treatment.name}
          </button>
        ))}
      </div>

      {/* Calendar + Locations - only after treatment selected */}
      {availabilityData && !isLoading && (
        <div className="space-y-12">
          {/* Custom Calendar */}
          <CustomCalendar
            availableDates={availabilityData?.availableDates || []}
            className="max-w-4xl mx-auto"
          />
          <button
            onClick={() => setSelectedDate("2026-02-05")}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Test: Select Feb 5
          </button>
          <LocationPicker
            locations={availabilityData?.allLocations || []}              
  treatmentLocations={availabilityData?.treatment.locations || []}  
  locationsCapacity={availabilityData?.locationsCapacity || {}}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
}
