import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

let localDate = today(getLocalTimeZone());

export default function MyCalendar() {
  let [selectedDate, setSelectedDate] = useState();
  return (
    <Calendar
      aria-label="Pick a date"
      value={localDate}
      onChange={() => setSelectedDate()}
    />
  );
}
