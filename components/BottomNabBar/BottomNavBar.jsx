import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./BottomNavBar.module.css";

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={router.pathname === "/" ? styles.active : ""}>Home</div>
      </Link>
      <Link href="/treatments/ear-accupuncture">
        <div className={router.pathname === "/treatments" ? styles.active : ""}>
          About
        </div>
      </Link>
      <Link href="/booking">
        <div className={router.pathname === "/booking" ? styles.active : ""}>
          Book
        </div>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
