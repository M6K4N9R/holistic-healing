import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import AppointmentBlock from "@/components/AppointmentBlock/AppointmentBlock";
import { Grechen_Fuemen } from "next/font/google";
import AuthButton from "@/components/auth-button/AuthButton";

const grechen = Grechen_Fuemen({ weight: "400", subsets: ["latin"] });

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

  console.log("Data is: ", data);
  // const appointmentName = data.map(
  //   (appointment) => appointment.treatment[0].name
  // );
  // const appointmentDate = data.map((appointment) => appointment.date);

  // console.log("appointmentDate: ", appointmentDate);

  return (
    <>
      <div className="flex w-11/12 justify-between items-baseline bg-bright shadow-md rounded-lg p-3 my-3 mx-auto">
        <h3 className={` ${grechen.className}`}>
          Welcome back{" "}
          <span className="text-secondary font-bold">
            {data[1].doctor[0].firstName}
          </span>
        </h3>
        <AuthButton />
      </div>
      <section className="flex flex-col items-start w-11/12 bg-white shadow-md rounded-lg p-3 my-3 mx-auto">
        <h3>Your treatments are:</h3>
        {data.map((appointment) => (
          <div key={appointment._id} className="flex justify-between bg-slate-50 self-center rounded-lg mb-2">
            <AppointmentBlock
              treatment={appointment.treatment[0].name}
              date={`${appointment.date.month} ${appointment.date.day}`}
            />
          </div>
        ))}
      </section>
    </>
  );
}
