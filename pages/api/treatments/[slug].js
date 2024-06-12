import Treatment from "@/db/models/Treatment.js";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(request, response) {
  const { slug } = request.query;
  try {
    await dbConnect();

    if (request.method === "GET") {
      const treatments = await Treatment.find();
      const singleTreatment = treatments?.fin(())
      return response.status(200).json(treatment);
    }

    // const VIEWS_WITH_SLUGS = data?.filter((post) => post.slug)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
