import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === "GET") {
      const treatments = await Treatment.find();
      if (!treatments) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(treatments);
    }
  }