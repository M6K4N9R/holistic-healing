import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

export default function DetailedTreatment() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR(`/api/treatments/${slug}`);

  console.log("Detailed Treatment data");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      <Image src={data.image} alt={data.name} width={160} height={70} />
      <h2>{data.name}</h2>
      <p>{data.text}</p>
    </div>
  );
}
