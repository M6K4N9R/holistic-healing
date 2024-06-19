import { useState } from "react";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function MyCalendar({ onDateChange }) {
  let defaultDate = today(getLocalTimeZone());
  // let [focusedDate, setFocusedDate] = useState(defaultDate);

  return (
    <div className="flex justify-center gap-x-4 m-8 rounded-lg bg-white">
      <Calendar
        aria-label="Date (Uncontrolled)"
        // focusedValue={focusedDate}
        // value={defaultDate}
        // onFocusChange={setFocusedDate}
        onChange={onDateChange}
        minValue={today(getLocalTimeZone()).add({ days: 1 })}
        mixValue={today(getLocalTimeZone()).add({ days: 56 })}
      />
    </div>
  );
}
