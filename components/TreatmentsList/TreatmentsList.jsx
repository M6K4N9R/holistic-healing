import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

export default function TreatmentsList() {
  const { data, isLoading } = useSWR("/api/treatments");
  const treatments = data?.treatments;

  console.log("Treatments on Home: ", treatments);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("Data of treatments", treatments);

  return (
    <section className="flex justify-center gap-2 flex-wrap">
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
                // fill={true}
                style={{ objectFit: "contain" }}
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                width={160}
                height={80}
              />
              <div className="absolute z-20 inset-0">
                <div className="bg-primary h-full w-full rounded-md opacity-60 group-hover:opacity-100" />
              </div>
              <div className="absolute bottom-5 left-2 z-30 w-3/5">
                <h3 className="text-sm text-white  text-ellipsis whitespace-normal">
                  {treatment.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
}
