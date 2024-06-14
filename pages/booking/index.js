import { useState } from "react";
import useSWR from "swr";

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/booking");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  const { treatmentNames, doctors } = data;

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData);

    try {
      // Send the treatment data to the server
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log("Treatment booked successfully");
      } else {
        console.error("Failed to book treatment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTreatmentSelect = (name) => {
    setSelectedTreatment(name);
    console.log("Treatment selected is: ", name);
  };
  const handleDoctorSelect = (first, last) => {
    setSelectedDoctor(`${first} ${last}`);

    console.log("Doctor's first name: ", first, last);
  };
  console.log("And once more: ", selectedTreatment);

  return (
    <>
      <form onSubmit={handleBookingSubmit}>
        <h2 className="text-center mt-3 mb-3">Choose the treatment</h2>
        <ul className="p-2 mt-5">
          {treatmentNames.map((treatment) => (
            <li
              key={treatment._id}
              className="rounded-lg bg-secondary/20 w-4/6 m-1
          p-1 text-center"
            >
              <button
                type="button"
                onClick={() => handleTreatmentSelect(treatment.name)}
              >
                {treatment.name}
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-center mt-3 mb-3">Choose your Doctor</h2>
        <ul className="p-2 mt-5">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className="rounded-lg bg-secondary/20 w-4/6 m-1
          p-1 text-center"
            >
              <button
                type="button"
                onClick={() =>
                  handleDoctorSelect(doctor.firstName, doctor.lastName)
                }
              >
                {doctor.firstName} {doctor.lastName}
              </button>
            </li>
          ))}
        </ul>
        <button>Book an appointment</button>
      </form>
    </>
  );
}
