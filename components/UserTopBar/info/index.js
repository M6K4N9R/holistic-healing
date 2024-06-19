import Image from "next/image";
import AuthButton from "@/components/auth-button/AuthButton";

export default function ProfileInfo({ session }) {
  return (
    <>
      <Image
        width={150}
        height={150}
        src={session.user?.image || `/assets/images/default.png`}
        alt="Avatar"
        priority
      />
      <div>
        <h1>Hello {session.user?.name}</h1>
        <p>You are signed in as {session.user?.email}</p>
        <AuthButton />
      </div>
    </>
  );
}
