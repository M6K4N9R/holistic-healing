import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Booking from "@/db/models/Booking";
import Doctor from "@/db/models/Doctor";

export default async function handler(request, response) {
  await dbConnect();

  // ============================== GET

  if (request.method === "GET") {
    const treatmentNames = await Treatment.find({}, { name: 1, _id: 1 });
    const doctors = await Doctor.find();

    // Checking TreatmentNames read
    if (!treatmentNames || treatmentNames.length === 0) {
      return response.status(404).json({ status: "Treatments not Found" });
    }

    // Checking Doctors read
    if (!doctors || doctors.length === 0) {
      return response.status(404).json({ status: "Doctors not Found" });
    }

    // ======Response
    response.status(200).json({ treatmentNames, doctors });
  }

  // =============================== POST

  if (request.method === "POST") {
    try {
      const booking = request.body;
      await Booking.create(booking);

      response.status(201).json({ status: "Booking created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    await Doctor.findByIdAndUpdate(id, {
      $set: request.body,
    });
    // Find the joke by its ID and update the content that is part of the request body!
    response.status(200).json({ status: `Joke ${id} updated!` });
    // If successful, you'll receive an OK status code.
  }
}
