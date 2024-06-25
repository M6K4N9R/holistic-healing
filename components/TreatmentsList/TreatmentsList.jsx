import Link from "next/link";
import Image from "next/image";
import { container } from "./TreatmentList.module.css";

export default function TreatmentsList({ treatments }) {
  return (
    <section className={container}>
      <h3 className="pl-1">Our treatments</h3>
      <section className="flex justify-center gap-2 flex-wrap -mt-2">
        {treatments
          .filter((treatment) => treatment.name !== "First Consultation")
          .map((treatment) => (
            <Link href={`/treatments/${treatment.slug}`} key={treatment._id}>
              <div className="relative z-10 group">
                <Image
                  alt={treatment.name}
                  src={treatment.image}
                  loading="eager"
                  className="rounded-md"
                  priority={true}
                  style={{ objectFit: "cover" }}
                  width={140}
                  height={50}
                />
                <div className="absolute z-20 inset-0">
                  <div className="bg-primary h-full w-full rounded-md opacity-60 group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-1 left-2 z-30 w-3/5">
                  <h3 className="text-sm text-white  text-ellipsis whitespace-normal">
                    {treatment.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </section>
  );
}
