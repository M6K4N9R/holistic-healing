import styles from "./SearchBar.module.css";
import { useRef } from "react";

export default function SearchBar({
  onHandleSymptomSearch,
  filteredSymptomsFromDuplicates,
  falseSearchedSymptom,
  searchedSymptom,
  onHandleClearSearch,
}) {
  const searchInputRef = useRef(null);
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        onHandleSymptomSearch(e.target.searchBar.value.trim());
      }}
    >
      <label htmlFor="symptom-search" className={styles.label}>
        Search for symptom
      </label>
      <input
        ref={searchInputRef}
        type="text"
        id="symptom-search"
        list="symptoms"
        name="searchBar"
        placeholder=""
        autoComplete="off"
        required
        className={styles.input}
      />
      <datalist id="symptoms">
        {filteredSymptomsFromDuplicates.map((symptom, index) => (
          <option
            key={`${symptom}-${index}`}
            value={symptom}
            className={styles.symptomOption}
          />
        ))}
      </datalist>
      {falseSearchedSymptom && (
        <div className={styles.noResultsMessage}>
          Maybe our treatments do not address your symptom. <br /> Consider
          booking <strong>First Consultation</strong>.
        </div>
      )}
      <div className={styles.buttonsContainer}>
        {searchedSymptom && (
          <button
            type="button"
            className={styles.clear}
            onClick={onHandleClearSearch}
          >
            See all treatments
          </button>
        )}

        <button type="submit" className={styles.search}>
          Search
        </button>
      </div>
    </form>
  );
}
