import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import Logo from "@/db/models/Logo";
import Treatment from "@/db/models/Treatment";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();

    const treatments = await Treatment.find();
    const treatmentNames = await Treatment.find(
      { name: { $ne: "First Consultation" } },
      { slug: 1, _id: 0 }
    );
    const firstConsultation = await Treatment.findOne({
      name: "First Consultation",
    });
    const logo = await Logo.find();

    return NextResponse.json({
      treatments,
      treatmentNames,
      logo,
      firstConsultation,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
