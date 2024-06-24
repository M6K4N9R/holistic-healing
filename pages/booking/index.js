import { useEffect, useState, useRef } from "react";
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import BookingForm from "@/components/booking/Form/BookingForm";

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
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [formSuccess, setFormSuccess] = useState(false);
  const [showBookingPreviewAndContacts, setShowBookingPreviewAndContacts] =
    useState(false);
  const bookingPreviewRef = useRef(null);
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  //--------------------------------- UseEffect Hocks for UPDATED STATES

  // --------------- When Treatment is Selected:
  useEffect(() => {
    // Find existing bookings on Selected date
    if (data && selectedTreatment?.isSelected === true && selectedDate?.date) {
      const existingBookingsOnSelectedDate = data.bookings.filter(
        (booking) => booking.date.date === selectedDate.date
      );

      // checking doctors who offer selected Treatment

      const doctorsWhoOfferSelectedTreatment = data?.doctors.filter((doctor) =>
        doctor.treatments.includes(selectedTreatment.id)
      );

      // Looking for possible time slots
      if (doctorsWhoOfferSelectedTreatment.length === 1) {
        const availableDoctorAllTimeSlots =
          doctorsWhoOfferSelectedTreatment[0].availability;

        const bookedTimesOnSelectedDate = existingBookingsOnSelectedDate.map(
          (booking) => booking.time
        );
        const availableDoctorFreeTimeSlot = availableDoctorAllTimeSlots.filter(
          (timeSlot) => !bookedTimesOnSelectedDate.includes(timeSlot)
        );
        console.log(
          "availableDoctorAllTimeSlots ",
          availableDoctorAllTimeSlots,
          "availableDoctorFreeTimeSlot",
          availableDoctorFreeTimeSlot,
          "TIME READ: ",
          existingBookingsOnSelectedDate[0].time
        );
      }

      const doctorsWhoOfferSelectedTreatmentAndAvailable =
        existingBookingsOnSelectedDate.filter((booking) =>
          doctorsWhoOfferSelectedTreatment.includes(booking.doctor._id)
        );
      console.log(
        "Selected Treatment is: ",
        selectedTreatment,
        "excistingBookingsOnSelectedDate: ",
        existingBookingsOnSelectedDate,
        "doctorsWhoOfferSelectedTreatment: ",
        doctorsWhoOfferSelectedTreatment
      );
      // if (
      //   excistingBookingsWithSelectedTreatment.length > 0 &&
      //   selectedDate?.date
      // ) {
      //   const excistingBookingsWithSelectedTreatmentOnSelectedDate =
      //     excistingBookingsWithSelectedTreatment?.filter(
      //       (booking) => booking.date.date === selectedDate.date
      //     );
      //   console.log(
      //     "On same date bookings: ",
      //     excistingBookingsWithSelectedTreatmentOnSelectedDate
      //   );
      //   if (
      //     excistingBookingsWithSelectedTreatmentOnSelectedDate.length > 0 &&
      //     selectedTimeSlot?.isSelected === true
      //   ) {
      //     const doctorsWhoOfferSelectedTreatment =
      //       excistingBookingsWithSelectedTreatmentOnSelectedDate?.filter(
      //         (booking) => booking.time === selectedTimeSlot.timeSlot
      //       );
      //   }
      // }
      console.log("Selected date: ", selectedDate);
    }
  }, [selectedTreatment, data, selectedDate, selectedTimeSlot]);

  // ----- Scroll to Contact Details in BookingForm

  useEffect(() => {
    if (showBookingPreviewAndContacts && bookingPreviewRef.current) {
      bookingPreviewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showBookingPreviewAndContacts]);

  // ------------------------------  Handling Contact Details section

  useEffect(() => {
    if (
      selectedTreatment &&
      selectedDate &&
      selectedTimeSlot &&
      selectedDoctor
    ) {
      setShowBookingPreviewAndContacts(true);
    }
  }, [selectedTreatment, selectedDate, selectedTimeSlot, selectedDoctor]);

  // =========================================

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  // ===================== Destructured variables from data

  // ---------- Available Time Slots

  let availableTimeSlots = [];
  function getAvailableTimeSlots() {
    availableTimeSlots.push(doctorHealingtouchData.availability);

    availableTimeSlots.push(doctorBloodloverData.availability);
  }

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
  // ===================== HANDLING SELECTION and CLEARING SELECTION FUNCTIONS

  // ----------------- Select/Clear Treatment

  const handleTreatmentSelect = (id, name) => {
    setSelectedTreatment((prevTreatment) => ({
      ...prevTreatment,
      id: id,
      name: name,
      isSelected: true,
    }));
  };

  const handleTreatmentClear = () => {
    setSelectedTreatment();
  };

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
  };

  // ------------------ Select Doctor

  const handleDoctorSelect = (id, firstName, lastName) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      id: id,
      firstName: firstName,
      lastName: lastName,
      isSelected: true,
    }));
  };

  // ====================================== HANDLING SUBMIT =========================

  // const formFirstValidation = () => {
  //   if (
  //     !selectedTreatment ||
  //     !selectedDate ||
  //     !selectedTimeSlot ||
  //     !selectedDoctor
  //   ) {
  //     setFormError(
  //       "Please make sure you selected a treatment, date and time and doctor."
  //     );
  //     return false;
  //   }

  //   setFormError("");
  //   return true;
  // };

  const resetForm = () => {
    setSelectedTreatment();
    setSelectedDoctor();
    setSelectedDate();
    setSelectedTimeSlot();
  };
  const resetPatientDetailsForm = () => {
    setPatientName("");
    setContactNumber("");
    setEmail("");
  };

  const SuccessPopup = ({ onClose }) => (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 m-2 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thank you.</h2>
        <p>
          Your appointment has been successfully booked! You will receive an
          email confirmation shortly.
        </p>
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );

  const handlePatientNameInput = (event) => {
    setPatientName(event.target.value);
  };

  const handleContactNumberInput = (event) => {
    setContactNumber(event.target.value);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    // ------- Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment?.id,
      doctor: selectedDoctor?.id,
      date: selectedDate,
      time: selectedTimeSlot?.timeSlot,
      patientDetails: { name: patientName, phone: contactNumber, email: email },
    };

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
        setFormSuccess(true);
        resetForm();
        resetPatientDetailsForm();
        setShowBookingPreviewAndContacts(false);
      } else {
        console.error("Failed to book treatment");
        setFormError(
          "Failed to book the appointment. Please reload the page and try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setFormError("An error occurred. Please try again.");
    }
  };

  // console.log(
  //   "Booking data: ",
  //   selectedTreatment,
  //   selectedDate,
  //   selectedTimeSlot,
  //   selectedDoctor,
  //   patientName,
  //   contactNumber,
  //   email
  // );

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-0 pb-5 px-5  mb-24 ${inter.className}`}
    >
      <BookingForm
        onSubmit={handleBookingSubmit}
        selectedTreatment={selectedTreatment}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        selectedDoctor={selectedDoctor}
        data={data}
        handleTreatmentSelect={handleTreatmentSelect}
        handleTreatmentClear={handleTreatmentClear}
        handleSelectDate={handleSelectDate}
        handleTimeSlotSelect={handleTimeSlotSelect}
        handleDoctorSelect={handleDoctorSelect}
        showBookingPreviewAndContacts={showBookingPreviewAndContacts}
        handleContactNumberInput={handleContactNumberInput}
        handleEmailInput={handleEmailInput}
        handlePatientNameInput={handlePatientNameInput}
        bookingPreviewRef={bookingPreviewRef}
      />

      {formSuccess && <SuccessPopup onClose={() => setFormSuccess(false)} />}
    </main>
  );
}
