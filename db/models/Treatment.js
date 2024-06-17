import mongoose from "mongoose";

const { Schema } = mongoose;

const treatmentSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: [String], required: true },
  symptoms: { type: [String], required: true },
  slug: { type: String, required: true },
});

const Treatment =
  mongoose.models.Treatment || mongoose.model("Treatment", treatmentSchema);

export default Treatment;
