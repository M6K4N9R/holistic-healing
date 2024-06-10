import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === "GET") {
        const id = "6661de8d5014882f16496a89"
      const treatment = await Treatment.findById(id);
      if (!treatment) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(treatment);
    }
  }