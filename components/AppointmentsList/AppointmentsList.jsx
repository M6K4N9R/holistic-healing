import useSWR from "swr";

import { useRouter } from "next/router";

export default function AppointmentsList() {
  const router = useRouter();

  const { data, isLoading } = useSWR("/api/doctors/");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  const doctor1 = data?.filter(
    (doctor) => doctor._id === "666b4cd3edd79781ae9a95ce"
  );
  // const treatmentNamesArray = data?.treatmentNames.map(
  //   (treatment) => treatment.slug
  // );
  // const indexOfCurrentTreatment = treatmentNamesArray?.indexOf(
  //   currentTreatment?.slug
  // );

  console.log("Doctors appointments: ", doctorAppointments);

  console.log("Doctors: ", data);
  console.log("Doctor1: ", doctor1.firstName);

  return (
    <>
      <div>The List of appointments</div>
      <div>{doctor1.appointments}</div>
    </>
  );
}