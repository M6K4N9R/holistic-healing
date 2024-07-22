import styles from "./ChooseDoctor.module.css";
export default function ChooseDoctor({
  doctors,
  selectedDoctor,
  selectedTreatment,
  selectedDate,
  onSelect,
}) {
  if (selectedTreatment === undefined || selectedDate === undefined) {
    return (
      <>
        <h3 className={styles.title}>Choose doctor</h3>
        <div className={styles.note}>
          <p>Please choose a treatment and date first.</p>
        </div>
      </>
    );
  }

  const doctorsWhoOfferSelectedTreatment = doctors
    .filter((doctor) => doctor.treatments.includes(selectedTreatment?.id))
    .map((doctor) => ({
      id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
    }));

  return (
    <>
      <h3 className={styles.title}>Choose doctor</h3>

      <ul className={styles.chooseDoctor}>
        {doctorsWhoOfferSelectedTreatment.map((doctor) => (
          <button
            className={`${styles.btn}  ${
              doctor.id === selectedDoctor?.id
                ? styles.selected
                : styles.notSelected
            }`}
            key={doctor.id}
            type="button"
            onClick={() =>
              onSelect(doctor.id, doctor.firstName, doctor.lastName)
            }
          >
            {doctor.firstName} {doctor.lastName}
          </button>
        ))}
      </ul>
    </>
  );
}
