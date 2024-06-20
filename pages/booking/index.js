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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  // ===================== Tracking the booking process of selection

  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTreatmentBgColor, setSelectedTreatmentBgColor] = useState("");
  const [selectedDoctorBgColor, setSelectedDoctorBgColor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // =========================================
  const {
    treatmentNames,
    doctors,
    doctorHealingtouchAvailability,
    doctorBloodloverAvailability,
  } = data;
  console.log("Doctors are: ", doctors);
  console.log(
    "Doctor Healingtouch Availability is: ",
    doctorHealingtouchAvailability
  );
  console.log(
    "Doctor Bloodlover Availability is: ",
    doctorBloodloverAvailability
  );

  // ===================== Select the date and Get the day from the date

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
    const jsDate = new Date(date.year, date.month - 1, date.day);

    const dayOfWeek = days[jsDate.getDay()];
    setSelectedDate(date);
    setSelectedDay(dayOfWeek);
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // ================ Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment,
      doctor: selectedDoctor,
      date: selectedDate,
      day: selectedDay,
    };
    console.log("Booking data: ", bookingData);

    try {
      // ====================== Send the treatment data to the server

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

  const handleTreatmentSelect = (id) => {
    setSelectedTreatment(id);
    setSelectedTreatmentBgColor("bg-primary text-white font-semibold");
  };
  const handleDoctorSelect = (id) => {
    setSelectedDoctor(id);
    setSelectedDoctorBgColor("bg-primary text-white font-semibold");
  };
  console.log("Selected treatment is: ", selectedTreatment);
  console.log("Selected doctor is: ", selectedDoctor);

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

        <MyCalendar onDateChange={handleSelectDate} />

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
