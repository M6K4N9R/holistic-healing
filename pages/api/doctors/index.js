import Doctor from "@/db/models/Doctor";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(request, response) {
  const { doctorLastName } = request.query;

  try {
    await dbConnect();

    if (request.method === "GET") {
      const appointments = await Doctor.findOne({ lastName: doctorLastName}, 'appointments' );

      return response.status(200).json({ appointments });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
