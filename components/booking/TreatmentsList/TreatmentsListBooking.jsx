import { treatmentsListBooking } from "./TreatmentsListBooking.module.css";

export default function TreatmentsListBooking({
  treatmentNames,
  selectedTreatment,
  selectedTreatmentBgColor,
  onSelect,
}) {
  return (
    <>
      <h3 className="text-left">Choose the treatment</h3>
      <ul className={treatmentsListBooking}>
        {treatmentNames.map((treatment) => (
          <button
            className={`rounded-lg  w-11/12
            px-2 py-1 cursor-pointer text-left  ${
              treatment._id === selectedTreatment
                ? `${selectedTreatmentBgColor} "text-white"`
                : "bg-bright text-dark"
            }`}
            key={treatment._id}
            type="button"
            onClick={() => onSelect(treatment._id)}
          >
            {treatment.name}
          </button>
        ))}
      </ul>
    </>
  );
}

// className="w-32 px-2 py-1 h-8 text-center align-middle rounded-lg bg-bright text-dark"
