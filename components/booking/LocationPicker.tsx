// components/booking/LocationPicker.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

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

  const selectedLocation = form.watch("location");
  const selectedDateObj = form.watch("dateObject"); // { date, day }

  // In future maybe filter by dateObj.day if needed:
  // const dayName = selectedDateObj?.day;

  const handleLocationSelect = (loc: string) => {
    // Toggle or simply set
    form.setValue("location", loc);
    // Reset downstream selections if needed
    form.setValue("doctorId", "");
    form.setValue("timeSlot", "");
  };

  if (!allLocations || allLocations.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4 max-w-4xl mx-auto", className)}>
      <label className="text-xl font-semibold text-primary block mb-2 text-center">
        {label}
      </label>

      {selectedDateObj?.date && (
        <p className="text-sm text-on-surface-variant text-center mb-2">
          For{" "}
          {new Date(selectedDateObj.date).toLocaleDateString()} (
          {selectedDateObj.day}), pick a practice location.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allLocations.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleLocationSelect(loc)}
            className={cn(
              "group h-28 rounded-3xl p-5 font-semibold shadow-lg transition-all duration-200 text-left flex flex-col justify-between border-2",
              selectedLocation === loc
                ? "bg-primary text-on-primary border-primary shadow-2xl scale-[1.02]"
                : "bg-surface-bright border-outline-variant hover:border-primary hover:bg-primary-container hover:-translate-y-1 hover:shadow-2xl"
            )}
          >
            <span className="text-lg">{loc}</span>
            <span className="text-xs text-on-surface-variant group-hover:text-on-primary/80">
              Click to choose this location
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
