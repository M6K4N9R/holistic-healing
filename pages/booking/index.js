import { useState } from "react";
import React from "react";
import useSWR from "swr";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/booking");

  // Tracking the booking process of selection

  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTreatmentBgColor, setSelectedTreatmentBgColor] = useState("");
  const [selectedDoctorBgColor, setSelectedDoctorBgColor] = useState("");

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
    <>
      <form onSubmit={handleBookingSubmit}>
        <h2 className="text-center mt-3 mb-3">Choose the treatment</h2>
        <ul className="p-2 mt-5">
          {treatmentNames.map((treatment) => (
            <li
              key={treatment._id}
              className={`rounded-lg  w-4/6 m-1
          p-1 text-center ${
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
        {/* <div className="w-3/4 mx-auto">
          <MyCalendar />
        </div> */}
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
    </>
  );
}
