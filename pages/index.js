// import Image from "next/image";
import { Inter, Grechen_Fuemen } from "next/font/google";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserTopBar from "@/components/UserTopBar/UserTopBar";
import TreatmentsList from "@/components/TreatmentsList/TreatmentsList";
import FirstConsultation from "@/components/FirstConsultation/FirstConsultation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const inter = Inter({
  weight: ["400", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});
const grechen = Grechen_Fuemen({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { data, isLoading } = useSWR("/api/treatments");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchedSymptom, setSearchedSymptom] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const doctorSlug = encodeURIComponent(session.user.email);
      router.replace(`/doctors/${doctorSlug}`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null; // Return null to avoid rendering the home page content
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  const treatments = data?.treatments;
  const symptoms = treatments.map((treatment) => treatment.symptoms).flat();
  const firstConsultation = data?.firstConsultation;

  const filteredSymptomsFromDuplicates = symptoms.reduce(
    (accumulator, currentValue) => {
      return accumulator.includes(currentValue)
        ? accumulator
        : [...accumulator, currentValue];
    },
    []
  );

  const handleSymptomSearch = () => {};

  console.log("Data on home Page: ", data);

  return (
    <main
      className={`flex flex-col min-h-screen items-center justify-between max-w-lg mx-auto pt-0 pb-5 px-5 mb-24 ${inter.className}`}
    >
      <UserTopBar grechen={grechen} />

      <h1 className={`${grechen.className} text-secondary text-center mt-8`}>
        Holistic Healing{" "}
      </h1>
      <p className="text-gray-600 text-sm -mt-2">
        Your naturopathic practice in Berlin
      </p>

      <SearchBar
        filteredSymptomsFromDuplicates={filteredSymptomsFromDuplicates}
      />
      <TreatmentsList treatments={treatments} />
      <FirstConsultation firstConsultation={firstConsultation} />
    </main>
  );
}

{
  /* <div className="z-10 max-w-5xl w-full items-center justify-between font-inter text-sm lg:flex">
  <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    In development
    <code className="font-mono font-bold">...</code>
  </p>
  <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    <a
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      By{" "}
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </a>
  </div>
</div> */
}

{
  /* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
  <a
    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-2xl font-semibold`}>
      Docs{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      Find in-depth information about Next.js features and API.
    </p>
  </a>

  <a
    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-2xl font-semibold`}>
      Learn{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      Learn about Next.js in an interactive course with&nbsp;quizzes!
    </p>
  </a>

  <a
    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-2xl font-semibold`}>
      Templates{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      Discover and deploy boilerplate example Next.js&nbsp;projects.
    </p>
  </a>

  <a
    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className={`mb-3 text-2xl font-semibold`}>
      Deploy{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
      Instantly deploy your Next.js site to a shareable URL with Vercel.
    </p>
  </a>
</div> */
}
