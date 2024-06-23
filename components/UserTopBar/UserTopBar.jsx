import AuthButton from "../auth-button/AuthButton";
import { useSession } from "next-auth/react";

export default function UserTopBar() {
  const { data: session } = useSession();


  return (
    <section className="flex justify-between items-center w-full">
      <div className="flex-col justify-center items-center w-full">
        {session ? (
          <>
            <h3 className="-mb-5">
              Good morning <br />
              {session.user.name}
            </h3>

            <p className="text-slate-500">What can we do for you?</p>
          </>
        ) : (
          <>
            <h3>Good morning.</h3>
            <p className="text-slate-500">What can we do for you?</p>
          </>
        )}
      </div>
      <div className="p-0.5">
        <AuthButton />
      </div>
    </section>
  );
}
