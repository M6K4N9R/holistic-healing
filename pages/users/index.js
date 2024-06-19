import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const { data: session, status } = useSession();
  //   const router = useRouter();
  //   const { lastName } = router.query;

  const { data, isLoading } = useSWR("/api/users/");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  console.log("Data is: ", data);

  return (
    <>
      <div>The List of appointments</div>
      {session && <p>Signed in as {session.user.email}</p>}
      {!session && <p>Not signed in</p>}
      <div></div>
    </>
  );
}
