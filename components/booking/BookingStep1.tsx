"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import useSWR from "swr";

export default function BookingStep1({ step }: { step: number }) {
  const form = useFormContext();
  const { data, isLoading } = useSWR("/api/treatments");

  // 🔍 DEBUG: Check what API returns
  console.log("API Data:", data);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-primary rounded-full animate-spin" />
          <p className="text-lg text-primary font-semibold">
            Loading treatments...
          </p>
        </div>
      </div>
    );
  }
  // ✅ Correct data access
  const treatments = data?.treatments || [];

  return (
    <div className={step >= 1 ? "block" : "hidden"}>
      <h3 className="text-3xl font-bold text-primary mb-8 text-center">
        Choose Treatment & Date
      </h3>

      {/* Treatment Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {treatments.map((treatment: any) => (
          <button
            key={treatment._id}
            type="button"
            onClick={() => {
              form.setValue("treatmentId", treatment._id);
              form.setValue("treatmentName", treatment.name);
            }}
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
          <label className="text-xl font-semibold text-primary block mb-4 text-center">
            Select Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 56 * 86400000).toISOString().split("T")[0]
              }
              value={form.watch("date")?.toISOString().split("T")[0] || ""}
              onChange={(e) => form.setValue("date", new Date(e.target.value))}
              className="w-full p-5 pl-14 pr-14 text-lg font-semibold bg-surface-bright backdrop-blur-xl 
                       rounded-3xl border-2 border-outline-variant focus:border-primary 
                       focus:ring-4 focus:ring-primary/20 shadow-2xl hover:shadow-3xl 
                       transition-all duration-300 cursor-pointer text-on-surface-variant"
            />
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
