import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import Logo from "@/db/models/Logo";
import Treatment from "@/db/models/Treatment";

export async function GET() {
  try {
    await dbConnect();

    const treatments = await Treatment.find().lean();
    const treatmentNames = await Treatment.find(
      { name: { $ne: "First Consultation" } },
      { slug: 1, _id: 0 }
    ).lean();
    const firstConsultation = await Treatment.findOne({
      name: "First Consultation",
    }).lean();
    const logo = await Logo.find().lean();

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
