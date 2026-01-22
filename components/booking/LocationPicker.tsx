"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { checkLocationDayAvailability } from "@/app/actions/new-booking-flow";

interface LocationPickerProps {
  allLocations: string[];
  className?: string;
  label?: string;
}

export default function LocationPicker({
  allLocations,
  className,
  label = "Select Location",
}: LocationPickerProps) {
  const form = useFormContext();
  const [isValidating, startTransition] = useTransition();

  const selectedLocation = form.watch("location");
  const selectedDateObj = form.watch("dateObject");
  const treatmentId = form.watch("treatmentId");

  // CORE VALIDATION LOGIC
  useEffect(() => {
    if (selectedLocation && selectedDateObj?.day && treatmentId) {
      console.log("LockationPicker selectedLocation: ", selectedLocation);
      startTransition(async () => {
        const isAvailable = await checkLocationDayAvailability(
          treatmentId,
          selectedLocation,
          selectedDateObj.day,
        );

        if (!isAvailable) {
          // 👈 Reset date + notify (industry standard)
          form.setValue("dateObject", { date: "", day: "" });
          toast.error(
            `"${selectedLocation}" doesn't offer this treatment on ${selectedDateObj.day}. Pick another date or location.`,
            { duration: 5000 },
          );
        }
      });
    }
  }, [selectedLocation, selectedDateObj?.day, treatmentId]);

  const handleLocationSelect = (loc: string) => {
    form.setValue("location", loc);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label className="text-xl font-semibold text-primary block mb-2 text-center">
        {label}
        {isValidating && (
          <span className="ml-2 text-sm text-on-surface-variant">
            Checking availability...
          </span>
        )}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {allLocations.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleLocationSelect(loc)}
            disabled={isValidating}
            className={cn(
              "group h-28 rounded-3xl p-5 font-semibold shadow-lg transition-all border-2 text-left flex flex-col justify-between",
              selectedLocation === loc
                ? "bg-primary text-on-primary border-primary shadow-2xl scale-[1.02]"
                : "bg-surface-bright border-outline-variant hover:border-primary hover:bg-primary-container hover:shadow-2xl hover:-translate-y-1",
              isValidating && "opacity-75 cursor-not-allowed",
            )}
          >
            <span className="text-lg">{loc}</span>
            <span className="text-xs text-on-surface-variant">
              {selectedDateObj?.day
                ? `${selectedDateObj.day} sessions available`
                : "Any day"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
