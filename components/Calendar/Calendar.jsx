import { Calendar } from "@nextui-org/calendar";
import {
  parseDate,
  today,
  getLocalTimeZone,
  isWeekend,
} from "@internationalized/date";

import { useLocale } from "@react-aria/i18n";
import { useState } from "react";
import styles from "./Calendar.module.css";

export default function MyCalendar() {
  let [selectedDate, setSelectedDate] = useState(parseDate("2024-03-07"));

  // ================== Weekends are unavailable ==============

  const now = today(getLocalTimeZone());
  const { locale } = useLocale();

  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const isDateUnavailable = (date) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  // ===================== Getting a day of the week ===============

  const getDayOfWeek = () => {
    const jsDate = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day
    );
    return jsDate.toLocaleString(locale, { weekday: "short" });
  };

  // ============================================================

  console.log("Selected date is: ", selectedDate);
  console.log("Day of the Week is: ", getDayOfWeek());
  return (
    <div className={styles.calendar}>
      <Calendar
        aria-label="Pick a date"
        value={selectedDate}
        isDateUnavailable={isDateUnavailable}
        onChange={setSelectedDate}
        className={styles.calendarDays}
        dayClassName={(date) =>
          `${styles.calendarDay} ${
            isDateUnavailable(date) ? styles.disabled : ""
          } ${date.isSame(selectedDate, "day") ? styles.selected : ""}`
        }
      />
    </div>
  );
}
