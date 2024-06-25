import { container, search } from "./SearchBar.module.css";

export default function SearchBar({
  onHandleSymptomSearch,
  filteredSymptomsFromDuplicates,
  falseSearchedSymptom,
}) {
  return (
    <form className={container} onSubmit={onHandleSymptomSearch}>
      <label htmlFor="site-search" className="text-base font-semibold">
        Search for symptom
      </label>
      <input
        type="text"
        id="site-search"
        list="symptoms"
        name="searchBar"
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
      {falseSearchedSymptom && (
        <div className="border border-solid border-secondary p-2 w-full rounded-lg text-center text-sm">
          Maybe our treatments do not address your symptom. <br /> Consider
          booking <span className="font-semibold">First Consultation</span>.
        </div>
      )}
      <button type="submit" className={search}>
        Search
      </button>
    </form>
  );
}
