import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";
import Booking from "@/db/models/Booking";
import Doctor from "@/db/models/Doctor";

export default async function handler(request, response) {
  await dbConnect();

  // ============================== GET

  if (request.method === "GET") {
    // ------------------ GETTING Treatments --------
    const treatmentNames = await Treatment.find(
      {},
      { name: 1, _id: 1, price: 1, duration: 1 }
    );
    // ------------------ GETTING Bookings Data to check availability --------
    const bookings = await Booking.find({}, { treatment: 0 });

    // ------------------- GETTING Doctor Names --------
    const doctors = await Doctor.find({}, { firstName: 1, lastName: 1 });

    // ------------------- GETTING Doctors Time slots and days ----
    const doctorHealingtouchTimeSlots = await Doctor.find(
      { lastName: "Healingtouch" },
      { availability: 1, days: 1 }
    );
    const doctorBloodloverTimeSlots = await Doctor.find(
      { lastName: "Bloodlover" },
      { availability: 1, days: 1 }
    );
    
    // ---------------------------------------------------
    // ------------------ CHECKING TreatmentNames read ---
    if (!treatmentNames || treatmentNames.length === 0) {
      return response.status(404).json({ status: "Treatments not Found" });
    }

    // -------------------- CHECKING Doctors read --------
    if (!doctors || doctors.length === 0) {
      return response.status(404).json({ status: "Doctor Names not Found" });
    }

    // -------------------- CHECKING Bookings read --------
    if (!bookings || bookings.length === 0) {
      return response.status(404).json({ status: "Bookings data not Found" });
    }

    // ------------------- CHECKING Doctor Healingtouch Time Slots read ------------
    if (
      !doctorHealingtouchTimeSlots ||
      doctorHealingtouchTimeSlots.length === 0
    ) {
      return response
        .status(404)
        .json({ status: "Doctor Healingtouch Availability info not Found" });
    }
    // ----------------- CHECKING Doctor Bloodlover Time Slots read ---------------
    if (!doctorBloodloverTimeSlots || doctorBloodloverTimeSlots.length === 0) {
      return response
        .status(404)
        .json({ status: "Doctor Bloodlover Availability info not Found" });
    }

    // =================== Response
    response.status(200).json({
      treatmentNames,
      doctors,
      doctorHealingtouchTimeSlots,
      doctorBloodloverTimeSlots, bookings
    });
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
