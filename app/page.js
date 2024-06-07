import Image from "next/image";

export default function Home() {
  return (
    <div>
      <a>
        In development. Supportet by{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={50}
          height={12}
          priority
        />
      </a>
    </div>
  );
}
