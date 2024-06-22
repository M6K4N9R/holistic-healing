import { useEffect, useState } from "react";
import React from "react";
import useSWR from "swr";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";
import MyCalendar from "@/components/booking/Calendar/Calendar";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import TimeSlots from "@/components/booking/TimeSlots/TimeSlots";
import TreatmentsListBooking from "@/components/booking/TreatmentsList/TreatmentsListBooking";
import ChooseDoctor from "@/components/booking/ChooseDoctor/ChooseDoctor";

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
  const [selectedDoctor, setSelectedDoctor] = useState({ id: "" });
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  //--------------------------------- UseEffect Hocks for UPDATED STATES

  // If Treatment is Selected =
  useEffect(() => {
    // Mapping through existing bookings collection to find treatments === selectedTreatment
    if (data && selectedTreatment?.isSelected === true) {
      const excistingBookingsWithSelectedTreatment = data.bookings.filter(
        (booking) => booking.treatment[0]._id === selectedTreatment.id
      );
      console.log(
        "Selected Treatment is: ",
        selectedTreatment,
        "excistingBookingsWithSelectedTreatment: ",
        excistingBookingsWithSelectedTreatment
      );
    }
  }, [selectedTreatment, data]);
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
    doctorHealingtouchData,
    doctorBloodloverData,
    bookings,
  } = data;

  console.log("doctorHealingtouchData: ", doctorHealingtouchData);

  // ===================== Destructured variables from data

  // ---------- Available Time Slots

  let availableTimeSlots = [];
  function getAvailableTimeSlots() {
    availableTimeSlots.push(doctorHealingtouchData.availability);

    availableTimeSlots.push(doctorBloodloverData.availability);
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

  /* 
  ----------------- Filtering timeSlots options based on selected Treatment
  
  const excistingBookingsWithSelectedTreatment = [{}] // 1. Go through bookings and return bookings who's booking.treatment === selectedtreatment
  const excistingBookingsWithSelectedDate = excistingBookingsWithSelectedTreatment.map((booking)=> booking.date.date.includes(selectedDate.date)) // 2. 
  const timeSlotIsAlreadyBookedBooking = excistingBookingsWithSelectedDate.map((booking) => booking.time === selectedTimeSlot)
  const doctorOfMatchedTreatment = timeSlotIsAlreadyBookedBooking.doctor
  const otherDoctorsWhoCanDoThisTreatment = doctors.map((doctor) => doctor.availability.includes(selectedTimeSlot))
  const doctorsThatAreNotBookedOnThisDayAndTime = bookings.map((booking) => )
    if (timeSlotIsAlreadyBooked?.length > 0 && ) {
      
    }
    

*/
  const handleTreatmentClear = () => {
    setSelectedTreatment();
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
    setSelectedTimeSlot((prevTimeSlot) => ({
      ...prevTimeSlot,
      timeSlot: time,
      isSelected: true,
    }));

    // console.log("Click Time", time);
  };

  const handleTimeSlotClear = () => {
    setSelectedTimeSlot();
  };
  // ------------------ Select Doctor

  const handleDoctorSelect = (id) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      id: id,
      isSelected: true,
    }));
  };

  const handleDoctorClear = () => {
    setSelectedDoctor();
  };

  // ==================== HANDLING SUBMIT =========================

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // ------- Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment?.id,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTimeSlot?.timeSlot,
    };

    // console.log("Booking data to send to Backend: ", bookingData);

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

  // console.log(
  //   "Selections are: ",
  //   "Treatment: ",
  //   selectedTreatment,
  //   "Date: ",
  //   selectedDate,
  //   "Time",
  //   selectedTimeSlot,
  //   "Doctor: ",
  //   selectedDoctor
  // );

  console.log("Selected Treatment is : ", selectedTreatment);
  // console.log("Booking data: ", bookings);

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
          doctorHealingtouchData={doctorHealingtouchData}
          doctorBloodloverData={doctorBloodloverData}
          selectedTreatment={selectedTreatment}
          selectedDate={selectedDate}
          selectedTime={selectedTimeSlot}
          bookedDays={alreadyBookedDays}
          onSelect={handleTimeSlotSelect}
        />

        <ChooseDoctor
          doctors={doctors}
          selectedTreatment={selectedTreatment}
          selectedDate={selectedDate}
          onSelect={handleDoctorSelect}
          selectedDoctor={selectedDoctor}
          onClear={handleDoctorClear}
        />

        <div className="text-center mx-auto my-6">
          <StyledButton>Book an appointment</StyledButton>
        </div>
      </form>
    </main>
  );
}
