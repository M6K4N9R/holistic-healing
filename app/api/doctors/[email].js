import Booking from "@/db/models/Booking";
import dbConnect from "@/db/dbConnect.js";
import Doctor from "@/db/models/Doctor";

export default async function handler(req, res) {
  const { email } = req.query;

  try {
    await dbConnect();

    // Finding the correct Doctor

    const foundDoctor = await Doctor.findOne({ email });

    if (!foundDoctor) {
      return res
        .status(404)
        .json({
          error:
            "We are sorry, but you are either trying to access confidential information, or you no longer working for us.",
        });
    }

    // Finding doctor's appointments

    const appointments = await Booking.find({ doctor: foundDoctor._id })
      .populate("treatment")
      .populate("doctor");

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
