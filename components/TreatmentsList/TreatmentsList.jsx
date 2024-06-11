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
    <section className="flex justify-center gap-2 flex-wrap">
      {data
        .filter((treatment) => treatment.name !== "First Consultation")
        .map((treatment) => (
          <div
            className="relative filter opacity-80 hover:opacity-100"
            key={treatment._id}
          >
            <Image
              alt={treatment.name}
              src={treatment.image}
              className="rounded-md"
              // fill={true}
              style={{ objectFit: "contain" }}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              width={150}
              height={70}
            />
            <div className="absolute z-40 inset-0 opacity-60">
              <div className="bg-primary h-full w-full rounded-md" />
            </div>
            <div className="absolute bottom-5 left-2 z-50 w-3/5">
              <h3 className="text-sm text-wrap text-white text-ellipsis whitespace-wrap overflow">
                {treatment.name}
              </h3>
            </div>
          </div>
        ))}
    </section>
  );
}
