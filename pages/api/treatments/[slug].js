import Treatment from "@/db/models/Treatment.js";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(request, response) {
  const { slug } = request.query;

  try {
    await dbConnect();

    if (request.method === "GET") {
      const treatment = await Treatment.findOne({ slug });
      const treatmentNames = await Treatment.find(
        { name: { $ne: "First Consultation" } },
        { slug: 1, _id: 0 }
      );

      return response.status(200).json({ treatment, treatmentNames });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
