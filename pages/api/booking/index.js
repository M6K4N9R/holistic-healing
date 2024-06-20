import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Booking from "@/db/models/Booking";
import Doctor from "@/db/models/Doctor";

export default async function handler(request, response) {
  await dbConnect();

  // ============================== GET

  if (request.method === "GET") {

    // ------------------ Treatments --------
    const treatmentNames = await Treatment.find(
      {},
      { name: 1, _id: 1, price: 1, duration: 1 }
    );

    // ------------------- Doctor Names --------
    const doctors = await Doctor.find({}, { firstName: 1, lastName: 1 });

    // ------------------- Doctors Availability ----
    const doctorHealingtouchAvailability = await Doctor.find(
      { lastName: "Healingtouch" },
      { availability: 1, days: 1 }
    );
    const doctorBloodloverAvailability = await Doctor.find(
      { lastName: "Bloodlover" },
      { availability: 1, days: 1 }
    );

    // Checking TreatmentNames read
    if (!treatmentNames || treatmentNames.length === 0) {
      return response.status(404).json({ status: "Treatments not Found" });
    }

    // Checking Doctors read
    if (!doctors || doctors.length === 0) {
      return response.status(404).json({ status: "Doctor Names not Found" });
    }
    // Checking Doctor Healingtouch Availability  read
    if (
      !doctorHealingtouchAvailability ||
      doctorHealingtouchAvailability.length === 0
    ) {
      return response
        .status(404)
        .json({ status: "Doctor Healingtouch Availability info not Found" });
    }
    // Checking Doctor Bloodlover Availability  read
    if (
      !doctorBloodloverAvailability ||
      doctorBloodloverAvailability.length === 0
    ) {
      return response
        .status(404)
        .json({ status: "Doctor Bloodlover Availability info not Found" });
    }

    // ======Response
    response
      .status(200)
      .json({ treatmentNames, doctors, doctorHealingtouchAvailability, doctorBloodloverAvailability });
  }

  // =============================== POST

  if (request.method === "POST") {
    try {
      const booking = request.body;
      await Booking.create(booking);

      response.status(201).json({
        status: "Booking is created",
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
