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
      <h3 className="text-3xl font-bold text-emerald-700 mb-12 text-center bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
        Review & Confirm
      </h3>

      {/* Booking Summary */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-emerald-200 mb-12">
        <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Your Healing Session
        </h4>
        <div className="grid md:grid-cols-2 gap-8 text-lg">
          <div>
            <div className="flex items-center gap-3 mb-4 p-4 bg-emerald-50 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {form.watch("treatmentName")?.slice(0, 1)}
                </span>
              </div>
              <div>
                <div className="font-bold text-gray-900">
                  {form.watch("treatmentName")}
                </div>
                <div className="text-emerald-600 font-semibold">
                  60 min • €60
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">
                {form.watch("doctorName")}
              </div>
            </div>
          </div>
          <div>
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-indigo-50 rounded-3xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <ClockIcon className="w-6 h-6 text-emerald-500" />
                <span className="font-bold text-xl text-gray-900">
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
        <h4 className="text-2xl font-bold text-emerald-700 text-center">
          Contact Details
        </h4>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-emerald-500" />
              Full Name
            </label>
            <input
              {...form.register("patientName")}
              className="w-full p-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50 bg-white/90 backdrop-blur-xl shadow-lg"
              placeholder="John Doe"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-emerald-500" />
              Email
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full p-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50 bg-white/90 backdrop-blur-xl shadow-lg"
              placeholder="john@example.com"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-emerald-500" />
              Phone
            </label>
            <input
              type="tel"
              {...form.register("phone")}
              className="w-full p-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50 bg-white/90 backdrop-blur-xl shadow-lg"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
