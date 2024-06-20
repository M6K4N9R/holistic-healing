import { useState } from "react";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function MyCalendar({ onDateChange, selectedDate, bookedDays }) {
  // let today = today(getLocalTimeZone());
  // let [focusedDate, setFocusedDate] = useState(defaultDate);

  console.log("In Calendar selected date is: ", selectedDate);
  console.log("In Calendar booked days are: ", bookedDays);

  return (
    <>
      <h3 className="text-left">Pick a day</h3>
      <div className="flex justify-center w-full gap-x-4 mx-auto shadow-pastel rounded-lg bg-white">
        <Calendar
          aria-label="Date (Uncontrolled)"
          // focusedValue={focusedDate}
          // value={today(getLocalTimeZone())}
          // onFocusChange={setFocusedDate}
          onChange={onDateChange}
          minValue={today(getLocalTimeZone())}
          mixValue={today(getLocalTimeZone()).add({ days: 56 })}
          showShadow={true}
          // isDateUnavailable={isDateUnavailable}
        />
      </div>
    </>
  );
}
