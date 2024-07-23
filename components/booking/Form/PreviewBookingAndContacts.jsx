import styles from "./PreviewBookingAndContacts.module.css";

export default function PreviewBookingAndContacts({
  selectedTreatment,
  selectedDoctor,
  selectedDate,
  selectedTimeSlot,
  onHandleContactNumberInput,
  onHandleEmailInput,
  onHandlePatientNameInput,
  onEdit,
}) {
  return (
    <>
      <div className={styles.previewBookingAndContacts}>
        <div className={styles.titleReviewBooking}>
          <h3>Please review your booking</h3>
        </div>
        <div className={styles.bookingInfoSection}>
          <h4 className={styles.bookingInfoTitle}>{selectedTreatment?.name}</h4>
          <h4 className={styles.bookingInfoTitle}>
            <span className={styles.bookingInfoSpanThin}>with{"  "}</span>
            {selectedDoctor?.firstName} {selectedDoctor?.lastName}
          </h4>
          <h4 className={styles.bookingInfoTitle}>
            <span className={styles.bookingInfoSpanThin}>on{"  "}</span>
            {selectedDate?.date}
            <span className={styles.bookingInfoSpanThin}> at </span>{" "}
            <span className={styles.bookingInfoTitle}>
              {selectedTimeSlot?.timeSlot}
            </span>
          </h4>
          <div className={styles.contactDetailsSection}>
            <p className={styles.contactDetailsTitle}>
              Please fill your contact details.
            </p>
            <div className={styles.inputNameSection}>
              <label htmlFor="full-name" className={styles.inputLabel}>
                Your name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                onChange={onHandlePatientNameInput}
                required
                className={styles.input}
              />
              {/* =================================== Check Inputs styles =============================== */}
            </div>
            <div className={styles.inputPhoneSection}>
              <label htmlFor="contact-number" className={styles.inputLabel}>
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
                className={styles.input}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={styles.inputLabel}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={onHandleEmailInput}
                required
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsSection}>
          <button type="button" className={edit} onClick={() => onEdit()}>
            Edit
          </button>
          <button type="submit" className={submit}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
