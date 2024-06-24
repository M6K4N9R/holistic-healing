import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import {
  container,
  image,
  imageWrapper,
  imageContainer,
} from "./FirstConsultation.module.css";

export default function FirstConsultation() {
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  const firstConsultation = data?.firstConsultation;

  console.log("Treatments in FirstConsultation: ", firstConsultation);

  return (
    <section className={container}>
      <h3 className="text-center pt-6">First Consultation</h3>
      <p className="text-sm text-center -mt-2 mb-10">
        In-depth initial consultation resulting in personalized treatments plan
      </p>
      <section className={imageContainer}>
        <Link href="./booking/">
          <div className={imageWrapper}>
            <Image
              alt={firstConsultation.name}
              src={firstConsultation.image}
              loading="eager"
              className={image}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </section>
    </section>
  );
}
