import TimeSlots from "@/components/booking/TimeSlots/TimeSlots";
import TreatmentsListBooking from "@/components/booking/TreatmentsList/TreatmentsListBooking";
import ChooseDoctor from "@/components/booking/ChooseDoctor/ChooseDoctor";
import MyCalendar from "@/components/booking/Calendar/Calendar";

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
  bookingPreviewRef,
  handleContactNumberInput,
  handleEmailInput,
  handlePatientNameInput,
  filteredTimeSlots,
  handleEditBooking,
}) {
  // ==================== Fetched data is: ============
  const {
    treatmentNames,
    doctors,
    doctorHealingtouchData,
    doctorBloodloverData,
    bookings,
  } = data;

  // ------ Booking dates

  const alreadyBookedDays = bookings.map((booking) => booking.date);

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-lg mx-auto">
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
          filteredTimeSlots={filteredTimeSlots}
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

        {showBookingPreviewAndContacts && (
          <div ref={bookingPreviewRef}>
            <PreviewBookingAndContacts
              selectedTreatment={selectedTreatment}
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onHandleContactNumberInput={handleContactNumberInput}
              onHandleEmailInput={handleEmailInput}
              onHandlePatientNameInput={handlePatientNameInput}
              onEdit={handleEditBooking}
            />
          </div>
        )}
      </form>
    </>
  );
}
