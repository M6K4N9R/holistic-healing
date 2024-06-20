import { useState } from "react";
import React from "react";
import useSWR from "swr";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";
import MyCalendar from "@/components/Calendar/Calendar";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";

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

  const [selectedTreatment, setSelectedTreatment] =
    useState("Not yet selected");
  const [selectedDoctor, setSelectedDoctor] = useState("Not yet selected");
  const [selectedTreatmentBgColor, setSelectedTreatmentBgColor] = useState("");
  const [selectedDoctorBgColor, setSelectedDoctorBgColor] = useState("");
  const [selectedDate, setSelectedDate] = useState("Not yet selected");
  const [selectedDay, setSelectedDay] = useState("Not yet selected");

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
    doctorHealingtouchTimeSlots,
    doctorBloodloverTimeSlots,
    bookings,
  } = data;

  let availableTimeSlots = [];
  function getAvailableTimeSlots() {
    availableTimeSlots.push(doctorHealingtouchTimeSlots.availability);

    availableTimeSlots.push(doctorBloodloverTimeSlots.availability);
  }

  // ===================== HANDLING SELECTION FUNCTIONS

  //----------- Select Date and getting the day of the week

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
    // Convert Calendar date Object inot string
    const selectedDateString = `${date.year}/${date.month}/${date.day}`;

    // Getting the day of the week
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = days[jsDate.getDay()];
    // Updating the state
    setSelectedDate(selectedDateString);
    setSelectedDay(dayOfWeek);
  };

  // ----------------- Select Treatment

  const handleTreatmentSelect = (id) => {
    setSelectedTreatment(id);
    setSelectedTreatmentBgColor("bg-primary text-white font-semibold");
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
      day: selectedDay,
    };
    console.log("Booking data: ", bookingData);

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
    "Doctor: ",
    selectedDoctor,
    "Date: ",
    selectedDate,
    "DayofWeek: ",
    selectedDay
  );
  console.log("Bookings are:", bookings);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-0 pb-10 px-5 ${inter.className}`}
    >
      <form onSubmit={handleBookingSubmit}>
        <h2 className="text-center mt-3 mb-3">Choose the treatment</h2>
        <ul className="p-2 mt-5">
          {treatmentNames.map((treatment) => (
            <li
              key={treatment._id}
              className={`rounded-lg  w-4/6 m-1
          p-1 cursor-pointer text-center ${
            treatment._id === selectedTreatment
              ? selectedTreatmentBgColor
              : "bg-secondary/20"
          }`}
            >
              <button
                type="button"
                onClick={() => handleTreatmentSelect(treatment._id)}
              >
                {treatment.name}
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-center mt-3 mb-3">Pick a date</h2>

        <MyCalendar onDateChange={handleSelectDate} selectedDate={selectedDate}/>

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
