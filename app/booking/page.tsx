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
    formData.append("time", data.timeSlot);
    formData.append("location", data.location);

    // FLATTEN patientDetails
    formData.append("patientName", data.patientDetails.name);
    formData.append("patientPhone", data.patientDetails.phone || "");
    formData.append("patientEmail", data.patientDetails.email);

    console.log("📤 Submitting:", Object.fromEntries(formData));
    await createBooking(formData);
  };

  // 👈 FIXED: Clear step progression (1→2→3)
  const step = (() => {
    const hasTreatment = !!methods.watch("treatmentId");
    const hasDateLocation =
      !!methods.watch("dateObject.date") && !!methods.watch("location");
    const hasDoctorTime =
      !!methods.watch("doctorId") && !!methods.watch("timeSlot");

    if (hasTreatment && hasDateLocation && hasDoctorTime) return 3; // All complete
    if (hasTreatment && hasDateLocation) return 2; // Date + Location
    if (hasTreatment) return 1.5; // Treatment only
    return 1; // Start
  })();

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
            {/* 👈 STEP 1: Treatment + Date + Location */}
            <BookingStep1 step={step} />

            {/* 👈 STEP 2: Doctors + Times (after date/location) */}
            <BookingStep2 step={step} />

            {/* CONTACT: After Step2 complete */}
            {step >= 2.5 && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <h4 className="text-2xl font-bold text-primary text-center">
                  Contact Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    {...methods.register("patientDetails.name")}
                    placeholder="Full name *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary col-span-1"
                  />
                  <input
                    {...methods.register("patientDetails.email")}
                    type="email"
                    placeholder="Email *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary col-span-1"
                  />
                  <input
                    {...methods.register("patientDetails.phone")}
                    type="tel"
                    placeholder="Phone"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary col-span-1"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Review (only when ALL fields complete) */}
            {step === 3 && <BookingStep3 step={step} />}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
