import { chooseDoctor, btn } from "./ChooseDoctor.module.css";
export default function ChooseDoctor({
  doctors,
  selectedDoctor,
  onSelect,
  onClear,
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3>Choose doctor</h3>
        <button className={btn} onClick={() => onClear()}>
          clear
        </button>
      </div>
      <ul className={chooseDoctor}>
        {doctors.map((doctor) => (
          <button
            className={`rounded-lg  w-11/12
            px-2 py-1 cursor-pointer text-left  ${
              doctor._id === selectedDoctor?.id
                ? "bg-primary text-white font-semibold"
                : "bg-bright text-dark"
            }`}
            key={doctor._id}
            type="button"
            onClick={() => onSelect(doctor._id)}
          >
            {doctor.firstName} {doctor.lastName}
          </button>
        ))}
      </ul>
    </>
  );
}

