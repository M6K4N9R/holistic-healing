import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { container } from "./FirstConsultation.module.css";

export default function FirstConsultation() {
  const { data, isLoading } = useSWR("/api/treatments");
  const treatments = data?.treatments;
  const firstConsultation = treatments.find(
    (treatment) => treatment.name === "First Consultation"
  );

  console.log("Treatments in FirstConsultation: ", treatments);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("Data of treatments", treatments);

  return (
    <section className={container}>
      <h3 className="pl-1">Our treatments</h3>
      <section className="p-2">
        <Link href="./booking/">
          <Image
            alt={firstConsultation.name}
            src={firstConsultation.image}
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
        </Link>
      </section>
    </section>
  );
}
