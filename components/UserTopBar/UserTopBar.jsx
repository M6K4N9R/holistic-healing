import AuthButton from "../auth-button/AuthButton";
import { useSession } from "next-auth/react";
import { profile } from "./Profile.module.css";

import SignIn from "./sign-in";
import ProfileInfo from "./info";

export default function UserTopBar() {
  const { data: session } = useSession();
  console.log("session: ", session);

  return (
    <section className={profile}>
      {session ? <ProfileInfo session={session} /> : <SignIn />}
      <section className={`flex justify-between items-center w-full`}>
        <div className={`flex-col justify-center items-center w-full`}>
          <h3>Good morning.</h3>
          {session && <h3>Good morning {session.user.name}</h3>}
          {!session && <h3>Good morning. You are not signed in yet.</h3>}
          <p className="text-slate-500">What can we do for you?</p>
        </div>
        <div className="p-0.5">
          <AuthButton />
        </div>
      </section>
    </section>
  );
}
