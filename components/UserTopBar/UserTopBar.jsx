import AuthButton from "../auth-button/AuthButton";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import styles from "./UserTopBar.module.css";

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
    <section className={styles.container}>
      {session ? (
        <div className={styles.userGreeting}>
          <h3 className={styles.greetingMessage}>
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
            priority={true}
            width={40}
            height={40}
          />
        </>
      )}

      <AuthButton />
    </section>
  );
}
