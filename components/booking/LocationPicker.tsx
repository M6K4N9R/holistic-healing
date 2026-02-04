"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { checkLocationDayAvailability } from "@/app/actions/new-booking-flow";

interface LocationPickerProps {
  locations: string[];
  treatmentName?: string;
  treatmentLocations: string[];
  locationsCapacity: Record<string, { slotsLeft: number }>;
  className?: string;
  label?: string;
}

export default function LocationPicker({
  locations,
  treatmentLocations,
  locationsCapacity,
  className,
  label = "Select Location",
}: LocationPickerProps) {
  const form = useFormContext();
  const selectedLocation = form.watch("location");
  const selectedDateObj = form.watch("dateObject");
  const treatmentName = form.watch("treatmentId");

  const handleLocationSelect = (loc: string, isAvailableHere: boolean) => {
    if (!isAvailableHere) return; // hard block
    form.setValue("location", loc);
    form.setValue("doctorId", "");
    form.setValue("timeSlot", "");
  };

  return (
    <div className={cn("space-y-4 max-w-4xl mx-auto", className)}>
      <label className="text-xl font-semibold text-primary block mb-2 text-center">
        {label}
      </label>
      {selectedDateObj?.date && (
        <p className="text-sm text-on-surface-variant text-center mb-2">
          For {new Date(selectedDateObj.date).toLocaleDateString()} (
          {selectedDateObj.day}), choose a practice location.
        </p>
      )}
      d
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {locations.map((loc) => {
          const isTreatmentOfferedHere = treatmentLocations.includes(loc); // DOUBLE CHECK!!!
          const isSelected = selectedLocation === loc;
          const locCapacity = locationsCapacity[loc];
          const hasCapacity = locCapacity ? locCapacity.slotsLeft > 0 : true;
          const isAvailable = isTreatmentOfferedHere && hasCapacity;

          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleLocationSelect(loc, isAvailable)}
              disabled={!isAvailable}
              className={cn(
                "group h-28 rounded-3xl p-5 font-semibold shadow-lg transition-all border-2 text-left flex flex-col justify-between",
                isSelected && isTreatmentOfferedHere
                  ? "bg-primary text-on-primary border-primary shadow-2xl scale-[1.02]"
                  : "bg-surface-bright border-outline-variant hover:border-primary hover:bg-primary-container hover:shadow-2xl hover:-translate-y-1",
                hasCapacity
                  ? "hover:bg-primary-container"
                  : "bg-warning-container text-warning opacity-80 cursor-not-allowed hover:translate-y-0",

                !isTreatmentOfferedHere &&
                  "bg-outline-variant opacity-60 cursor-not-allowed",
              )}
            >
              <span className="text-lg">{loc}</span>
              <span className="text-xs text-on-surface-variant group-hover:text-on-primary/80">
                {isTreatmentOfferedHere ? (
    hasCapacity 
      ? `Available (${locCapacity?.slotsLeft || 0} slots)` 
      : "Fully booked"
  ) : (
    "Treatment not offered here"
  )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
