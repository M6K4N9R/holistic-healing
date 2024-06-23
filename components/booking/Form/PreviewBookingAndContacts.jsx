import previewBookingAndContacts from "./PreviewBookingAndContacts.module.css";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";

export default function PreviewBookingAndContacts({
  selectedTreatment,
  selectedDoctor,
  selectedDate,
  selectedTimeSlot,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3>Please review your booking</h3>
        <p>and provide us with your contact details.</p>
      </div>

      <div className={previewBookingAndContacts}>
        <h4>
          Your treatment: <span>{selectedTreatment}</span>
        </h4>
        <h4>
          Your doctor: <span>{selectedDoctor}</span>
        </h4>
        <h4>
          On: <span>{selectedDate.day}, {selectedDate.date}</span> at {selectedTimeSlot}
        </h4>
      </div>
      <div className="p-2 text-center mt-4">
        <label>Your contact number</label>
        <input type="number"></input>
        <label>Your email</label>
        <input type="email"></input>
        <div className="text-center mx-auto my-6">
          <StyledButton type="submit">Book an appointment</StyledButton>
        </div>
      </div>
    </>
  );
}
