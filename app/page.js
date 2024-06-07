import dbConnect from "@/db/dbConnect";
import Image from "next/image";
import Treatment from "@/db/models/Treatment";

export default async function Home() {
  await dbConnect();
  const treatments = await Treatment.find();

  console.log("Response: ", treatments);
  return (
    <div>
      <h3>Hello</h3>
      <a>
        In development. Supportet by{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={50}
          height={12}
          priority
        />
      </a>
    </div>
  );
}
