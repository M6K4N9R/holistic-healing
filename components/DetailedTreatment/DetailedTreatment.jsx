import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import { StyledButton } from "../DefaulButton/DefaultButton";
import { StyledPlainButton } from "../DefaulButton/DefaultButton";
import styles from "./DetailedTreatment.module.css";

export default function DetailedTreatment() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR("/api/treatments/");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  const currentTreatment = data?.treatments.find(
    (treatment) => treatment.slug === slug
  );
  const treatmentNamesArray = data?.treatmentNames.map(
    (treatment) => treatment.slug
  );
  const indexOfCurrentTreatment = treatmentNamesArray?.indexOf(
    currentTreatment?.slug
  );

  console.log("Data on detailed page: ", data);
  console.log("Array of slugs: ", treatmentNamesArray);

  // =========================================== Next Prev Buttons ========

  function handleNext() {
    let indexOfNextTreatment;

    if (indexOfCurrentTreatment < treatmentNamesArray?.length - 1) {
      indexOfNextTreatment = indexOfCurrentTreatment + 1;
    } else {
      indexOfNextTreatment = 0;
    }
    const nextTreatment = treatmentNamesArray[indexOfNextTreatment];
    router.push(`/treatments/${nextTreatment}`);
  }
  function handlePrev() {
    let indexOfPrevTreatment;

    if (indexOfCurrentTreatment > 0) {
      indexOfPrevTreatment = indexOfCurrentTreatment - 1;
    } else {
      indexOfPrevTreatment = treatmentNamesArray.length - 1;
    }
    const prevTreatment = treatmentNamesArray[indexOfPrevTreatment];
    router.push(`/treatments/${prevTreatment}`);
  }

  function handleGoBack() {
    router.push(`/`);
  }

  function handleBookAnAppointment() {
    router.push(`/booking/`);
  }
  // -------------------------------------------------------------------------

  return (
    <>
      <div className={styles.nextPrevButtonsContainer}>
        <button onClick={handlePrev} value={"<"}>
          {"<"}
        </button>
        <h4>Discover other Treatments</h4>
        <button onClick={handleNext} value={">"}>
          {">"}
        </button>
      </div>
      <div className={styles.bodyContainer}>
        <Image
          alt={currentTreatment.name}
          src={currentTreatment.image}
          width={1920}
          height={1080}
          className={styles.image}
        />
        <div className={styles.text}>
          <h2>{currentTreatment.name}</h2>
          <p className={styles.p}>{currentTreatment.text}</p>
        </div>

        <div className={styles.symptomsContainer}>
          <h3>Symptoms Addressed</h3>
          <p className={styles.p}>
            {`You can consider booking`}{" "}
            <strong>{`${currentTreatment.name}`}</strong>{" "}
            {`when you have the following symptoms:`}
          </p>
          {currentTreatment.symptoms.map((symptom, index) => (
            <div className={styles.symptom} key={index}>
              {symptom}
            </div>
          ))}
        </div>
        <div className="self-center gap-2">
          <StyledPlainButton onClick={handleGoBack}>Go back</StyledPlainButton>
          <StyledButton
            onClick={handleBookAnAppointment}
          >{`Book ${currentTreatment.name}`}</StyledButton>
        </div>
      </div>
    </>
  );
}
