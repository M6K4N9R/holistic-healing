import { useState } from "react";
import React from "react";
import useSWR from "swr";
import MyCalendar from "@/components/Calendar/Calendar";

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/booking");

  // Tracking the booking process of selection

  let [selectedTreatment, setSelectedTreatment] = useState("");
  let [selectedDoctor, setSelectedDoctor] = useState("");
  let [selectedDoctorID, setSelectedDoctorID] = useState("");

  // =========================================

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  const { treatmentNames, doctors } = data;

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment,
      doctor: selectedDoctor,
      doctorID: selectedDoctorID,
    };

    try {
      // Send the treatment data to the server

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
        // mutate();
      } else {
        console.error("Failed to book treatment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTreatmentSelect = (name) => {
    setSelectedTreatment(name);
    console.log("Selected treatment is: ", selectedTreatment);
  };
  const handleDoctorSelect = (first, last, id) => {
    setSelectedDoctor(`${first} ${last}`);
    setSelectedDoctorID(id);
    console.log("Selected doctor is: ", selectedDoctor);
  };

  return (
    <>
      <form onSubmit={handleBookingSubmit}>
        <h2 className="text-center mt-3 mb-3">Choose the treatment</h2>
        <ul className="p-2 mt-5">
          {treatmentNames.map((treatment) => (
            <li
              key={treatment._id}
              className="rounded-lg bg-secondary/20 w-4/6 m-1
          p-1 text-center"
            >
              <button
                type="button"
                onClick={() => handleTreatmentSelect(treatment.name)}
              >
                {treatment.name}
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-center mt-3 mb-3">Pick a date</h2>
        <div className="w-3/4 mx-auto">
          <MyCalendar />
        </div>
        <h2 className="text-center mt-3 mb-3">Choose your Doctor</h2>
        <ul className="p-2 mt-5">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className="rounded-lg bg-secondary/20 w-4/6 m-1
          p-1 text-center"
            >
              <button
                type="button"
                onClick={() =>
                  handleDoctorSelect(
                    doctor.firstName,
                    doctor.lastName,
                    doctor._id
                  )
                }
              >
                {doctor.firstName} {doctor.lastName}
              </button>
            </li>
          ))}
        </ul>
        <button>Book an appointment</button>
      </form>
    </>
  );
}
