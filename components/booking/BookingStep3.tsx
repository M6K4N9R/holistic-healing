"use client";

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

  const isComplete = form.watch("timeSlot") && form.watch("doctorId");

  return (
    <div className={step >= 3 && isComplete ? "block" : "hidden"}>
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

      {/* Contact Form */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-primary text-center">
          Contact Details
        </h4>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              Full Name
            </label>
            <input
              {...form.register("patientName")}
              className="w-full p-4 rounded-2xl border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-bright backdrop-blur-xl shadow-lg text-on-surface-variant"
              placeholder="John Doe"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-primary" />
              Email
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full p-4 rounded-2xl border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-bright backdrop-blur-xl shadow-lg text-on-surface-variant"
              placeholder="john@example.com"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-on-surface-variant mb-2 flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-primary" />
              Phone
            </label>
            <input
              type="tel"
              {...form.register("phone")}
              className="w-full p-4 rounded-2xl border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-bright backdrop-blur-xl shadow-lg text-on-surface-variant"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
