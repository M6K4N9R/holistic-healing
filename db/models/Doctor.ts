import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  treatments: [{ type: Schema.Types.ObjectId, ref: "Treatment" }],

  availability: { type: Array, required: true },
  days: { type: Array, required: true },
  email: { type: String, required: true },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
