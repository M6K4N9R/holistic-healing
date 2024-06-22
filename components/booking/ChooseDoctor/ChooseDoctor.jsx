import { chooseDoctor, btn } from "./ChooseDoctor.module.css";
export default function ChooseDoctor({
  doctors,
  selectedDoctor,
  selectedTreatment,
  selectedDate,
  onSelect,
}) {
  console.log("In Choose Doctor SelectedTreatment is: ", selectedTreatment);
  // -------- Conditional rendering for Please Choose Treatment First
  if (selectedTreatment === undefined || selectedDate === undefined) {
    return (
      <>
        <h3 className="text-left">Choose Doctor</h3>
        <div className="px-2 py-1 text-center align-middle shadow-pastel rounded-lg bg-bright text-dark">
          <p>Please choose a treatment and date first.</p>
        </div>
      </>
    );
  }

  const doctorsWhoOfferSelectedTreatment = doctors
    .filter((doctor) => doctor.treatments.includes(selectedTreatment?.id))
    .map((doctor) => ({
      id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
    }));

  // console.log("In Choose Doctor doctors are: ", doctors);
  console.log(
    "In Choose Doctor doctorsWhoOfferSelectedTreatment: ",
    doctorsWhoOfferSelectedTreatment
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <h3>Choose doctor</h3>
      </div>

      {/* ----------------- Conditional Rendering of a note, but need to add the name of Treatment
       {doctorsWhoOfferSelectedTreatment.length === 1 && (
        <div className="text-center mt-4">
          <p>Only 👇 offers {selectedTreatment.name}</p>
        </div>
      )} */}
      <ul className={chooseDoctor}>
        {doctorsWhoOfferSelectedTreatment.map((doctor) => (
          <button
            className={`rounded-lg  w-11/12
            px-2 py-1 cursor-pointer text-left  ${
              doctor.id === selectedDoctor?.id
                ? "bg-primary text-white font-semibold"
                : "bg-bright text-dark"
            }`}
            key={doctor.id}
            type="button"
            onClick={() => onSelect(doctor.id)}
          >
            {doctor.firstName} {doctor.lastName}
          </button>
        ))}
      </ul>
    </>
  );
}
