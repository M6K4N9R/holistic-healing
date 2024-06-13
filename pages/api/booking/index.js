import dbConnect from "@/db/dbConnect";
import Treatment from "@/db/models/Treatment";

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
}
