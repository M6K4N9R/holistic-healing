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

  return (
    <div>
      <Image
        alt=""
        src={data.image}
        fill={true}
        style={{ objectFit: "contain" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
      />
      <h2>{data.name}</h2>
      <p>{data.text}</p>
    </div>
    // <ul>
    //   {data.map((treatment) => (
    //     <li key={treatment._id}>
    //       {/* <Link href={`/${joke._id}`}>{joke.joke}</Link> */}
    //       <h2>{treatment.name}</h2>
    //       <p>{treatment.text}</p>
    //     </li>
    //   ))}
    // </ul>
  );
}
