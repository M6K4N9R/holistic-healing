import { container, search } from "./SearchBar.module.css";
import useSWR from "swr";

export default function SearchBar() {
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  const treatments = data?.treatments;
  const symptoms = treatments.map((treatment) => treatment.symptoms).flat();

  const filteredSymptomsFromDuplicates = symptoms.reduce(
    (accumulator, currentValue) => {
      return accumulator.includes(currentValue)
        ? accumulator
        : [...accumulator, currentValue];
    },
    []
  );

  console.log(
    "filteredSymptomsFromDuplicates in SearchBar: ",
    filteredSymptomsFromDuplicates
  );

  const handleSymptomSearch = () => {};

  return (
    <section className={container}>
      <label htmlFor="site-search" className="text-base font-semibold">
        Search for symptom
      </label>
      <input
        type="text"
        id="site-search"
        list="symptoms"
        name="search-bar"
        placeholder=""
        autoComplete="on"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      <datalist id="symptoms">
        {filteredSymptomsFromDuplicates.map((symptom, index) => (
          <option key={`${symptom}-${index}`} value={symptom} />
        ))}
      </datalist>
      <button className={search} onClick={handleSymptomSearch}>
        Search
      </button>
    </section>
  );
}
