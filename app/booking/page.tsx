"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormData, BookingFormSchema } from "@/types/booking";
import BookingStep1 from "@/components/booking/BookingStep1";
import BookingStep2 from "@/components/booking/BookingStep2";
import BookingStep3 from "@/components/booking/BookingStep3";

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
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

  const treatmentId = methods.watch("treatmentId");
  const date = methods.watch("date");
  const timeSlot = methods.watch("timeSlot");
  const doctorId = methods.watch("doctorId");

  const step = treatmentId ? (date && timeSlot && doctorId ? 3 : 2) : 1;

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking confirmed:", data);
    alert("Booking confirmed! (Demo)");
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-surface-variant py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-on-surface-variant text-center mb-24 leading-tight">
            Book Your Healing Journey
          </h1>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-16"
          >
            <BookingStep1 step={step} />
            <BookingStep2 step={step} />
            <BookingStep3 step={step} />

            {step === 3 && (
              <div className="text-center pt-12">
                <button
                  type="submit"
                  className="inline-flex items-center gap-4 btn-primary text-2xl px-16 py-8"
                >
                  <span>✨ Confirm & Book ✨</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
