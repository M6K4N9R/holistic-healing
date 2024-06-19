import { btn, logout, login } from "./AuthButton.module.css";
import { signOut, signIn, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {/* Signed in as {session.user.email} <br /> */}
        <button className={`${btn} ${logout}`} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button className={`${btn} ${login}`} onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
