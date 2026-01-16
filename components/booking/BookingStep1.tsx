"use client";

import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { getTreatmentAvailability } from "@/app/actions/new-booking-flow";
import CustomCalendar from "./Calendar";

export default function BookingStep1({ step }: { step: number }) {
  const form = useFormContext();
  const { data: treatmentsData, isLoading } = useSWR("/api/treatments");
  const treatments = treatmentsData?.treatments || [];

  const handleTreatmentSelect = async (treatmentId: string) => {
    form.setValue("treatmentId", treatmentId);

    // 👈 FETCH REAL DOCTORS + LOCATIONS
    const availability = await getTreatmentAvailability(treatmentId);
    console.log(
      "Data on Step1:👨‍⚕️ Available:",
      availability.treatment,
      availability.doctors,
      availability.locations
    );

    // 👈 Store for Step2
    form.setValue("availableDoctors", availability.doctors);
    form.setValue("availableLocations", availability.locations);
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        {/* ADD loading spinner */}
        <div>...Loading</div>
      </div>
    );
  }

  return (
    <div className={step >= 1 ? "block" : "hidden"}>
      <h3 className="text-3xl font-bold text-primary mb-8 text-center">
        Choose Treatment & Date
      </h3>

      {/* Treatment Buttons */}
      <div className={step >= 1 ? "block" : "hidden"}>
        {treatments.map((treatment: any) => (
          <button
            key={treatment._id}
            onClick={() => handleTreatmentSelect(treatment._id)}
            className={cn(
              "group relative h-28 rounded-3xl p-6 font-bold text-left shadow-lg transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-2",
              form.watch("treatmentId") === treatment._id
                ? "bg-primary text-on-primary shadow-2xl scale-[1.02]"
                : "bg-surface-bright backdrop-blur-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-container"
            )}
          >
            <span className="relative z-10">{treatment.name}</span>
          </button>
        ))}
      </div>

      {/* Calendar - only show after treatment selected */}
      {form.watch("treatmentId") && (
        <div className="space-y-4 max-w-sm mx-auto">
          <CustomCalendar
            treatmentId={form.watch("treatmentId")}
            location={form.watch("location")}
            className="max-w-4xl mx-auto my-8"
          />
          
        </div>
      )}
      {form.watch("availableLocations") &&
        form.watch("availableLocations").length > 0 &&
        form.watch("dateObject") && (
          <div className="space-y-4 max-w-sm mx-auto">
            <label className="text-xl font-semibold text-primary block mb-4 text-center">
              Select Location
            </label>
            <select
              {...form.register("location")}
              className="w-full p-5 text-lg font-semibold bg-surface-bright rounded-3xl border-2 border-outline-variant"
            >
              <option value="">Choose location</option>
              {form.watch("availableLocations")?.map((loc: string) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}
    </div>
  );
}
