import { treatmentsListBooking } from "./TreatmentsListBooking.module.css";
import { btn } from "./TreatmentsListBooking.module.css";
export default function TreatmentsListBooking({
  treatmentNames,
  selectedTreatment,
  onSelect,
  onClear,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3>Choose the treatment</h3>
        <button className={btn} onClick={() => onClear()}>
          clear
        </button>
      </div>
      <ul className={treatmentsListBooking}>
        {treatmentNames.map((treatment) => (
          <button
            className={`rounded-lg  w-11/12
            px-2 py-1 cursor-pointer text-left  ${
              treatment._id === selectedTreatment.id
                ? "bg-primary text-white font-semibold"
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
