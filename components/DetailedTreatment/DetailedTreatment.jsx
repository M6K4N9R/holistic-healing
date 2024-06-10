import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

export default function DetailedTreatment() {
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ul>
      {data.map((treatment) => (
        <li key={treatment._id}>
          {/* <Link href={`/${joke._id}`}>{joke.joke}</Link> */}
          <h2>{treatment.name}</h2>
          <p>{treatment.text}</p>
        </li>
      ))}
    </ul>
  );
}