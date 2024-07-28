import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./FirstConsultation.module.css";

export default function FirstConsultation({ firstConsultation }) {
  const router = useRouter();

  function handleToBooking() {
    router.push("/booking/");
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3>First Consultation</h3>
        <p className={styles.p}>
          In-depth initial consultation resulting in personalized treatments
          plan
        </p>
        <button className={styles.book} onClick={handleToBooking}>
          Book
        </button>
      </div>
      <section className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            alt={firstConsultation.name}
            src={firstConsultation.image}
            loading="eager"
            className={styles.image}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
    </section>
  );
}
