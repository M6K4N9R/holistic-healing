import { timeSlots } from "./TimeSlots.module.css";

export default function TimeSlots({
  doctorHealingtouchTimesAndDays,
  doctorBloodloverTimesAndDays,
  selectedDate,
  bookedDays,
  selectedTime,
  selectedTimeBgColor,
  onSelect,
}) {
  // const dateString = `${date.month} ${date.day}`;
  const healingtouchTimes = doctorHealingtouchTimesAndDays[0].availability;
  const bloodloverTimes = doctorBloodloverTimesAndDays[0].availability;

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

  // console.log(
  //   "In Time Slots alltimesSlots: ",
  //   allTimeSlots,
  //   "Sorted time slots: ",
  //   sortedTimeSlots
  // );

  return (
    <>
      <h3 className="text-left">Select time</h3>

      <div className={timeSlots}>
        {sortedTimeSlots.map((timeSlot, index) => (
          <button
            key={index}
            className={`w-32 px-2 py-1 h-8 text-center align-middle rounded-lg bg-bright text-dark ${
              timeSlot === selectedTime
                ? `${selectedTimeBgColor} "text-white"`
                : "bg-bright text-dark"
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
