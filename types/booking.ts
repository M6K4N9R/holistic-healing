import { z } from "zod";

export interface Treatment {
  _id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
}

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  treatments: string[]; // treatment IDs
}

export const PatientDetailsSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.email({ message: "Invalid email" }),
});

export const dateObjectSchema = z.object({
  date: z.string().min(1),
  day: z.string().min(1),
});

export const BookingFormSchema = z.object({
  treatmentId: z.string().min(1),
  doctorId: z.string().min(1),
  dateObject: dateObjectSchema,
  timeSlot: z.string().min(1),
  location: z.string().min(7, "Location required"),
  patientDetails: PatientDetailsSchema,
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
