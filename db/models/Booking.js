import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  treatment: { type: String, required: true },
  doctor: { type: String, required: true },
  doctorID: { type: String, required: true },
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
// Before Change
