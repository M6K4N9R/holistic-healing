import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { StyledButton } from "../DefaulButton/DefaultButton";
import { StyledPlainButton } from "../DefaulButton/DefaultButton";

const StyledSymptomsBox = styled.section`
  margin: 3rem auto 2rem auto;
  padding: 1rem;
  width: 90vw;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: space-evenly;
  gap: 0.5rem;
  background-color: var(--white);
  box-shadow: 0px 3px 8px var(--pastel);
  color: var(--dark);
  border-radius: 9px;
`;

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

  // =========================================== Buttons ========

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

  return (
    <>
      <div className="flex flex-row justify-around px-1 items-center rounded-lg bg-gray-100 m-2 p-2">
        <button onClick={handlePrev} value={"<"}>
          {"<"}
        </button>
        <h4>Discover other Treatments</h4>
        <button onClick={handleNext} value={">"}>
          {">"}
        </button>
      </div>
      <div className="flex flex-col items-start mb-5">
        <Image
          alt={currentTreatment.name}
          src={currentTreatment.image}
          width={1920}
          height={1080}
          className="w-full h-[70vh] object-cover md:w-[90vw] lg:w-[45vw]"
        />
        <div className="px-3">
          <h2>{currentTreatment.name}</h2>
          <p className="white-space-pre-wrap">{currentTreatment.text}</p>
        </div>

        <StyledSymptomsBox>
          <h3>Symptoms Addressed</h3>
          <p className="white-space-pre-wrap mb-4">
            {`You can consider booking`}{" "}
            <strong>{`${currentTreatment.name}`}</strong>{" "}
            {`when you have the following symptoms:`}
          </p>
          {currentTreatment.symptoms.map((symptom, index) => (
            <div
              className="grow px-2 py-1 h-8 text-center align-middle rounded-lg bg-secondary text-white"
              key={index}
            >
              {symptom}
            </div>
          ))}
        </StyledSymptomsBox>
        <div className="self-center gap-2">
          <StyledPlainButton onClick={handleGoBack}>Go back</StyledPlainButton>
          <StyledButton>{`Book ${currentTreatment.name}`}</StyledButton>
        </div>
      </div>
    </>
  );
}
