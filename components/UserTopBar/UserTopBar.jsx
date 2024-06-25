import AuthButton from "../auth-button/AuthButton";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";

export default function UserTopBar({ grechen }) {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR("/api/treatments");
  const logo = data?.logo[1];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <section className="flex justify-between items-center w-full mt-2">
      {session ? (
        <div className="flex-col justify-center items-center w-full">
          <h3 className="-mb-5">
            Good morning <br />
            {session.user.name}
          </h3>
        </div>
      ) : (
        <>
          <Image
            alt="Holistic Healing Logo"
            src={logo.logoPrimary}
            loading="eager"
            // className="rounded-md"
            // style={{ objectFit: "contain" }}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            width={40}
            height={40}
          />
        </>
      )}

      <div className="p-0.5">
        <AuthButton />
      </div>
    </section>
  );
}
