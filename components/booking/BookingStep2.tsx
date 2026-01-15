"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ClockIcon, UserIcon } from "@/components/ui/icons";
import { getFilteredAvailability } from "@/app/actions/new-booking-flow";
import { useTransition } from "react";

export default function BookingStep2({ step }: { step: number }) {
  const form = useFormContext();
  const treatmentId = form.watch("treatmentId");
  const dateObj = form.watch("dateObject");
  const location = form.watch("location");

  const [isPending, startTransition] = useTransition();

  // 👈 Call server action when treatment + date + location ready
  const handleDateLocationConfirm = () => {
    if (treatmentId && dateObj && location) {
      startTransition(async () => {
        const availability = await getFilteredAvailability({
          treatmentId,
          dateObj,
          location,
        });
        form.setValue("availableDoctors", availability.doctors);
        form.setValue("availableTimes", availability.availableTimes);
        console.log("✅ Step2 loaded:", availability);
      });
    }
  };

  const doctors = form.watch("availableDoctors") || [];
  const availableTimes = form.watch("availableTimes") || [];

  if (isPending) {
    return (
      <div className={step >= 2 ? "block" : "hidden"}>
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-primary font-semibold">
            Loading doctors & times...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={step >= 2 ? "block" : "hidden"}>
      <h3 className="text-3xl font-bold text-primary mb-8 text-center">
        Choose Time & Doctor
      </h3>

      {/* 👈 TRIGGER Step2 data load */}
      {treatmentId && dateObj && location && !doctors.length && (
        <div className="text-center mb-8">
          <button
            onClick={handleDateLocationConfirm}
            className="btn-primary px-12 py-4 text-lg"
          >
            Load Availability
          </button>
        </div>
      )}

      {doctors.length > 0 && availableTimes.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Time Slots */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ClockIcon className="w-8 h-8 text-primary" />
              <h4 className="text-2xl font-bold text-on-surface">
                Available Times
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map((slot: any) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => form.setValue("timeSlot", slot)}
                  className={cn(
                    "group relative h-20 rounded-2xl p-6 font-bold shadow-lg transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1",
                    form.watch("timeSlot") === slot
                      ? "bg-primary text-on-primary shadow-2xl border-2 border-primary"
                      : "bg-surface-bright backdrop-blur-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-container"
                  )}
                >
                  <span className="relative z-10">{slot}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Doctors */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="w-8 h-8 text-primary" />
              <h4 className="text-2xl font-bold text-on-surface">
                Select Doctor
              </h4>
            </div>
            <div className="space-y-4">
              {doctors.map((doctor: any) => (
                <button
                  key={doctor._id}
                  type="button"
                  onClick={() => {
                    form.setValue("doctorId", doctor._id);
                    form.setValue("doctorName", `${doctor.firstName} ${doctor.lastName}`);
                  }}
                  className={cn(
                    "w-full group relative h-28 rounded-3xl p-6 font-bold shadow-lg transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 flex items-center gap-4",
                    form.watch("doctorId") === doctor._id
                      ? "bg-primary text-on-primary shadow-2xl border-2 border-primary"
                      : "bg-surface-bright backdrop-blur-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-container"
                  )}
                >
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <UserIcon className="w-7 h-7 text-on-secondary" />
                  </div>
                  <div className="relative z-10">
                    <span className="block font-bold text-lg text-on-surface">
                      {doctor.firstName} {doctor.lastName}
                    </span>
                    <span className="text-sm text-on-surface-variant">
                      {doctor.email}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        treatmentId && dateObj && location && (
          <div className="text-center py-20">
            <p className="text-xl text-on-surface mb-4">
              No availability found for {location} on {dateObj.date}
            </p>
            <p className="text-lg text-on-surface-variant">
              Try different date or location
            </p>
          </div>
        )
      )}
    </div>
  );
}
