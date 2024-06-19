import Booking from "@/db/models/Booking";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
      await dbConnect();

      const appointments = await Booking.find({ userId });

      res.status(200).json(appointments);
  } catch (error) {
      console.log(error);
  }
}
