import { useEffect, useState } from "react";
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
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [showBookingPreviewAndContacts, setShowBookingPreviewAndContacts] =
    useState(false);
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [patientDetailsError, setPatientDetailsError] = useState("");

  //--------------------------------- UseEffect Hocks for UPDATED STATES

  // If Treatment is Selected =
  useEffect(() => {
    // Mapping through existing bookings collection to find treatments === selectedTreatment
    if (data && selectedTreatment?.isSelected === true) {
      const excistingBookingsWithSelectedTreatment = data.bookings.filter(
        (booking) => booking.treatment[0]._id === selectedTreatment.id
      );
      // console.log(
      //   "Selected Treatment is: ",
      //   selectedTreatment,
      //   "excistingBookingsWithSelectedTreatment: ",
      //   excistingBookingsWithSelectedTreatment
      // );
    }
  }, [selectedTreatment, data]);

  // ----------------------------  Handling Showing error messages for form Validation
  // First Form Validation
  // useEffect(() => {
  //   if (!selectedTreatment) {
  //     setFormError("Please select a treatment");
  //   }
  //   if (!selectedDate) {
  //     setFormError("Please choose a date");
  //   }
  //   if (!selectedTimeSlot) {
  //     setFormError("Please select a time");
  //   }
  //   if (!selectedDoctor) {
  //     setFormError("Please select a doctor");
  //   }
  // }, [selectedTreatment, selectedDate, selectedTimeSlot, selectedDoctor]);

  // Patients Details Validation
  useEffect(() => {
    if (showBookingPreviewAndContacts) {
      if (!patientName) {
        setFormError("Please write your name");
      }
      if (!contactNumber) {
        setFormError("Please write your phone number");
      }
      if (!email) {
        setFormError("Please write your email");
      }
    }
  }, [showBookingPreviewAndContacts, patientName, contactNumber, email]);

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
  };

  const handleTimeSlotClear = () => {
    setSelectedTimeSlot();
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

  const formSecondValidation = () => {
    if (!patientName || !email || !contactNumber) {
      setFormError("Please fill out your details");
      return false;
    }

    setFormError("");
    return true;
  };

  const resetForm = () => {
    setSelectedTreatment();
    setSelectedDoctor();
    setSelectedDate();
    setSelectedTimeSlot();
    setFormError("");
  };
  const resetPatientDetailsForm = () => {
    setPatientName();
    setContactNumber();
    setEmail();
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
    if (!formSecondValidation()) {
      return;
    }

    // ------- Renaming selected Treatment and Doctor to match Doctor Schema

    const bookingData = {
      treatment: selectedTreatment?.id,
      doctor: selectedDoctor?.id,
      date: selectedDate,
      time: selectedTimeSlot?.timeSlot,
      patientDetails: { name: patientName, phone: contactNumber, email: email },
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
        setFormSuccess(true);
        resetForm();
        resetPatientDetailsForm();
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

  console.log(
    "Booking data: ",
    selectedTreatment,
    selectedDate,
    selectedTimeSlot,
    selectedDoctor,
    patientName,
    contactNumber,
    email
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-0 pb-10 px-5 ${inter.className}`}
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
        formError={formError}
        handleContactNumberInput={handleContactNumberInput}
        handleEmailInput={handleEmailInput}
        handlePatientNameInput={handlePatientNameInput}
      />

      {formSuccess && <SuccessPopup onClose={() => setFormSuccess(false)} />}
    </main>
  );
}
