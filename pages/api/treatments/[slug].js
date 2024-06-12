import Treatment from "@/db/models/Treatment.js";
import dbConnect from "@/db/dbConnect.js";

export default async function handler(request, response) {
  const { slug } = request.query;
  console.log("Slug of the request: ", slug);
  try {
    await dbConnect();

    if (request.method === "GET") {
      const treatment = await Treatment.findOne({ slug });

      return response.status(200).json(treatment);
    }

    // const VIEWS_WITH_SLUGS = data?.filter((post) => post.slug)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
