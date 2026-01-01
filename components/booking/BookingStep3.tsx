"use client";

import { createBooking } from "@/app/actions/booking";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  PhoneIcon,
  ClockIcon,
  EnvelopeIcon,
  UserIcon,
} from "@/components/ui/icons";

export default function BookingStep3({ step }: { step: number }) {
  const form = useFormContext();

  /*   const isComplete = form.watch("timeSlot") && form.watch("doctorId");
  const handleConfirm = async (data: any) => {
    const formData = new FormData();
    formData.append("treatmentId", form.watch("treatmentId"));
    formData.append("doctorId", form.watch("doctorId"));
    formData.append("date", JSON.stringify(form.watch("date")));
    formData.append("time", form.watch("timeSlot"));
    formData.append("patientName", data.patientName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    await createBooking(formData);
  }; */
  return (
    // <div className={step >= 3 && isComplete ? "block" : "hidden"}>
    <div className={step >= 3 ? "block" : "hidden"}>
      <form action={createBooking} className="space-y-16">
        <h3 className="text-3xl font-bold text-primary mb-12 text-center">
          Review & Confirm
        </h3>

        {/* Booking Summary */}
        <div className="bg-surface-bright backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-outline-variant mb-12">
          <h4 className="text-2xl font-bold text-on-surface mb-8 text-center">
            Your Healing Session
          </h4>
          <div className="grid md:grid-cols-2 gap-8 text-lg">
            <div>
              <div className="flex items-center gap-3 mb-4 p-4 bg-primary-container rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-on-primary font-bold text-xl">
                    {form.watch("treatmentName")?.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-on-primary-container">
                    {form.watch("treatmentName")}
                  </div>
                  <div className="text-primary font-semibold">60 min • €60</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary-container rounded-2xl">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-on-secondary" />
                </div>
                <div className="font-semibold text-on-secondary-container">
                  {form.watch("doctorName")}
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 bg-tertiary-container rounded-3xl border border-outline-variant">
                <div className="flex items-center gap-3 mb-4">
                  <ClockIcon className="w-6 h-6 text-primary" />
                  <span className="font-bold text-xl text-on-surface">
                    {form.watch("timeSlot")} •{" "}
                    {form.watch("date")?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-12">
          <button
            type="submit"
            className="inline-flex items-center gap-4 btn-primary text-2xl px-16 py-8"
          >
            ✨ Confirm & Book ✨
          </button>
        </div>
      </form>
    </div>
  );
}
