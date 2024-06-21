import { useState } from "react";
import React from "react";
import useSWR from "swr";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";
import MyCalendar from "@/components/Calendar/Calendar";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import TimeSlots from "@/components/booking/TimeSlots/TimeSlots";
import TreatmentsListBooking from "@/components/booking/TreatmentsList/TreatmentsListBooking";

const inter = Inter({
  weight: ["400", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/booking");
  const { data: session, status } = useSession();

  // ===================== Tracking the booking process of selection

  const [selectedTreatment, setSelectedTreatment] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState("Not yet selected");
  const [selectedDoctorBgColor, setSelectedDoctorBgColor] = useState("");
  const [selectedDate, setSelectedDate] = useState();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("Not yet selected");
  const [selectedTimeSlotBgColor, setSelectedTimeSlotBgColor] = useState("");

  // =========================================

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  // ==================== Fetched data is: ============
  const {
    treatmentNames,
    doctors,
    doctorHealingtouchTimesAndDays,
    doctorBloodloverTimesAndDays,
    bookings,
  } = data;

  // ===================== Destructured variables from data

  // ---------- Available Time Slots

  let availableTimeSlots = [];
  function getAvailableTimeSlots() {
    availableTimeSlots.push(doctorHealingtouchTimeSlots.availability);

    availableTimeSlots.push(doctorBloodloverTimeSlots.availability);
  }

  // ------ Booking dates

  const alreadyBookedDays = bookings.map((booking) => booking.date);

  // ===================== HANDLING SELECTION and CLEARING SELECTION FUNCTIONS

  // ----------------- Select/Clear Treatment

  const handleTreatmentSelect = (id) => {
    setSelectedTreatment((prevTreatment) => ({
      ...prevTreatment,
      id: id,
      isSelected: true,
    }));
  };
  const handleTreatmentClear = () => {
    setSelectedTreatment({});
  };

  //----------- Select/Clear Date and getting the day of the week

  const handleSelectDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Convert Calendar date Object into a string
    const selectedDateString = `${date.year}/${date.month}/${date.day}`;

    // Getting the day of the week
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = days[jsDate.getDay()];

    // Updating the state
    setSelectedDate((prevDate) => ({
      ...prevDate,
      date: selectedDateString,
      day: dayOfWeek,
    }));
  };

  // ------------------ Select Time Slot

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setSelectedTimeSlotBgColor("bg-primary text-white font-semibold");
    console.log("Click Time", time);
  };
  // ------------------ Select Doctor

  const handleDoctorSelect = (id) => {
    setSelectedDoctor(id);
    setSelectedDoctorBgColor("bg-primary text-white font-semibold");
  };

  // ==================== HANDLING SUBMIT =========================

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // ------- Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTimeSlot,
    };
    // console.log("Booking data: ", bookingData);

    try {
      // --------- Send the treatment data to the server

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log(
          "Treatment booked successfully. The response is: ",
          bookingData
        );
      } else {
        console.error("Failed to book treatment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(
    "Selections are: ",
    "Treatment: ",
    selectedTreatment,
    "Date: ",
    selectedDate,
    "Time",
    selectedTimeSlot,
    "Doctor: ",
    selectedDoctor,
  );

  console.log("Booking data: ", bookings);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-0 pb-10 px-5 ${inter.className}`}
    >
      <form onSubmit={handleBookingSubmit}>
        <TreatmentsListBooking
          treatmentNames={treatmentNames}
          selectedTreatment={selectedTreatment}
          onSelect={handleTreatmentSelect}
          onClear={handleTreatmentClear}
        />
        <MyCalendar
          onDateChange={handleSelectDate}
          selectedDate={selectedDate}
          selectedTreatment={selectedTreatment}
          bookedDays={alreadyBookedDays}
        />

        <TimeSlots
          doctorHealingtouchTimesAndDays={doctorHealingtouchTimesAndDays}
          doctorBloodloverTimesAndDays={doctorBloodloverTimesAndDays}
          selectedDate={selectedDate}
          selectedTime={selectedTimeSlot}
          selectedTimeBgColor={selectedTimeSlotBgColor}
          bookedDays={alreadyBookedDays}
          onSelect={handleTimeSlotSelect}
        />

        <h2 className="text-center mt-3 mb-3">Choose your Doctor</h2>
        <ul className="p-2 mt-5">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className={`rounded-lg  w-4/6 m-1
          p-1 text-center ${
            doctor._id !== selectedDoctor
              ? "bg-secondary/20"
              : selectedDoctorBgColor
          }`}
            >
              <button
                type="button"
                onClick={() => handleDoctorSelect(doctor._id)}
              >
                {doctor.firstName} {doctor.lastName}
              </button>
            </li>
          ))}
        </ul>
        <div className="text-center mx-auto my-6">
          <StyledButton>Book an appointment</StyledButton>
        </div>
      </form>
    </main>
  );
}
