import { z } from "zod";
import mongoose from "mongoose";

export interface Treatment {
  _id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
}

export interface LeanTreatment {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  duration: number;
  location: mongoose.Types.ObjectId[]; // or string[]
}

export interface Doctor {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  treatments: mongoose.Types.ObjectId[];
  schedule: any[];
}

export interface LeanDoctor {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  schedule: any[];
}

export type LeanDoctors = LeanDoctor[];

// NEW Booking Flow ==========================
export interface AvailabilityFilters {
  date?: string;
  location?: string;
}

export interface AvailabilityResponse {
  treatment: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    locations: string[];
  };
  doctors: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    schedule: any[];
  }>;
  allLocations: string[]; // unique across doctors
  availableDates: string[]; // ["2026-02-05", "2026-02-07"]
  locationsCapacity: Record<string, { slotsLeft: number }>;
  // 👇 drill‑down (populated when date/location provided)
  dateDetails: Record<
    string, // "2026-02-05"
    {
      locationsCapacity: Record<
        string,
        { slotsLeft: number; doctors: string[] }
      >;
    }
  >;
}
// =======================================================

export interface DateObject {
  date: string;
  day: string;
}

export interface TreatmentAvailability {
  treatment: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    location: string[];
    availableDays: string[];
  };
  doctors: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    schedule: any[];
  }>;
  allLocations: string[];
  treatmentLocations: string[];
  allDays: string[];
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
