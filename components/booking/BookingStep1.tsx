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
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-lg text-emerald-600 font-semibold">
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
      <h3 className="text-3xl font-bold text-emerald-700 mb-8 text-center bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
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
                ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-2xl scale-[1.02]"
                : "bg-white/80 backdrop-blur-xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50"
            )}
          >
            <span className="relative z-10">{treatment.name}</span>
            {form.watch("treatmentId") === treatment._id && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/75 to-indigo-500/75 -skew-x-3 -rotate-1 scale-110" />
            )}
          </button>
        ))}
      </div>

      {/* Calendar - only show after treatment selected */}
      {form.watch("treatmentId") && (
        <div className="space-y-4 max-w-sm mx-auto">
          <label className="text-xl font-semibold text-emerald-700 block mb-4 text-center">
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
              className="w-full p-5 pl-14 pr-14 text-lg font-semibold bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer"
            />
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500 pointer-events-none"
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
