import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex jus">
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
    </nav>
  );
}
