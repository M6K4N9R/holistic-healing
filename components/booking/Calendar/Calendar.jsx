import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import styles from "./Calendar.module.css";

export default function MyCalendar({
  onDateChange,
  selectedDate,
  selectedTreatment,
  bookedDays,
}) {
  return (
    <>
      <h3 className={styles.title}>Pick a day</h3>
      <div className={styles.container}>
        <Calendar
          aria-label="Date (Uncontrolled)"
          onChange={onDateChange}
          minValue={today(getLocalTimeZone())}
          mixValue={today(getLocalTimeZone()).add({ days: 56 })}
          showShadow={true}
        />
      </div>
    </>
  );
}
