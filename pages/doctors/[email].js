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

  // Fetch data using useSWR unconditionally
  const { data, error } = useSWR(email ? `/api/doctors/${email}` : null);

  // Handle session loading state
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    router.replace("/"); // Redirect to home if not authenticated
    return null;
  }

  // Handle data loading state
  if (!data && !error) {
    return <h1>Loading...</h1>;
  }

  // Handle error state
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // Handle case where data is not available
  if (!data) {
    return <h1>No data available</h1>;
  }

  console.log("Data is: ", data[0]);
  const doctorName = data[0].doctor.firstName;

  return (
    <>
      <div className="flex w-11/12 justify-between items-baseline bg-bright shadow-md rounded-lg p-3 mt-3 pb-5 mb-24 mx-auto">
        <h3 className={` ${grechen.className}`}>
          Welcome back{" "}
          <span className="text-secondary font-bold">{doctorName}</span>
        </h3>
        <AuthButton />
      </div>
      <section className="flex flex-col items-start w-11/12 bg-white shadow-md rounded-lg p-3 my-3 mx-auto">
        <h3>Your treatments are:</h3>
        {data.map((appointment) => (
          <div
            key={appointment._id}
            className="flex justify-between bg-slate-50 self-center rounded-lg mb-2"
          >
            <AppointmentBlock
              treatment={appointment.treatment.name}
              date={appointment.date.date}
            />
          </div>
        ))}
      </section>
    </>
  );
}
