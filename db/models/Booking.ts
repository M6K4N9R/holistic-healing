import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    treatment: { type: Schema.Types.ObjectId, ref: "Treatment" },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    date: { type: Object, required: true },
    time: { type: String, required: true },
    patientDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: false },
      location: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;

