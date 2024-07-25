import styles from "./TimeSlots.module.css";

export default function TimeSlots({
  doctorHealingtouchData,
  doctorBloodloverData,
  selectedTreatment,
  selectedDate,
  filteredTimeSlots,
  bookedDays,
  selectedTimeSlot,

  onSelect,
}) {


  if (selectedTreatment === undefined || selectedDate === undefined) {
    return (
      <>
        <h3 className="text-left">Select time</h3>
        <div className="px-2 py-1 text-center align-middle shadow-pastel rounded-lg bg-bright text-dark">
          <p>Please choose a treatment and date first.</p>
        </div>
      </>
    );
  }


  // ---------------- Doctors Time Slots
  const healingtouchTimes = doctorHealingtouchData[0].availability;
  const bloodloverTimes = doctorBloodloverData[0].availability;

  // ---------------- Converting timeSlots into a single array without repeating timeSlots
  const allTimeSlots = [...healingtouchTimes, ...bloodloverTimes];

  const availableTimeSlots = allTimeSlots.filter((timeSlot, index, self) => {
    return self.indexOf(timeSlot) === index;
  });

  const sortedTimeSlots = availableTimeSlots.sort((a, b) => {
    const [aStartHour, aStartMinute, aEndHour, aEndMinute] = a
      .split(":")
      .join("-")
      .split("-");
    const [bStartHour, bStartMinute, bEndHour, bEndMinute] = b
      .split(":")
      .join("-")
      .split("-");

    const aStartTime = parseInt(aStartHour) * 60 + parseInt(aStartMinute);
    const bStartTime = parseInt(bStartHour) * 60 + parseInt(bStartMinute);

    const aEndTime = parseInt(aEndHour) * 60 + parseInt(aEndMinute);
    const bEndTime = parseInt(bEndHour) * 60 + parseInt(bEndMinute);

    if (aStartTime === bStartTime) {
      return aEndTime - bEndTime; // If start times are equal, sort by end time
    } else {
      return aStartTime - bStartTime; // Sort by start time
    }
  });
  // ------------------------------------ END OF SORTING SIME SLOTS


  return (
    <>
      <h3 className={styles.title}>Select time</h3>
      <div className={styles.timeSlots}>
        {filteredTimeSlots.length > 1
          ? filteredTimeSlots.map((timeSlot, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.btn} ${
                  timeSlot === selectedTimeSlot?.timeSlot
                    ? styles.selected
                    : styles.notSelected
                }`}
                onClick={() => onSelect(timeSlot)}
              >
                {timeSlot}
              </button>
            ))
          : sortedTimeSlots.map((timeSlot, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.btn} ${
                  timeSlot === selectedTimeSlot?.timeSlot
                  ? styles.selected
                  : styles.notSelected
                }`}
                onClick={() => onSelect(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
      </div>
    </>
  );
}
