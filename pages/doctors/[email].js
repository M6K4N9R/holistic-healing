import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import AppointmentBlock from "@/components/AppointmentBlock/AppointmentBlock";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { email } = router.query;

  const { data, isLoading, error } = useSWR(
    email ? `/api/doctors/${email}` : null
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!data) {
    return;
  }

  // const doctorName = data.map((appointment) => appointment[0].doctor.firstName);

  console.log("appointments are: ", data[1].doctor[0].firstName);
  // console.log("Doctor name: ", doctorName);

  return (
    <>
      <h3>Welcome back {data[1].doctor[0].firstName}</h3>
      {/* <div>Here is The List of your appointments for the next two months:</div>
{data.map()}
      <AppointmentBlock treatment={}/> */}
    </>
  );
}
