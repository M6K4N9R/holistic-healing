"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormData, BookingFormSchema } from "@/types/booking";
import BookingStep1 from "@/components/booking/BookingStep1";
import BookingStep2 from "@/components/booking/BookingStep2";
import BookingStep3 from "@/components/booking/BookingStep3";
import { createBooking } from "../actions/booking-flow";
import { log } from "console";

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      treatmentId: "",
      doctorId: "",
      dateObject: {
        date: "",
        day: "",
      },
      timeSlot: "",
      location: "",
      patientDetails: {
        name: "",
        phone: "",
        email: "",
      },
    },
  });

  // FIX 2: Proper onSubmit handler
  const onSubmit = async (data: BookingFormData) => {
    const formData = new FormData();

    // Add all other fields
    formData.append("treatmentId", data.treatmentId);
    formData.append("doctorId", data.doctorId);
    formData.append("date", JSON.stringify(data.dateObject));
    formData.append("time", data.timeSlot);
    formData.append("location", data.location);

    // FLATTEN patient Details
    formData.append("patientName", data.patientDetails.name);
    formData.append("patientPhone", data.patientDetails.phone || "");
    formData.append("patientEmail", data.patientDetails.email);

    console.log("📤 Submitting:", Object.fromEntries(formData));

    // Call the CORRECT createBooking function
    await createBooking(formData);
  };

  // - LIVE LOGGING ============== DELETE LATER

  const treatment = methods.watch("treatmentId");
  const location = methods.watch("location");
  const availableDoctors = methods.watch("doctorId");
  const date = methods.watch("dateObject");
  const timeSlot = methods.watch("timeSlot");

  console.log("🎯 LIVE FORM STATE:", {
    treatment,
    location,
    doctors: availableDoctors,
    date,
    timeSlot,
  });

  // ============================= END LIVE LOGGING

  const step = methods.watch("treatmentId")
    ? methods.watch("dateObject") &&
      methods.watch("timeSlot") &&
      methods.watch("doctorId")
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

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-16"
          >
            <BookingStep1 step={step} />
            <BookingStep2 step={step} />

            {/* CONTACT DETAILS - BEFORE STEP 3 */}
            {step >= 3 && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <h4 className="text-2xl font-bold text-primary text-center">
                  Contact Details
                </h4>

                {/* Date will be set in onSubmit */}
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    {...methods.register("location")}
                    name="lacation"
                    placeholder="Location"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.name")}
                    name="patientName"
                    placeholder="Full name *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.email")}
                    name="email"
                    type="email"
                    placeholder="Email *"
                    className="p-4 rounded-2xl border-2 border-outline-variant focus:border-primary"
                  />
                  <input
                    {...methods.register("patientDetails.phone")}
                    name="phone"
                    type="tel"
                    placeholder="Phone *"
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
