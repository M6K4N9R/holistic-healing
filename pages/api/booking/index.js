import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Booking from "@/db/models/Booking";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const treatmentNames = await Treatment.find({}, { name: 1, _id: 1 });
    //
    if (!treatmentNames || treatmentNames.length === 0) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(treatmentNames);
  }

  if (request.method === "POST") {
    try {
      console.log("Request body:", request.body);
      const bookingData = request.body;
      await Booking.create(bookingData);

      response.status(201).json({ status: "Booking created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
