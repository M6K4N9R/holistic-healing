import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  container,
  image,
  imageWrapper,
  imageContainer,
  book,
} from "./FirstConsultation.module.css";

export default function FirstConsultation() {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  const firstConsultation = data?.firstConsultation;

  function handleToBooking() {
    router.push("/booking/");
  }

  console.log("Treatments in FirstConsultation: ", firstConsultation);

  return (
    <section className={container}>
      <div className="text-center pt-4 pb-5">
        <h3>First Consultation</h3>
        <p className="text-sm mb-5">
          In-depth initial consultation resulting in personalized treatments
          plan
        </p>
        <button className={book} onClick={handleToBooking}>
          Book
        </button>
      </div>
      <section className={imageContainer}>
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
      </section>
    </section>
  );
}
