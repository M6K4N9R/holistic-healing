import {
  previewBookingAndContacts,
  submit,
  edit,
} from "./PreviewBookingAndContacts.module.css";
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
        <div className="text-center text-white border-b-2 border-bright">
          <h3>Please review your booking</h3>
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
          <div className="mt-7 border-2 border-bright p-3 rounded-lg ">
            <p className="-mt-6  border-primary rounded-lg bg-primary mx-1 text-wrap text-bright">
              Please fill your contact details.
            </p>
            <div className="mb-4 mt-3">
              <label
                htmlFor="full-name"
                className="block text-left text-sm font-medium text-gray-300"
              >
                Your name
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
                Phone
              </label>
              <input
                id="contact-number"
                name="contact-number"
                type="tel"
                minLength="7"
                maxLength="14"
                inputmode="tel"
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
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={onHandleEmailInput}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="text-center mx-auto my-6">
          <button type="submit" className={submit}>
            Book an appointment
          </button>
        </div>
      </div>
    </>
  );
}
