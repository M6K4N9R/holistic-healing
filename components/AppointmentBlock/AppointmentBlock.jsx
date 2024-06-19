import { appointmentBlock } from "./AppointmentBlock.module.css";

export default function AppointmentBlock({ treatment, date }) {
  return (
    <>
      <div className={appointmentBlock}>
        <h3>{treatment}</h3>
        <p>{date}</p>
        <button>unfold</button>
      </div>
    </>
  );
}
