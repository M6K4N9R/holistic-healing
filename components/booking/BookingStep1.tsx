"use client";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import CustomCalendar from "./Calendar";
import { getTreatmentAvailability } from "@/app/actions/new-booking-flow";
import LocationPicker from "./LocationPicker";
import { TreatmentAvailability } from "@/types/booking";

export default function BookingStep1({ step }: { step: number }) {
  const form = useFormContext();
  const searchParams = useSearchParams();

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

  // Typed FETCHER
  const fetchTreatmentAvailability = async (
    treatmentId: string,
  ): Promise<TreatmentAvailability> => {
    return getTreatmentAvailability(treatmentId);
  };
  const { data: availabilityData, isLoading: availabilityLoading } =
    useSWR<TreatmentAvailability>(
      treatmentId ? `treatment-${treatmentId}` : null,
      () => fetchTreatmentAvailability(treatmentId!),
    );

  const handleTreatmentSelect = (id: string) => {
    form.setValue("treatmentId", id);
    // Clear downstream fields
    form.setValue("location", "");
    form.setValue("dateObject", { date: "", day: "" });
  };

  console.log("Availability data", availabilityData);

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
      {availabilityData && !availabilityLoading && (
        <div className="space-y-12">
          {/* Custom Calendar */}
          <CustomCalendar
            availableDays={availabilityData.allDays}
            className="max-w-4xl mx-auto"
          />
          <LocationPicker
            allLocations={availabilityData.allLocations}
            treatmentLocations={availabilityData.treatmentLocations}
            treatmentName={availabilityData.treatment.name}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
}
