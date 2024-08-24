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
import styles from "./HomePage.module.css";

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
  const [searchedSymptom, setSearchedSymptom] = useState("");
  const [falseSearchedSymptom, setFalseSearchedSymptom] = useState(false);

  useEffect(() => {
    if (data?.treatments && searchedSymptom) {
      const foundSymptom = data?.treatments.some((treatment) =>
        treatment.symptoms.some((symptom) =>
          symptom.toLowerCase().includes(searchedSymptom.toLowerCase())
        )
      );
      setFalseSearchedSymptom(!foundSymptom);
    } else {
      setFalseSearchedSymptom(false);
    }
  }, [data, searchedSymptom]);

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
    return null;
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

  const handleSymptomSearch = (symptom) => {
    setSearchedSymptom(symptom);
  };

  const handleClearSearch = () => {
    setSearchedSymptom("");
  };

  return (
    <main className={`${styles.container} ${inter.className}`}>
      <UserTopBar grechen={grechen} />

      <h1 className={`${grechen.className} text-secondary text-center mt-8`}>
        Holistic Healing{" "}
      </h1>
      <p className="text-gray-600 text-sm -mt-2">
        Your naturopathic practice in Berlin
      </p>

      <SearchBar
        onHandleSymptomSearch={handleSymptomSearch}
        onHandleClearSearch={handleClearSearch}
        filteredSymptomsFromDuplicates={filteredSymptomsFromDuplicates}
        falseSearchedSymptom={falseSearchedSymptom}
        searchedSymptom={searchedSymptom}
      />
      <TreatmentsList
        treatments={treatments}
        searchedSymptom={searchedSymptom}
        falseSearchedSymptom={falseSearchedSymptom}
      />
      <FirstConsultation firstConsultation={firstConsultation} />
    </main>
  );
}
