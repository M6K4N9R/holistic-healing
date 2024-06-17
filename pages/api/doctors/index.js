import Doctor from "@/db/models/Doctor";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const doctors = await Doctor.find();

      return response.status(200).json(doctors);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
