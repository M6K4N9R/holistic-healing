"use client";

import { useForm, FormProvider } from "react-hook-form";
import BookingStep1 from "@/components/booking/BookingStep1";
import { BookingFormData } from "@/types/booking";

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    defaultValues: {
      treatmentId: "",
      treatmentName: "",
      doctorId: "",
      doctorName: "",
      date: undefined,
      timeSlot: "",
      patientName: "",
      email: "",
      phone: "",
    },
  });

  const step = methods.watch("treatmentId") ? 2 : 1;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-indigo-50 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent text-center mb-20 leading-tight">
            Book Your Healing Journey
          </h1>

          <form className="space-y-12">
            <BookingStep1 step={step} />

            {methods.watch("treatmentId") && (
              <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200">
                <div className="inline-flex items-center gap-4 text-emerald-700 text-lg font-semibold">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg">
                    2
                  </div>
                  <span>Time Slots & Doctor Selection (Next Step)</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
