import mongoose, { Schema, Document } from "mongoose";

interface TimeSlotEntry {
  day: string;           // "Mon", "Tue", etc.
  timeSlots: string[];   // ["09:00 - 10:00", "10:00 - 11:00"]
}

interface ScheduleEntry {
  location: string;      // "Akasha", "Praxis Kollektive", "Bohnsdorf.?"
  availability: TimeSlotEntry[];
}

interface DoctorDocument extends Document {
  firstName: string;
  lastName: string;
  treatments: mongoose.Types.ObjectId[];
  email: string;
  schedule: ScheduleEntry[];
}

// 👈 Sub-schema for schedule (no _id)
const scheduleEntrySchema = new Schema<ScheduleEntry>(
  {
    location: { type: String, required: true },
    availability: [
      {
        day: { type: String, required: true },
        timeSlots: [{ type: String, required: true }],
      },
    ],
  },
  { _id: false }  // No MongoDB ID for subdocs
);

const doctorSchema = new Schema<DoctorDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],
    email: { type: String, required: true },
    
    // 👈 Your exact schedule structure!
    schedule: {
      type: [scheduleEntrySchema],  // Array of ScheduleEntry
      required: true,
    },
  },
  {
    timestamps: true,  // createdAt, updatedAt
  }
);

// 👈 Indexes for fast queries
doctorSchema.index({ "schedule.location": 1 });
doctorSchema.index({ "schedule.availability.day": 1 });
doctorSchema.index({ treatments: 1 });

const Doctor = mongoose.models.Doctor || mongoose.model<DoctorDocument>("Doctor", doctorSchema);

export default Doctor;


// =========================== OLD SCHEMA

/* const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],

  availability: { type: Array, required: true },
  days: { type: Array, required: true }, // format = ["Mon", "Tue", "Wed",....]
  email: { type: String, required: true },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;

 */


// =============================== DOCTORS SCHEDULES

// ----- Serene Heelingtouch

/* const scheduleHeelingtouch = [
  {
    location: "Akasha",
    availability: [
      {
        day: "Mon",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "14:00 - 15:00",
        ],
      },
      {
        day: "Wed",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "14:00 - 15:00",
        ],
      },
      {
        day: "Fri",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "12:00 - 13:00",
        ],
      },
    ],
  },
  {
    location: "Praxis Kollektive",
    availability: [
      {
        day: "Thu",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "14:00 - 15:00",
          "15:00 - 16:00",
        ],
      },
    ],
  },
  {
    location: "Bohnsdorf",
    availability: [
      {
        day: "Sat",
        timeSlots: ["17:00 - 18:00", "18:00 - 19:00"],
      },
      {
        day: "Sun",
        timeSlots: ["09:00 - 10:00", "10:00 - 11:00"],
      },
    ],
  },
];
 */

// ---------- Liam Bloodlover

/* 
const scheduBloodlover = [
  {
    location: "Akasha",
    availability: [
      {
        day: "Tue",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "16:00 - 17:00",
          "17:00 - 18:00",
          "18:00 - 19:00",
        ],
      },
      {
        day: "Thu",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "16:00 - 17:00",
          "17:00 - 18:00",
          "18:00 - 19:00",
        ],
      },
    ],
  },
  {
    location: "Praxis Kollektive",
    availability: [
      {
        day: "Mon",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "14:00 - 15:00",
          "15:00 - 16:00",
          "16:00 - 17:00",
          "17:00 - 18:00",
        ],
      },
      {
        day: "Wed",
        timeSlots: [
          "09:00 - 10:00",
          "10:00 - 11:00",
          "11:00 - 12:00",
          "13:00 - 14:00",
          "14:00 - 15:00",
          "15:00 - 16:00",
          "16:00 - 17:00",
          "17:00 - 18:00",
        ],
      },
    ],
  },
];
 */