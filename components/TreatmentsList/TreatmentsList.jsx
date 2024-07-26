import Link from "next/link";
import Image from "next/image";
import styles from "./TreatmentList.module.css";

export default function TreatmentsList({
  treatments,
  searchedSymptom,
  falseSearchedSymptom,
}) {
  const conditionalRendering = () => {
    const filteredTreatments = treatments.filter(
      (treatment) => treatment.name !== "First Consultation"
    );

    if (searchedSymptom && searchedSymptom !== "" && !falseSearchedSymptom) {
      return filteredTreatments
        .filter((treatment) => treatment.symptoms.includes(searchedSymptom))
        .map((treatment) => renderTreatment(treatment));
    } else {
      return filteredTreatments.map((treatment) => renderTreatment(treatment));
    }
  };
  function renderTreatment(treatment) {
    return (
      <Link href={`/treatments/${treatment.slug}`} key={treatment._id}>
        <div className={styles.container}>
          <Image
            alt={treatment.name}
            src={treatment.image}
            loading="eager"
            className={styles.image}
            priority={true}
            width={140}
            height={50}
          />
          <div className={styles.overlay}>
            <div className={styles.overlayBackground} />
          </div>
          <div className={styles.title}>
            <h3>{treatment.name}</h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <section className={styles.container}>
      <h3 className="pl-1">Our treatments</h3>
      <section className="flex justify-center gap-2 flex-wrap -mt-2">
        {conditionalRendering()}
      </section>
    </section>
  );
}
