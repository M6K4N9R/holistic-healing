import styles from "./TreatmentsListBooking.module.css";
export default function TreatmentsListBooking({
  treatmentNames,
  selectedTreatment,
  onSelect,
}) {
  return (
    <>
      <h3 className={styles.title}>Choose the treatment</h3>
      <ul className={styles.treatmentsListBooking}>
        {treatmentNames.map((treatment) => (
          <button
            className={`${styles.btn}  ${
              treatment._id === selectedTreatment?.id
                ? styles.selected
                : styles.notSelected
            }`}
            key={treatment._id}
            type="button"
            onClick={() => onSelect(treatment._id, treatment.name)}
          >
            {treatment.name}
          </button>
        ))}
      </ul>
    </>
  );
}
