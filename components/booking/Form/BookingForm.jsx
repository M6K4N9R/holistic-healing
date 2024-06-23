import TimeSlots from "@/components/booking/TimeSlots/TimeSlots";
import TreatmentsListBooking from "@/components/booking/TreatmentsList/TreatmentsListBooking";
import ChooseDoctor from "@/components/booking/ChooseDoctor/ChooseDoctor";
import MyCalendar from "@/components/booking/Calendar/Calendar";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";
import { useState, useEffect } from "react";
import PreviewBookingAndContacts from "./PreviewBookingAndContacts";

export default function BookingForm({
  onSubmit,
  selectedTreatment,
  selectedDate,
  selectedTimeSlot,
  selectedDoctor,
  data,
  handleTreatmentSelect,
  handleTreatmentClear,
  handleSelectDate,
  handleTimeSlotSelect,
  handleDoctorSelect,
  showBookingPreviewAndContacts,
  formError,
}) {
  // ==================== Fetched data is: ============
  const {
    treatmentNames,
    doctors,
    doctorHealingtouchData,
    doctorBloodloverData,
    bookings,
  } = data;

  console.log(
    "In Booking Form component selections are: ",
    "selectedTreatment",
    selectedTreatment,
    "selectedDoctor",
    selectedDoctor,
    "selectedTimeSlot",
    selectedTimeSlot,
    "selectedDate",
    selectedDate
  );

  // ------ Booking dates

  const alreadyBookedDays = bookings.map((booking) => booking.date);

  return (
    <>
      <form onSubmit={onSubmit}>
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
          selectedTimeSlot={selectedTimeSlot}
          bookedDays={alreadyBookedDays}
          onSelect={handleTimeSlotSelect}
        />

        <ChooseDoctor
          doctors={doctors}
          selectedTreatment={selectedTreatment}
          selectedDate={selectedDate}
          onSelect={handleDoctorSelect}
          selectedDoctor={selectedDoctor}
        />
        {formError && (
          <div className="text-red-500 text-center mt-4">{formError}</div>
        )}
        {showBookingPreviewAndContacts && (
          <PreviewBookingAndContacts
            selectedTreatment={selectedTreatment}
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
          />
        )}
      </form>
    </>
  );
}
