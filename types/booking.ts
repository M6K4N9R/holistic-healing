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

import { z } from "zod";

export const BookingFormSchema = z.object({
  treatmentId: z.string().min(1),
  treatmentName: z.string().min(1),
  doctorId: z.string().min(1),
  doctorName: z.string().min(1),
  date: z.date(),
  timeSlot: z.string().min(1),
  patientName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
