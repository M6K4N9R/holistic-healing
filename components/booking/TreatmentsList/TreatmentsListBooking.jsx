import { treatmentsListBooking } from "./TreatmentsListBooking.module.css";

export default function TreatmentsListBooking({
  treatmentNames,
  selectedTreatment,
  selectedTreatmentBgColor,
  onClick,
}) {
  return (
    <>
      <h3 className="text-left">Choose the treatment</h3>
      <ul className={treatmentsListBooking}>
        {treatmentNames.map((treatment) => (
          <li
            key={treatment._id}
            className={`rounded-lg  w-11/12
          p-1 cursor-pointer text-left text-dark ${
            treatment._id === selectedTreatment
              ? selectedTreatmentBgColor
              : "bg-bright"
          }`}
          >
            <button type="button" onClick={onClick}>
              {treatment.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// className="w-32 px-2 py-1 h-8 text-center align-middle rounded-lg bg-bright text-dark"
