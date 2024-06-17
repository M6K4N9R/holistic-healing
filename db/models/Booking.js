import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  treatment: { type: [Schema.Types.ObjectId], ref: "Treatment" },
  doctor: { type: [Schema.Types.ObjectId], ref: "Doctor" },
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
// Before Change
