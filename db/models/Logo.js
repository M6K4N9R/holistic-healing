import mongoose from "mongoose";

const { Schema } = mongoose;

const logoSchema = new Schema({
  
    logoPrimary: { type: String, required: true },
    logoSecondary: { type: String, required: true },
    logoDark: { type: String, required: true },
    logoWhite: { type: String, required: true },
    logoPastel: { type: String, required: true },
    logoBright: { type: String, required: true },
  
});

const Logo =
  mongoose.models.Logo || mongoose.model("Logo", logoSchema);

export default Logo;

