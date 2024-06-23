import { previewBookingAndContacts } from "./PreviewBookingAndContacts.module.css";
import { StyledButton } from "@/components/DefaulButton/DefaultButton";

export default function PreviewBookingAndContacts({
  selectedTreatment,
  selectedDoctor,
  selectedDate,
  selectedTimeSlot,
  onHandleContactNumberInput,
  onHandleEmailInput,
  onHandlePatientNameInput,
}) {
  // console.log("selectedTimeSlot In Preview ", selectedTreatment);
  return (
    <>
      <div className={previewBookingAndContacts}>
        <div className="text-center text-white pb-5  border-b-2 border-bright">
          <h3>Please review your booking</h3>
          <p className="-mt-6">and provide us with your contact details.</p>
        </div>
        <div className="text-center mt-6 ">
          <h4 className="text-white font-semibold">
            {selectedTreatment?.name}
          </h4>
          <h4 className="text-white font-semibold">
            <span className="font-thin text-sm">with{"  "}</span>
            {selectedDoctor?.firstName} {selectedDoctor?.lastName}
          </h4>
          <h4 className="text-white font-semibold">
            <span className="font-thin text-sm">on{"  "}</span>
            {selectedDate?.date}
            <span className="font-thin text-sm"> at </span>{" "}
            <span className="text-white font-semibold">
              {selectedTimeSlot?.timeSlot}
            </span>
          </h4>
          <div className="mb-4">
            <label
              htmlFor="full-name"
              className="block text-left text-sm font-medium text-gray-300"
            >
              Your full name
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              onChange={onHandlePatientNameInput}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mt-6 mb-4">
            <label
              htmlFor="contact-number"
              className="block text-left text-sm font-medium text-gray-300"
            >
              phone
            </label>
            <input
              id="contact-number"
              name="contact-number"
              type="tel"
              onChange={onHandleContactNumberInput}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium text-gray-300"
            >
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={onHandleEmailInput}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
        <div className="text-center mx-auto my-6">
          <StyledButton type="submit">Book an appointment</StyledButton>
        </div>
      </div>
    </>
  );
}
