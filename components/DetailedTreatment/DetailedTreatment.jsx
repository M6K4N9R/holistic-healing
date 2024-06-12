import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

export const StyledSymptomsBox = styled.section`
  margin: 3rem auto;
  padding: 1rem;
  width: 90vw;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  background-color: var(--white);
  box-shadow: 0px 3px 8px var(--pastel);
  color: var(--dark);
  border-radius: 9px;
`;

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
    <div className="flex flex-col items-start">
      <Image
        src={data.image}
        alt={data.name}
        width={1920}
        height={1080}
        className="w-full h-[70vh] object-cover md:w-[90vw] lg:w-[45vw]"
      />
      <div className="px-3">
        <h2>{data.name}</h2>
        <p className="white-space-pre-wrap">{data.text}</p>
        <h3>Symptoms Addressed</h3>
        <p className="white-space-pre-wrap">
          {`You can consider booking`} <strong>{`${data.name}`}</strong>{" "}
          {`when you have the following symptoms:`}
        </p>
        <StyledSymptomsBox>
          {data.symptoms.map((symptom, index) => (
            <div className="p-4 rounded-lg bg-secondary text-white" key={index}>
              {symptom}
            </div>
          ))}
        </StyledSymptomsBox>
      </div>
    </div>
  );
}
