import TimeSlots from "@/components/booking/TimeSlots/TimeSlots";
import TreatmentsListBooking from "@/components/booking/TreatmentsList/TreatmentsListBooking";
import ChooseDoctor from "@/components/booking/ChooseDoctor/ChooseDoctor";
import MyCalendar from "@/components/booking/Calendar/Calendar";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";
import { useState, useEffect } from "react";

export default function BookingForm({
  onSubmit,
  selectedTreatment,
  selectedDate,
  selectedTimeSlot,
  selectedDoctor,
  data,
  handleTreatmentSelect,
  handleTreatmentClear, handleSelectDate, handleTimeSlotSelect, handleDoctorSelect, bookingPreviewAndContacts, formError}) {
  // ==================== Fetched data is: ============
  const {
    treatmentNames,
    doctors,
    doctorHealingtouchData,
    doctorBloodloverData,
    bookings,
  } = data;

  console.log("In component fetchedData is: ", data);

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
        />
        {formError && (
          <div className="text-red-500 text-center mt-4">{formError}</div>
        )}
        {bookingPreviewAndContacts && (
          <div className="p-2 text-center mt-4">
            <label>Your contact number</label>
            <input type="number"></input>
            <label>Your email</label>
            <input type="email"></input>
            <div className="text-center mx-auto my-6">
              <StyledButton type="submit">Book an appointment</StyledButton>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
