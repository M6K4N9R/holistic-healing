import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

export default function TreatmentsList() {
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("Data of treatments", data);

  return (
    <section className="flex justify-evenly gap-2 flex-wrap">
      {data
        .filter((treatment) => treatment.name !== "First Consultation")
        .map((treatment) => (
          <div key={treatment._id}>
            <Image
              alt={treatment.name}
              src={treatment.image}
              // fill={true}
              style={{ objectFit: "contain" }}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              width={150}
              height={70}
            />
          </div>
        ))}
    </section>
  );
}
