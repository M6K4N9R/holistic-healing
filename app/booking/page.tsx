"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormData, BookingFormSchema } from "@/types/booking";
import BookingStep1 from "@/components/booking/BookingStep1";
import BookingStep2 from "@/components/booking/BookingStep2";
import BookingStep3 from "@/components/booking/BookingStep3";
import { createBooking } from "../actions/booking-flow";

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      treatmentId: "",
      doctorId: "",
      dateObject: { date: "", day: "" },
      timeSlot: "",
      location: "",
      patientDetails: { name: "", phone: "", email: "" },
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    const formData = new FormData();
    formData.append("treatmentId", data.treatmentId);
    formData.append("doctorId", data.doctorId);
    formData.append("date", JSON.stringify(data.dateObject));
    formData.append("time", data.timeSlot);  // 👈 Matches server action
    formData.append("location", data.location);

    // FLATTEN patientDetails
    formData.append("patientName", data.patientDetails.name);
    formData.append("patientPhone", data.patientDetails.phone || "");
    formData.append("patientEmail", data.patientDetails.email);

    console.log("📤 Submitting:", Object.fromEntries(formData));
    await createBooking(formData);
  };

  // 👈 FIXED: Step logic (requires location + timeSlot)
  const step = methods.watch("treatmentId") && methods.watch("location")
    ? methods.watch("dateObject")?.date && methods.watch("timeSlot") && methods.watch("doctorId")
      ? 3
      : 2
    : 1;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-surface-variant py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-on-surface-variant text-center mb-24 leading-tight">
            Book Your Healing Journey
          </h1>

          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-16">
            <BookingStep1 step={step} />
            <BookingStep2 step={step} />

            {/* 👈 FIXED: Contact + Step3 (after timeSlot + doctorId) */}
            {(step >= 2.5 || step === 3) && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <h4 className="text-2xl font-bold text-primary text-center">
                  Contact Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    {...methods.register("location")}
                    name="location"  // 👈 FIXED: Typo "lacation" → "location"
                    placeholder="Location *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.name")}
                    placeholder="Full name *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.email")}
                    type="email"
                    placeholder="Email *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.phone")}
                    type="tel"
                    placeholder="Phone"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                </div>
              </div>
            )}

            <BookingStep3 step={step} />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
